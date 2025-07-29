import { Injectable, EventEmitter } from '@angular/core';
import { Person } from '../models/person.model';
import { IEntityService} from "./IEntityService";

const STORAGE_KEY = 'montageplaner_persons';

@Injectable({
  providedIn: 'root'
})

export class PersonService implements IEntityService<Person> {

  // This is actual the list of persons
  private persons: Person[] = [];

  // For Editing a person, we keep a reference to the person being edited
  private selectedPerson: Person | null = null;

  // This is the event emitter for the persons list
  //  It's used to notify components that are subscribed to it about changes in the personnel list.
  public itemsUpdated = new EventEmitter<Person[]>();

  constructor() {
    // Load persons from local storage on service initialization
    this.loadFromStorage();
  }

  // Get all persons
  getItems(): Person[] {
    return [...this.persons];
  }

  // Add a new person
  addItem(person: Person): void {
    this.persons.push(person);
    this.itemsUpdated.emit([...this.persons]);
    this.saveToStorage();
  }

  // Remove a person by id
  removeItem(id: string): void {
    const index = this.persons.findIndex(p => p.id === id);
    if (index !== -1) {
      this.persons.splice(index, 1);
      this.itemsUpdated.emit([...this.persons]);
      this.saveToStorage();
    }
  }

  // Update a person by id
  updateItem(updatedPerson: Person): void {
    const index = this.persons.findIndex(p => p.id === updatedPerson.id);
    if (index !== -1) {
      this.persons[index] = updatedPerson;
      this.itemsUpdated.emit([...this.persons]);
      this.saveToStorage();
    }
  }

  // Get a person by id
  getItem(id: string): Person | undefined {
    return this.persons.find(p => p.id === id);
  }

  // Clear all persons
  clearItems(): void {
    this.persons = [];
    this.itemsUpdated.emit([]);
    this.saveToStorage();
  }

  // Gets current number of persons
  getItemCount(): number {
    return this.persons.length;
  }

  loadFromStorage(): void {
    const storedPersons = localStorage.getItem(STORAGE_KEY);
    if (storedPersons) {
      try {
        // Parse the stored JSON and recreate Person objects
        const parsedPersons = JSON.parse(storedPersons);
        this.persons = parsedPersons.map((p: any) => new Person(p.firstName, p.lastName, p.profession, p.isActive, p.canBeTeamLeader));
        this.itemsUpdated.emit([...this.persons]);
      } catch (error) {
        console.error('Error loading persons from storage:', error);
        this.persons = [];
      }
    }
  }

  saveToStorage(): void {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.persons));
    } catch (error) {
      console.error('Error saving persons to storage:', error);
    }
  }

  setSelectedItem(person: Person): void {
    this.selectedPerson = person;
  }

  getSelectedItem(): Person | null {
    return this.selectedPerson;
  }

  clearSelectedItem() {
    this.selectedPerson = null;
  }
}
