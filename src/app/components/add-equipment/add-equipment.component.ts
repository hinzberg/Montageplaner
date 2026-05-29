import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  Validators
} from '@angular/forms';
import { Equipment } from '../../core/models/equipment.model';
import { EquipmentType } from '../../core/models/equipment-type.enum';
import { basicTextValidation } from '../../shared/utils/form-validators-utils';
import { EquipmentService } from '../../core/services/equipment.service';
import { ToFormControls } from '../../shared/utils/form-utils';
import { MessageboxComponent } from '../messagebox/messagebox.component';
import { InfoBoxComponent } from '../sub-components/info-box/info-box.component';
import { InfoBoxType } from '../sub-components/info-box/info-box-type.enum';
import { AbstractAddEditComponent } from '../shared/abstract-add-edit.component';

@Component({
  selector: 'app-add-equipment',
  standalone: true,
  imports: [ReactiveFormsModule, MessageboxComponent, InfoBoxComponent],
  templateUrl: './add-equipment.component.html',
  styleUrl: './add-equipment.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddEquipmentComponent extends AbstractAddEditComponent<Equipment, EquipmentForm> {

  protected readonly service = inject(EquipmentService);
  protected readonly entityLabel = 'Equipment';
  protected readonly fieldNames = {
    description: 'Description',
    equipmentType: 'Equipment Type'
  };

  protected readonly InfoBoxType = InfoBoxType;
  readonly equipmentTypes = Object.values(EquipmentType);

  readonly form = new FormGroup<EquipmentForm>({
    description: new FormControl('', { validators: [Validators.required, basicTextValidation()] }),
    equipmentType: new FormControl(EquipmentType.Other, { validators: [Validators.required, this.validateEquipmentType] }),
    isSelected: new FormControl(false),
    isActive: new FormControl(true)
  });

  protected loadFromModel(equipment: Equipment): void {
    this.form.controls.description.setValue(equipment.description);
    this.form.controls.equipmentType.setValue(equipment.equipmentType);
    this.form.controls.isActive.setValue(equipment.isActive);
  }

  protected createModel(): Equipment {
    return new Equipment(
      this.form.controls.description.value!.trim(),
      this.form.controls.equipmentType.value!,
      this.form.controls.isActive.value!
    );
  }

  protected applyToModel(equipment: Equipment): Equipment {
    equipment.description = this.form.controls.description.value!.trim();
    equipment.equipmentType = this.form.controls.equipmentType.value!;
    equipment.isActive = this.form.controls.isActive.value!;
    return equipment;
  }

  // Custom validator for equipment type.
  private validateEquipmentType(control: AbstractControl): ValidationErrors | null {
    const type = control.value;
    if (!type) {
      return { required: true };
    }
    if (!Object.values(EquipmentType).includes(type)) {
      return { invalidTEquipmentTpe: true };
    }
    return null;
  }
}

export type EquipmentForm = ToFormControls<Equipment, 'id'>;
