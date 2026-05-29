import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Person } from '../../core/models/person.model';
import { Profession } from '../../core/models/profession.enum';
import { PersonService } from '../../core/services/person.service';
import { ToFormControls } from '../../shared/utils/form-utils';
import { MessageboxComponent } from '../messagebox/messagebox.component';
import { InfoBoxComponent } from '../sub-components/info-box/info-box.component';
import { InfoBoxType } from '../sub-components/info-box/info-box-type.enum';
import { AbstractAddEditComponent } from '../shared/abstract-add-edit.component';

@Component({
  selector: 'app-add-staff',
  standalone: true,
  imports: [ReactiveFormsModule, MessageboxComponent, InfoBoxComponent],
  templateUrl: './add-people.component.html',
  styleUrl: './add-people.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddPeopleComponent extends AbstractAddEditComponent<Person, PersonForm> {

  protected readonly service = inject(PersonService);
  protected readonly entityLabel = 'Person';
  protected readonly fieldNames = {
    firstName: 'First Name',
    lastName: 'Last Name',
    profession: 'Profession'
  };

  protected readonly InfoBoxType = InfoBoxType;
  readonly professions = Object.values(Profession);

  readonly form = new FormGroup<PersonForm>({
    firstName: new FormControl('', { validators: [Validators.required, Validators.minLength(2)] }),
    lastName: new FormControl('', { validators: [Validators.required, Validators.minLength(2)] }),
    profession: new FormControl(Profession.Artist, { validators: [Validators.required] }),
    isSelected: new FormControl(false),
    canBeTeamLeader: new FormControl(false),
    isActive: new FormControl(true)
  });

  // Template getters for inline validation display.
  get firstName() { return this.form.controls.firstName; }
  get lastName() { return this.form.controls.lastName; }
  get profession() { return this.form.controls.profession; }

  protected loadFromModel(person: Person): void {
    this.form.controls.firstName.setValue(person.firstName);
    this.form.controls.lastName.setValue(person.lastName);
    this.form.controls.profession.setValue(person.profession);
    this.form.controls.canBeTeamLeader.setValue(person.canBeTeamLeader);
    this.form.controls.isActive.setValue(person.isActive);
  }

  protected createModel(): Person {
    return new Person(
      this.form.controls.firstName.value!.trim(),
      this.form.controls.lastName.value!.trim(),
      this.form.controls.profession.value!,
      this.form.controls.isActive.value!,
      this.form.controls.canBeTeamLeader.value!
    );
  }

  protected applyToModel(person: Person): Person {
    person.firstName = this.form.controls.firstName.value!.trim();
    person.lastName = this.form.controls.lastName.value!.trim();
    person.profession = this.form.controls.profession.value!;
    person.canBeTeamLeader = this.form.controls.canBeTeamLeader.value!;
    person.isActive = this.form.controls.isActive.value!;
    return person;
  }
}

export type PersonForm = ToFormControls<Person, 'id'>;
