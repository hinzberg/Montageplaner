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
import {PersonService} from '../../core/services/person.service';
import {ToFormControls} from '../../shared/utils/form-utils';
import {PeopleAddedOverlayDialogComponent} from "./people-added-overlay-dialog/people-added-dialog.component";

@Component({
  selector: 'app-add-staff',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, PeopleAddedOverlayDialogComponent],
  templateUrl: './add-people.component.html',
  styleUrl: './add-people.component.scss'
})

export class AddPeopleComponent implements OnInit {

  // HeadlineTitle
  headlineTitle = 'Add Staff';

  // Contains an existing person if in edit mode
  editedPerson: Person | null = null;

  // Dialog
  showConfirmDialog = false;
  personForConfirmDialog: Person | null = null;
  titleForConfirmDialog = 'Person Added';

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
    profession: new FormControl(Profession.Artist, {validators: [Validators.required, this.validateProfession]}),
    isSelected: new FormControl(false),
    canBeTeamLeader: new FormControl(false),
    isActive: new FormControl(true)
  })

  constructor(
    private fb: FormBuilder,
    private personService: PersonService,
  ) {

    // Subscribe to form value changes to update validation messages
    this.personForm.valueChanges.subscribe(() => {
      this.updateValidationMessages();
    });
  }

  ngOnInit(): void {
    // Get initial persons
    this.persons = this.personService.getItems();

    // Subscribe to updates
    this.personService.itemsUpdated.subscribe(persons => {
      this.persons = persons;
    });

    // Set some default values for the page
    this.editedPerson = null;
    this.headlineTitle = 'Add new Person';

    // Is a selectedPerson in the PersonEditService?
    const person = this.personService.getSelectedItem();
    if (person) {
      this.editedPerson = person;
      this.personForm.controls.firstName.setValue(person.firstName);
      this.personForm.controls.lastName.setValue(person.lastName);
      this.personForm.controls.profession.setValue(person.profession);
      this.personForm.controls.canBeTeamLeader.setValue(person.canBeTeamLeader);
      this.personForm.controls.isActive.setValue(person.isActive);
      this.personService.clearSelectedItem(); // Clear person to avoid stale data
      this.headlineTitle = 'Edit Person';
    }
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

        if (this.editedPerson != null) {
          this.updatePerson()
          this.titleForConfirmDialog = 'Person updated';
        } else {
          this.addNewPerson();
          this.titleForConfirmDialog = 'Person added';
        }

        this.showConfirmDialog = true;
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

  addNewPerson(): void {
    // Create a new Person instance
    const newPerson = new Person(
      this.personForm.controls.firstName.value!.trim(),
      this.personForm.controls.lastName.value!.trim(),
      this.personForm.controls.profession.value!,
      this.personForm.controls.isActive.value!,
      this.personForm.controls.canBeTeamLeader.value!
    );

    // Add the person to the service
    this.personService.addItem(newPerson);
    this.personForConfirmDialog = newPerson;
  }

  updatePerson(): void {
    // Update the person with the edited values
    this.editedPerson!.firstName = this.personForm.controls.firstName.value!.trim();
    this.editedPerson!.lastName = this.personForm.controls.lastName.value!.trim();
    this.editedPerson!.profession = this.personForm.controls.profession.value!;
    this.editedPerson!.canBeTeamLeader = this.personForm.controls.canBeTeamLeader.value!;
    this.editedPerson!.isActive = this.personForm.controls.isActive.value!;

    this.personService.updateItem(this.editedPerson!);
    this.personForConfirmDialog = this.editedPerson;
    this.editedPerson = null;
  }

  onConfirmOkDialog(): void {
    this.onReset()
    this.showConfirmDialog = false;
  }

  onReset(): void {
    this.personForm.reset();
    this.personForConfirmDialog = null;
    this.formErrors = {};
    this.headlineTitle = 'Add Person';
  }
}

export type PersonForm = ToFormControls<Person, 'id'>;
