import { Injectable, EventEmitter } from '@angular/core';
import { Person } from '../models/person.model';
import { Profession } from '../models/profession.enum';

@Injectable({
  providedIn: 'root'
})
export class PersonnelService {
  private persons: Person[] = [];
  public personsUpdated = new EventEmitter<Person[]>();

  constructor() { }

  // Get all persons
  getPersons(): Person[] {
    return [...this.persons];
  }

  // Add a new person
  addPerson(person: Person): void {
    this.persons.push(person);
    this.personsUpdated.emit([...this.persons]);
  }

  // Remove a person by id
  removePerson(id: string): void {
    const index = this.persons.findIndex(p => p.id === id);
    if (index !== -1) {
      this.persons.splice(index, 1);
      this.personsUpdated.emit([...this.persons]);
    }
  }

  // Update a person by id
  updatePerson(updatedPerson: Person): void {
    const index = this.persons.findIndex(p => p.id === updatedPerson.id);
    if (index !== -1) {
      this.persons[index] = updatedPerson;
      this.personsUpdated.emit([...this.persons]);
    }
  }

  // Get a person by id
  getPerson(id: string): Person | undefined {
    return this.persons.find(p => p.id === id);
  }

  // Clear all persons
  clearPersons(): void {
    this.persons = [];
    this.personsUpdated.emit([]);
  }

  // Get current number of persons
  getPersonCount(): number {
    return this.persons.length;
  }
} 