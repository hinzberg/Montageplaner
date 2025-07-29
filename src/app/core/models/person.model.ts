import { Profession } from './profession.enum';
import { generateGuid} from "../../shared/utils/guid.util";

export class Person {
  readonly id: string;
  isSelected: boolean;
  isActive: boolean = false;
  canBeTeamLeader: boolean = false;
  firstName: string;
  lastName: string;
  profession: Profession;

  constructor(firstName: string, lastName: string, profession: Profession, isActive: boolean, canBeTeamLeader: boolean) {
    this.id = generateGuid();
    this.isActive = false;
    this.isSelected = false;
    this.firstName = firstName;
    this.lastName = lastName;
    this.profession = profession;
    this.isActive = isActive;
    this.canBeTeamLeader = canBeTeamLeader;
  }
}
