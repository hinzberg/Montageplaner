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
import {PersonService} from "../../core/services/person.service";
import {EquipmentService} from "../../core/services/equipment.service";

@Component({
  selector: 'app-add-equipment',
  standalone: true,
  imports: [
    FormsModule,
    NgForOf,
    NgIf,
    ReactiveFormsModule
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
  equipments: Equipment[] = [];

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
    this.editedEquipment = null;
    this.headlineTitle = 'Add new Equipment';
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

  }

  onReset(): void {
    this.equipmentForm.reset();
    this.equipmentForConfirmDialog = null;
    this.formErrors = {};
    this.headlineTitle = 'Add new Equipment';
  }
}

export type EquipmentForm = ToFormControls<Equipment, 'id'>;
