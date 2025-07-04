import { Profession } from './profession.enum';

export class Person {
  readonly id: string;
  isSelected: boolean;
  isActive: boolean = false;
  canBeTeamLeader: boolean = false;
  firstName: string;
  lastName: string;
  profession: Profession;

  constructor(firstName: string, lastName: string, profession: Profession, isActive: boolean, canBeTeamLeader: boolean) {
    this.id = this.generateGuid();
    this.isActive = false;
    this.isSelected = false;
    this.firstName = firstName;
    this.lastName = lastName;
    this.profession = profession;
    this.isActive = isActive;
    this.canBeTeamLeader = canBeTeamLeader;
  }

  private generateGuid(): string {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      const r = Math.random() * 16 | 0;
      const v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }
}
