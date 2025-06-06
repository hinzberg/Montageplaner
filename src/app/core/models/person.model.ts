import { Profession } from './profession.enum';

export class Person {
  readonly id: string;
  isSelected: boolean;
  canBeTeamLeader: boolean = false;
  firstName: string;
  lastName: string;
  profession: Profession;

  constructor(firstName: string, lastName: string, profession: Profession) {
    this.id = this.generateGuid();
    this.isSelected = false;
    this.firstName = firstName;
    this.lastName = lastName;
    this.profession = profession;
  }

  private generateGuid(): string {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      const r = Math.random() * 16 | 0;
      const v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }
}
