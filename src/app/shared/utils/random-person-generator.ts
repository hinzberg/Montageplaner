import {Person} from '../../core/models/person.model';
import {Profession} from "../../core/models/profession.enum";

export class RandomPersonGenerator {
  private firstNames: string[] = [
    "James", "Mary", "John", "Patricia", "Robert", "Jennifer",
    "Michael", "Linda", "William", "Elizabeth", "David", "Barbara",
    "Richard", "Susan", "Joseph", "Jessica", "Thomas", "Sarah",
    "Charles", "Karen", "Christopher", "Nancy", "Daniel", "Lisa",
    "Matthew", "Betty", "Anthony", "Margaret", "Mark", "Sandra"
  ];
  private lastNames: string[] = [
    "Smith", "Johnson", "Williams", "Brown", "Jones", "Garcia",
    "Miller", "Davis", "Rodriguez", "Martinez", "Hernandez", "Lopez",
    "Gonzalez", "Wilson", "Anderson", "Thomas", "Taylor", "Moore",
    "Jackson", "Martin", "Lee", "Perez", "Thompson", "White",
    "Harris", "Sanchez", "Clark", "Ramirez", "Lewis", "Robinson"
  ];

  // Helper to generate a random integer in [0, max)
  private getRandomInt(max: number): number {
    return Math.floor(Math.random() * max);
  }

  generatePeople(x: number): Person[] {
    const people: Person[] = [];
    const usedCombinations = new Set<string>();

    while (people.length < x) {
      // Pick random first and last names and profession
      const firstName = this.firstNames[this.getRandomInt(this.firstNames.length)];
      const lastName = this.lastNames[this.getRandomInt(this.lastNames.length)];
      const professionValues = Object.values(Profession);
      const profession = professionValues[this.getRandomInt(professionValues.length)] as Profession;
      const fullNameKey = `${firstName} ${lastName}`;

      // Ensure uniqueness
      if (!usedCombinations.has(fullNameKey)) {
        usedCombinations.add(fullNameKey);
        people.push(new Person(firstName, lastName, profession, true, false));
      }

      // Edge case: if x is greater than total unique combinations
      if (usedCombinations.size >= this.firstNames.length * this.lastNames.length) {
        break;
      }
    }

    return people;
  }

}
