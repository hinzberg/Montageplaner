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
import { ChangeDetectorRef } from '@angular/core';
import {MessageboxComponent} from "../messagebox/messagebox.component";

@Component({
  selector: 'app-add-staff',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, MessageboxComponent],
  templateUrl: './add-people.component.html',
  styleUrl: './add-people.component.scss'
})

export class AddPeopleComponent implements OnInit {

  // HeadlineTitle
  headlineTitle = '';

  // Contains an existing person if in edit mode
  editedPerson: Person | null = null;

  // Dialog
  showConfirmDialog = false;
  personForConfirmDialog: Person | null = null;
  titleForConfirmDialog = 'Person Added';

  professions = Object.values(Profession);
  formErrors: { [key: string]: string } = {};

  // Field name mapping for user-friendly error messages
  private fieldNames: { [key: string]: string } = {
    firstName: 'First Name',
    lastName: 'Last Name',
    profession: 'Profession'
  };

  readonly personForm = new FormGroup<PersonForm>({
    firstName: new FormControl('', {validators: [Validators.required , Validators.minLength(2)]}),
    lastName: new FormControl('', {validators: [Validators.required, Validators.minLength(2) ] }),
    profession: new FormControl(Profession.Artist, {validators: [Validators.required]}),
    isSelected: new FormControl(false),
    canBeTeamLeader: new FormControl(false),
    isActive: new FormControl(true)
  })

  // Getter for easy access
  get firstName() {
    return this.personForm.controls.firstName;
  }
  get lastName() {
    return this.personForm.controls.lastName;
  }
  get profession() {
    return this.personForm.controls.profession;
  }

  constructor(
    private fb: FormBuilder,
    private personService: PersonService,
    private cdr: ChangeDetectorRef
  ) {
    // Subscribe to form value changes to update validation messages
    this.personForm.valueChanges.subscribe(() => {
      //
    });
  }

  ngOnInit(): void {
    // Set some default values for the page
    this.editedPerson = null;
    this.headlineTitle = 'Add a new Person';

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

  onSubmit(): void {
    if (this.personForm.valid) {
      // Mark all fields as touched to trigger validation messages
      Object.keys(this.personForm.controls).forEach(key => {
        const control = this.personForm.get(key);
        control?.markAsTouched();
      });

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
    this.showConfirmDialog = false;
    this.cdr.detectChanges();
    console.log('Dialog state now:', this.showConfirmDialog);
    this.onReset();
  }

  onReset(): void {
    this.personForm.reset();
    this.personForConfirmDialog = null;
    this.formErrors = {};
    this.headlineTitle = 'Add Person';
  }
}

export type PersonForm = ToFormControls<Person, 'id'>;
