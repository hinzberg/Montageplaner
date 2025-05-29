import {Component, OnInit} from '@angular/core';
import {Person} from "../../core/models/person.model";
import {Profession} from "../../core/models/profession.enum";
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  Validators
} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {PersonnelService} from '../../core/services/personnel.service';
import {ToFormControls} from '../../shared/utils/form-utils';
import {PersonnelAddedDialogComponent} from "./personnel-added-dialog/personnel-added-dialog.component";

@Component({
  selector: 'app-add-personnel',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, PersonnelAddedDialogComponent],
  templateUrl: './add-personnel.component.html',
  styleUrl: './add-personnel.component.scss'
})

export class AddPersonnelComponent implements OnInit {

  // Dialog state
  showConfirmDialog = false;

  submittedPerson: Person | null = null;
  professions = Object.values(Profession);
  formErrors: { [key: string]: string } = {};
  persons: Person[] = [];

  // Field name mapping for user-friendly error messages
  private fieldNames: { [key: string]: string } = {
    firstName: 'First Name',
    lastName: 'Last Name',
    profession: 'Profession'
  };

  readonly personForm = new FormGroup<PersonForm>({
    firstName: new FormControl('', {validators: [Validators.required, this.validateName()]}),
    lastName: new FormControl('', {validators: [Validators.required, this.validateName()]}),
    profession: new FormControl(Profession.Artist, {validators: [Validators.required, this.validateProfession]})
  })

  constructor(
    private fb: FormBuilder,
    private personnelService: PersonnelService
  ) {

    // Subscribe to form value changes to update validation messages
    this.personForm.valueChanges.subscribe(() => {
      this.updateValidationMessages();
    });
  }

  ngOnInit(): void {
    // Get initial persons
    this.persons = this.personnelService.getPersons();

    // Subscribe to updates
    this.personnelService.personsUpdated.subscribe(persons => {
      this.persons = persons;
    });
  }

  // Custom validator for names
  validateName() {

    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;

      if (!value) {
        return {required: true};
      }

      // Trim the value to check for leading/trailing spaces
      if (value !== value.trim()) {
        return {hasSpaces: true};
      }

      // Check if the value contains only letters and spaces
      if (!/^[a-zA-ZäöüßÄÖÜ\s]*$/.test(value)) {
        return {invalidCharacters: true};
      }

      // Check minimum length (2 characters)
      if (value.length < 2) {
        return {minlength: {requiredLength: 2, actualLength: value.length}};
      }

      // Check maximum length (50 characters)
      if (value.length > 50) {
        return {maxlength: {requiredLength: 50, actualLength: value.length}};
      }

      return null;
    };
  }

  // Custom validator for profession
  validateProfession(control: AbstractControl): ValidationErrors | null {
    const profession = control.value;
    if (!profession) {
      return {required: true};
    }
    if (!Object.values(Profession).includes(profession)) {
      return {invalidProfession: true};
    }
    return null;
  }

  // Get a user-friendly field name
  private getFieldName(key: string): string {
    return this.fieldNames[key] || key;
  }

  // Update validation messages
  updateValidationMessages() {
    this.formErrors = {};
    Object.keys(this.personForm.controls).forEach(key => {
      const control = this.personForm.get(key);
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
        } else if (control.errors['invalidProfession']) {
          this.formErrors[key] = 'Please select a valid profession';
        }
      }
    });
  }

  onSubmit(): void {
    if (this.personForm.valid) {
      // Mark all fields as touched to trigger validation messages
      Object.keys(this.personForm.controls).forEach(key => {
        const control = this.personForm.get(key);
        control?.markAsTouched();
      });

      // Update validation messages
      this.updateValidationMessages();

      // If the form is still valid after marking as touched
      if (this.personForm.valid) {

        // Create a new Person instance
        const newPerson = new Person(
          this.personForm.controls.firstName.value!.trim(),
          this.personForm.controls.lastName.value!.trim(),
          this.personForm.controls.profession.value!
        );

        // Add the person to the service
        this.personnelService.addPerson(newPerson);

        // Update the submitted person for display
        this.submittedPerson = newPerson;
        this.showConfirmDialog = true;

        // Reset the form
        // this.personForm.reset();
        // this.formErrors = {};
      }
    } else {
      // Mark all fields as touched to show validation errors
      Object.keys(this.personForm.controls).forEach(key => {
        const control = this.personForm.get(key);
        control?.markAsTouched();
      });
      this.updateValidationMessages();
    }
  }

  onConfirmOkDialog(): void {
    this.onReset()
  }

  onReset(): void {
    this.personForm.reset();
    this.submittedPerson = null;
    this.formErrors = {};
  }
}

export type PersonForm = ToFormControls<Person, 'id'>;
