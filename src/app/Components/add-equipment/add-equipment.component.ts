import {Component, OnInit} from '@angular/core';
import {
  AbstractControl, FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  ValidationErrors,
  Validators
} from "@angular/forms";
import {NgForOf, NgIf} from "@angular/common";
import {ToFormControls} from "../../shared/utils/form-utils";
import {Equipment} from "../../core/models/equipment.model";
import {EquipmentType} from "../../core/models/equipment-type.enum";
import {basicTextValidation} from "../../shared/utils/form-validators-utils";
import {EquipmentService} from "../../core/services/equipment.service";
import {MessageboxComponent} from "../messagebox/messagebox.component";

@Component({
  selector: 'app-add-equipment',
  standalone: true,
  imports: [
    FormsModule,
    NgForOf,
    NgIf,
    ReactiveFormsModule,
    MessageboxComponent
  ],
  templateUrl: './add-equipment.component.html',
  styleUrl: './add-equipment.component.scss'
})
export class AddEquipmentComponent implements OnInit {

  // HeadlineTitle
  headlineTitle = 'Add Equipment';

  // Contains an existing Equipment if in edit mode
  editedEquipment: Equipment | null = null;

  // Dialog
  showConfirmDialog = false;
  equipmentForConfirmDialog: Equipment | null = null;
  titleForConfirmDialog = 'Equipment Added';

  equipmentTypes = Object.values(EquipmentType);
  formErrors: { [key: string]: string } = {};

  // Field name mapping for user-friendly error messages
  private fieldNames: { [key: string]: string } = {
    description: 'Description',
    equipmentType: 'Equipment Type'
  };

  readonly equipmentForm = new FormGroup<EquipmentForm>({
    description: new FormControl('', {validators: [Validators.required, basicTextValidation()]}),
    equipmentType: new FormControl(EquipmentType.Other, {validators: [Validators.required, this.validateEquipmentType]}),
    isSelected: new FormControl(false),
    isActive: new FormControl(true)
  })

  constructor(
    private fb: FormBuilder,
    private equipmentService: EquipmentService,
  ) {
    // Subscribe to form value changes to update validation messages
    this.equipmentForm.valueChanges.subscribe(() => {
      this.updateValidationMessages();
    });
  }

  // Get a user-friendly field name
  private getFieldName(key: string): string {
    return this.fieldNames[key] || key;
  }

  // Update validation messages
  updateValidationMessages() {
    this.formErrors = {};
    Object.keys(this.equipmentForm.controls).forEach(key => {
      const control = this.equipmentForm.get(key);
      if (control?.errors) {
        const fieldName = this.getFieldName(key);
        if (control.errors['required']) {
          this.formErrors[key] = `${fieldName} is required`;
        } else if (control.errors['minlength']) {
          this.formErrors[key] = `${fieldName} must be at least ${control.errors['minlength'].requiredLength} characters`;
        } else if (control.errors['maxlength']) {
          this.formErrors[key] = `${fieldName} must not exceed ${control.errors['maxlength'].requiredLength} characters`;
        } else if (control.errors['hasSpaces']) {
          this.formErrors[key] = `${fieldName} cannot have leading or trailing spaces`;
        } else if (control.errors['invalidCharacters']) {
          this.formErrors[key] = `${fieldName} can only contain letters and spaces`;
        } else if (control.errors['invalidTEquipmentTpe']) {
          this.formErrors[key] = 'Please select a valid equipment type';
        }
      }
    });
  }

  ngOnInit(): void {

    // Set some default values for the page
    this.editedEquipment = null;
    this.headlineTitle = 'Add new Equipment';

    // Is a selectedEquipment in the Service?
    const equipment = this.equipmentService.getSelectedItem();
    if (equipment) {
      this.editedEquipment = equipment;
      this.equipmentForm.controls.description.setValue(equipment.description);
      this.equipmentForm.controls.equipmentType.setValue(equipment.equipmentType);
      this.equipmentForm.controls.isActive.setValue(equipment.isActive);
      this.equipmentService.clearSelectedItem(); // Clear to avoid stale data
      this.headlineTitle = 'Edit Equipment';
    }
  }

  // Custom validator for equipment type
  validateEquipmentType(control: AbstractControl): ValidationErrors | null {
    const type = control.value;
    if (!type) {
      return {required: true};
    }
    if (!Object.values(EquipmentType).includes(type)) {
      return {invalidTEquipmentTpe: true};
    }
    return null;
  }

  onSubmit(): void {
    if (this.equipmentForm.valid) {
      // Mark all fields as touched to trigger validation messages
      Object.keys(this.equipmentForm.controls).forEach(key => {
        const control = this.equipmentForm.get(key);
        control?.markAsTouched();
      });

      // Update validation messages
      this.updateValidationMessages();

      // If the form is still valid after marking as touched
      if (this.equipmentForm.valid) {

        if (this.editedEquipment != null) {
          this.updateEquipment()
          this.titleForConfirmDialog = 'Equipment updated';
        } else {
          this.addNewEquipment();
          this.titleForConfirmDialog = 'Equipment added';
        }

        this.showConfirmDialog = true;
      }
    } else {
      // Mark all fields as touched to show validation errors
      Object.keys(this.equipmentForm.controls).forEach(key => {
        const control = this.equipmentForm.get(key);
        control?.markAsTouched();
      });
      this.updateValidationMessages();
    }
  }

  addNewEquipment(): void {
    // Create a new Person instance
    const newEquipment = new Equipment(
      this.equipmentForm.controls.description.value!.trim(),
      this.equipmentForm.controls.equipmentType.value!,
      this.equipmentForm.controls.isActive.value!,
    );

    // Add the person to the service
    this.equipmentService.addItem(newEquipment);
    this.equipmentForConfirmDialog = newEquipment;
  }

  updateEquipment(): void {
    // Update the person with the edited values
    this.editedEquipment!.description = this.equipmentForm.controls.description.value!.trim();
    this.editedEquipment!.equipmentType = this.equipmentForm.controls.equipmentType.value!;
    this.editedEquipment!.isActive = this.equipmentForm.controls.isActive.value!;

    this.equipmentService.updateItem(this.editedEquipment!);
    this.equipmentForConfirmDialog = this.editedEquipment;
    this.editedEquipment = null;
  }

  onConfirmOkDialog(): void {
    this.onReset()
    this.showConfirmDialog = false;
  }

  onReset(): void {
    this.equipmentForm.reset();
    this.equipmentForConfirmDialog = null;
    this.formErrors = {};
    this.headlineTitle = 'Add new Equipment';
  }
}

export type EquipmentForm = ToFormControls<Equipment, 'id'>;
