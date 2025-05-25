import { Component } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-person-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './person-form.component.html',
  styleUrl: './person-form.component.scss'
})

export class PersonFormComponent {

  constructor(private fb: FormBuilder) { }

  readonly personForm = new FormGroup<PersonForm>({
    firstName: new FormControl('', {validators: [Validators.required, Validators.minLength(2)]}),
    lastName: new FormControl('', {validators: [Validators.required, Validators.minLength(2)]})
  })

  // Methode wird aufgerufen, wenn das Formular gültig abgesendet wurde
  onSubmit(): void {
    if (!this.personForm.valid) {
      return;
    }

    const person: Person = {
      firstName: this.personForm.controls.firstName.value!,
      lastName: this.personForm.controls.lastName.value!
    };

    console.log('Firstname:', person.firstName);
    console.log('Lastname:', person.lastName);
    this.personForm.reset();
  }
}

export interface Person {
  firstName: string;
  lastName: string;
  internalId?: string; // Soll nicht in das Formular
  isAdmin?: boolean;   // Soll nicht in das Formular
}

type ToFormControls<T, ExcludeKeys extends keyof T = never> = {
  [K in Exclude<keyof T, ExcludeKeys>]: FormControl<T[K] | null>;
};

export type PersonForm = ToFormControls<Person, 'internalId' | 'isAdmin'>;
