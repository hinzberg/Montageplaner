import { Directive, DestroyRef, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, FormGroup } from '@angular/forms';
import { IEntityService } from '../../core/services/IEntityService';

/**
 * Shared orchestration for the "add / edit <entity>" form views: edit-mode
 * loading, submit (create vs update), validation-message building, reset and
 * the post-save confirmation dialog.
 *
 * View state is exposed as signals so concrete components can run with OnPush.
 * Logic-only base (no @Component); concrete components own the FormGroup,
 * the entity service and the model<->form mapping hooks.
 *
 * @template TModel domain model type (Person, Equipment, ...)
 * @template TForm  the reactive form's control map
 */
@Directive()
export abstract class AbstractAddEditComponent<
  TModel,
  TForm extends { [K: string]: FormControl<any> }
> implements OnInit {

  // The reactive form backing this view.
  abstract readonly form: FormGroup<TForm>;

  // Singular entity name used in headlines and dialog titles ("Person").
  protected abstract readonly entityLabel: string;

  // Maps control names to user-friendly field names for error messages.
  protected abstract readonly fieldNames: { [key: string]: string };

  // The entity service backing this view.
  protected abstract readonly service: IEntityService<TModel>;

  // Populates the form from an existing model (edit mode).
  protected abstract loadFromModel(model: TModel): void;

  // Builds a new model instance from the current form values.
  protected abstract createModel(): TModel;

  // Applies the current form values onto an existing model and returns it.
  protected abstract applyToModel(model: TModel): TModel;

  // The model being edited, or null when adding a new one.
  protected editedItem: TModel | null = null;

  // ---- view state (signals, OnPush-friendly) ----
  readonly headlineTitle: WritableSignal<string> = signal('');
  readonly showConfirmDialog: WritableSignal<boolean> = signal(false);
  readonly titleForConfirmDialog: WritableSignal<string> = signal('');
  readonly itemForConfirmDialog: WritableSignal<TModel | null> = signal(null);
  readonly formErrors: WritableSignal<{ [key: string]: string }> = signal({});

  private readonly destroyRef = inject(DestroyRef);

  ngOnInit(): void {
    this.headlineTitle.set(`Add ${this.entityLabel}`);

    // Enter edit mode if the service has a selected item.
    const selected = this.service.getSelectedItem();
    if (selected) {
      this.editedItem = selected;
      this.loadFromModel(selected);
      this.service.clearSelectedItem(); // avoid stale data
      this.headlineTitle.set(`Edit ${this.entityLabel}`);
    }

    // Keep validation messages in sync with the form (auto-unsubscribed).
    this.form.valueChanges
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => this.updateValidationMessages());
  }

  onSubmit(): void {
    this.markAllTouched();
    this.updateValidationMessages();

    if (!this.form.valid) {
      return;
    }

    let model: TModel;
    if (this.editedItem != null) {
      model = this.applyToModel(this.editedItem);
      this.service.updateItem(model);
      this.titleForConfirmDialog.set(`${this.entityLabel} updated`);
      this.editedItem = null;
    } else {
      model = this.createModel();
      this.service.addItem(model);
      this.titleForConfirmDialog.set(`${this.entityLabel} added`);
    }

    this.itemForConfirmDialog.set(model);
    this.showConfirmDialog.set(true);
  }

  onReset(): void {
    this.form.reset();
    this.itemForConfirmDialog.set(null);
    this.formErrors.set({});
    this.headlineTitle.set(`Add ${this.entityLabel}`);
  }

  onConfirmOkDialog(): void {
    this.showConfirmDialog.set(false);
    this.onReset();
  }

  private getFieldName(key: string): string {
    return this.fieldNames[key] || key;
  }

  private markAllTouched(): void {
    Object.keys(this.form.controls).forEach(key => this.form.get(key)?.markAsTouched());
  }

  // Builds per-field, user-friendly validation messages from the form's errors.
  protected updateValidationMessages(): void {
    const errors: { [key: string]: string } = {};
    Object.keys(this.form.controls).forEach(key => {
      const control = this.form.get(key);
      if (!control?.errors) {
        return;
      }
      const fieldName = this.getFieldName(key);
      if (control.errors['required']) {
        errors[key] = `${fieldName} is required`;
      } else if (control.errors['minlength']) {
        errors[key] = `${fieldName} must be at least ${control.errors['minlength'].requiredLength} characters`;
      } else if (control.errors['maxlength']) {
        errors[key] = `${fieldName} must not exceed ${control.errors['maxlength'].requiredLength} characters`;
      } else if (control.errors['hasSpaces']) {
        errors[key] = `${fieldName} cannot have leading or trailing spaces`;
      } else if (control.errors['invalidCharacters']) {
        errors[key] = `${fieldName} can only contain letters and spaces`;
      } else if (control.errors['invalidTEquipmentTpe']) {
        errors[key] = 'Please select a valid equipment type';
      }
    });
    this.formErrors.set(errors);
  }
}
