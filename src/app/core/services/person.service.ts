import { Injectable, EventEmitter } from '@angular/core';
import { Person } from '../models/person.model';

const STORAGE_KEY = 'montageplaner_persons';

@Injectable({
  providedIn: 'root'
})
export class PersonService {

  // This is actual the list of persons
  private persons: Person[] = [];

  // For Editing a person, we keep a reference to the person being edited
  private selectedPerson: Person | null = null;

  // This is the event emitter for the persons list
  //  It's used to notify components that are subscribed to it about changes in the personnel list.
  public personsUpdated = new EventEmitter<Person[]>();

  constructor() {
    // Load persons from local storage on service initialization
    this.loadPersonsFromStorage();
  }

  // Get all persons
  getPersons(): Person[] {
    return [...this.persons];
  }

  // Add a new person
  addPerson(person: Person): void {
    this.persons.push(person);
    this.personsUpdated.emit([...this.persons]);
    this.savePersonsToStorage();
  }

  // Remove a person by id
  removePerson(id: string): void {
    const index = this.persons.findIndex(p => p.id === id);
    if (index !== -1) {
      this.persons.splice(index, 1);
      this.personsUpdated.emit([...this.persons]);
      this.savePersonsToStorage();
    }
  }

  // Update a person by id
  updatePerson(updatedPerson: Person): void {
    const index = this.persons.findIndex(p => p.id === updatedPerson.id);
    if (index !== -1) {
      this.persons[index] = updatedPerson;
      this.personsUpdated.emit([...this.persons]);
      this.savePersonsToStorage();
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
    this.savePersonsToStorage();
  }

  // Get current number of persons
  getPersonCount(): number {
    return this.persons.length;
  }

  private loadPersonsFromStorage(): void {
    const storedPersons = localStorage.getItem(STORAGE_KEY);
    if (storedPersons) {
      try {
        // Parse the stored JSON and recreate Person objects
        const parsedPersons = JSON.parse(storedPersons);
        this.persons = parsedPersons.map((p: any) => new Person(p.firstName, p.lastName, p.profession, p.isActive, p.canBeTeamLeader));
        this.personsUpdated.emit([...this.persons]);
      } catch (error) {
        console.error('Error loading persons from storage:', error);
        this.persons = [];
      }
    }
  }

  private savePersonsToStorage(): void {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.persons));
    } catch (error) {
      console.error('Error saving persons to storage:', error);
    }
  }

  setSelectedPerson(person: Person): void {
    this.selectedPerson = person;
  }

  getSelectedPerson(): Person | null {
    return this.selectedPerson;
  }

  clearSelectedPerson() {
    this.selectedPerson = null;
  }

}
