import { Injectable, signal, WritableSignal, computed } from '@angular/core';
import { Person } from '../models/person.model';
import { IEntityService } from "./IEntityService";
import { IndexedDbService, STORE_PERSONS } from './indexed-db.service';

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

  constructor(private db: IndexedDbService) {
    // Load persons from IndexedDB on service initialization
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

  // Loads persons data from IndexedDB.
  // Called automatically during service initialization.
  // Fire-and-forget: the signal is filled once the DB resolves.
  loadFromStorage(): void {
    this.db.getAll<any>(STORE_PERSONS)
      .then(parsedPersons => {
        // Recreate Person objects from the stored records
        const persons = parsedPersons.map(p =>
          new Person(p.firstName, p.lastName, p.profession, p.isActive, p.canBeTeamLeader, p.id)
        );
        this.personsSignal.set(persons);
      })
      .catch(error => {
        console.error('Error loading persons from storage:', error);
        this.personsSignal.set([]);
      });
  }

  //Persists the current persons array to IndexedDB.
  // Called automatically after any CRUD operation. Fire-and-forget.
  saveToStorage(): void {
    this.db.putAll(STORE_PERSONS, this.personsSignal())
      .catch(error => console.error('Error saving persons to storage:', error));
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
