import { Injectable, signal, WritableSignal, computed } from '@angular/core';
import { Person } from '../models/person.model';
import { IEntityService } from "./IEntityService";

// Local storage key used to persist persons data
const STORAGE_KEY = 'assembly-planer-persons';

 // PersonService manages the application's persons data using Angular Signals.
 // All state is managed using Angular Signals for optimal change detection

@Injectable({
  providedIn: 'root'
})
export class PersonService implements IEntityService<Person> {

  //Signal holding the currently selected person for editing operations.
  // Null when no person is selected.
  private selectedPersonSignal: WritableSignal<Person | null> = signal(null);

  // Signal holding the complete array of persons.
  // This is the single source of truth for all persons data.
  private personsSignal: WritableSignal<Person[]> = signal([]);

  constructor() {
    // Load persons from localStorage on service initialization
    this.loadFromStorage();
  }

  // Returns the persons signal for direct access in components.
  getItems(): WritableSignal<Person[]> {
    return this.personsSignal;
  }

  //Adds a new person to the collection.
  // Creates a new array with the added person to maintain immutability,
  addItem(person: Person): void {
    const currentPersons = this.personsSignal();
    const updatedPersons = [...currentPersons, person];
    this.personsSignal.set(updatedPersons);
    this.saveToStorage();
  }

  //Removes a person from the collection by their ID.
  // Creates a new filtered array to maintain immutability,
  removeItem(id: string): void {
    const currentPersons = this.personsSignal();
    const updatedPersons = currentPersons.filter(p => p.id !== id);
    this.personsSignal.set(updatedPersons);
    this.saveToStorage();
  }

  // Updates an existing person in the collection.
  // Finds the person by ID and replaces it with the updated version.
  // Creates a new array to maintain immutability,
  updateItem(updatedPerson: Person): void {
    const currentPersons = this.personsSignal();
    const updatedPersons = currentPersons.map(p =>
      p.id === updatedPerson.id ? updatedPerson : p
    );
    this.personsSignal.set(updatedPersons);
    this.saveToStorage();
  }

  //Retrieves a single person by their ID.
  getItem(id: string): Person | undefined {
    return this.personsSignal().find(p => p.id === id);
  }

  // Removes all persons from the collection.
  clearItems(): void {
    this.personsSignal.set([]);
    this.saveToStorage();
  }

  //Returns the current count of persons in the collection.
  getItemCount(): number {
    return this.personsSignal().length;
  }

  // Loads persons data from localStorage.
  // Called automatically during service initialization.
  loadFromStorage(): void {
    const storedPersons = localStorage.getItem(STORAGE_KEY);
    if (storedPersons) {
      try {
        // Parse the stored JSON and recreate Person objects
        const parsedPersons = JSON.parse(storedPersons);
        const persons = parsedPersons.map((p: any) =>
          new Person(p.firstName, p.lastName, p.profession, p.isActive, p.canBeTeamLeader)
        );
        this.personsSignal.set(persons);
      } catch (error) {
        console.error('Error loading persons from storage:', error);
        this.personsSignal.set([]);
      }
    }
  }

  //Persists the current persons array to localStorage.
  // Called automatically after any CRUD operation.
  saveToStorage(): void {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.personsSignal()));
    } catch (error) {
      console.error('Error saving persons to storage:', error);
    }
  }

  //Sets the currently selected person for editing operations.
  setSelectedItem(person: Person): void {
    this.selectedPersonSignal.set(person);
  }

  // Returns the currently selected person.
  getSelectedItem(): Person | null {
    return this.selectedPersonSignal();
  }

  //Clears the currently selected person.
  clearSelectedItem(): void {
    this.selectedPersonSignal.set(null);
  }
}
