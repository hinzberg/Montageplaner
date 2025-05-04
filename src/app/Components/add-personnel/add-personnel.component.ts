import { Component } from '@angular/core';
import { Person} from "../../core/models/person.model";
import { Profession} from "../../core/models/profession.enum";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-personnel',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './add-personnel.component.html',
  styleUrl: './add-personnel.component.scss'
})

export class AddPersonnelComponent {

  personForm: FormGroup;
  submittedPerson: Person | null = null;
  professions = Object.values(Profession);

  constructor(private fb: FormBuilder) {
    this.personForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      profession: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.personForm.valid) {
      this.submittedPerson = this.personForm.value;
      this.personForm.reset();
    }
  }

  onReset(): void {
    this.personForm.reset();
    this.submittedPerson = null;
  }
}
