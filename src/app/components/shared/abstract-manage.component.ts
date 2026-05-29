import { computed, Directive, inject, OnInit, Signal, signal, WritableSignal } from '@angular/core';
import { Router } from '@angular/router';
import { IEntityService } from '../../core/services/IEntityService';

/**
 * Shared logic for the "manage <entity>" list views: searchable list,
 * row selection, edit/new navigation and the delete-confirmation dialog.
 *
 * Logic-only base (no @Component); concrete components supply the template,
 * the entity service, the add-route and the entity-specific search/label hooks.
 *
 * @template T entity type, must expose a string `id` and a `isSelected` flag
 */
@Directive()
export abstract class AbstractManageComponent<T extends { id: string; isSelected: boolean }> implements OnInit {

  protected readonly router = inject(Router);

  // The entity service backing this view.
  protected abstract readonly service: IEntityService<T>;

  // Route to navigate to for add/edit (e.g. '/addPeople').
  protected abstract readonly addRoute: string;

  // Title shown in the delete-confirmation dialog.
  abstract readonly dialogTitle: string;

  // Whether the given item matches the (already lower-cased, trimmed) search term.
  protected abstract matchesSearch(item: T, term: string): boolean;

  // Human-readable label for an item, shown in the delete dialog.
  protected abstract deleteLabel(item: T): string;

  // Current search term entered by the user.
  private readonly searchTerm: WritableSignal<string> = signal('');

  // Filtered list, reactive to both the service data and the search term.
  readonly items: Signal<T[]> = computed(() => {
    const all = this.service.getItems()();
    const term = this.searchTerm().trim().toLowerCase();
    return term ? all.filter(item => this.matchesSearch(item, term)) : all;
  });

  // Delete-dialog state.
  showConfirmDialog = false;
  dialogMessage = '';
  private itemToDelete: T | null = null;

  ngOnInit(): void {
    // Clear any stale selection when entering the manage view.
    this.service.clearSelectedItem();
  }

  onSearch(searchTerm: string): void {
    this.searchTerm.set(searchTerm);
  }

  toggleSelection(item: T): void {
    item.isSelected = !item.isSelected;
    this.service.updateItem(item);
  }

  onNew(): void {
    this.router.navigate([this.addRoute]);
  }

  onEdit(item: T): void {
    this.service.setSelectedItem(item);
    this.router.navigate([this.addRoute]);
  }

  onDelete(item: T): void {
    this.itemToDelete = item;
    this.dialogMessage = this.deleteLabel(item);
    this.showConfirmDialog = true;
  }

  onConfirmDelete(): void {
    if (this.itemToDelete) {
      this.service.removeItem(this.itemToDelete.id);
      this.itemToDelete = null;
    }
    this.showConfirmDialog = false;
  }

  onCancelDelete(): void {
    this.itemToDelete = null;
    this.showConfirmDialog = false;
  }
}
