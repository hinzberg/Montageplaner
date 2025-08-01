import {Component, OnInit} from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  ValidationErrors,
  Validators
} from "@angular/forms";
import {NgForOf, NgIf} from "@angular/common";
import {
  PeopleAddedOverlayDialogComponent
} from "../add-people/people-added-overlay-dialog/people-added-dialog.component";
import {ToFormControls} from "../../shared/utils/form-utils";
import {Person} from "../../core/models/person.model";
import {Equipment} from "../../core/models/equipment.model";
import {Profession} from "../../core/models/profession.enum";
import {PersonForm} from "../add-people/add-people.component";
import {EquipmentType} from "../../core/models/equipment-type.enum";
import {basicTextValidation} from "../../shared/utils/form-validators-utils";

@Component({
  selector: 'app-add-equipment',
  standalone: true,
  imports: [
    FormsModule,
    NgForOf,
    NgIf,
    PeopleAddedOverlayDialogComponent,
    ReactiveFormsModule
  ],
  templateUrl: './add-equipment.component.html',
  styleUrl: './add-equipment.component.scss'
})
export class AddEquipmentComponent implements OnInit {

  // HeadlineTitle
  headlineTitle = 'Add Equipment';

  readonly equipmentForm = new FormGroup<EquipmentForm>({
    description: new FormControl('', {validators: [Validators.required, basicTextValidation()]}),
    equipmentType: new FormControl(EquipmentType.Other, {validators: [Validators.required, this.validateEquipmentType]}),
    isSelected: new FormControl(false),
    isActive: new FormControl(true)
  })

  ngOnInit(): void {

  }

  // Custom validator for profession
  validateEquipmentType(control: AbstractControl): ValidationErrors | null {
    const profession = control.value;
    if (!profession) {
      return {required: true};
    }
    if (!Object.values(EquipmentType).includes(profession)) {
      return {invalidProfession: true};
    }
    return null;
  }


}

export type EquipmentForm = ToFormControls<Equipment, 'id'>;
