import { EquipmentType } from './equipment-type.enum';
import { generateGuid} from "../../shared/utils/guid.util";

export class Equipment {
  readonly id: string;
  isSelected: boolean;
  isActive: boolean = false;
  description: string;
  equipmentType: EquipmentType;

  constructor(description: string, equipmentType: EquipmentType, isActive: boolean) {
    this.id = generateGuid();
    this.isActive = false;
    this.isSelected = false;
    this.description = description;
    this.equipmentType = equipmentType;
    this.isActive = isActive;
  }
}
