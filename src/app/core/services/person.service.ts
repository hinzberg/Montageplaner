import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Person } from '../models/person.model';
import { IEntityService} from "./IEntityService";

const STORAGE_KEY = 'assembly-planer-persons';

@Injectable({
  providedIn: 'root'
})
export class PersonService implements IEntityService<Person> {

  // For Editing a person, we keep a reference to the person being edited
  private selectedPerson: Person | null = null;

  // Single source of truth - the BehaviorSubject holds the current state
  private personsSubject = new BehaviorSubject<Person[]>([]);

  constructor() {
    // Load persons from local storage on service initialization
    this.loadFromStorage();
  }

  // Get all persons as an Observable
  getItems(): Observable<Person[]> {
    return this.personsSubject.asObservable();
  }

  // Get current snapshot of persons (useful when you need the array directly)
  getItemsSnapshot(): Person[] {
    return this.personsSubject.value;
  }

  // Add a new person
  addItem(person: Person): void {
    const currentPersons = this.personsSubject.value;
    const updatedPersons = [...currentPersons, person];
    this.personsSubject.next(updatedPersons);
    this.saveToStorage();
  }

  // Remove a person by id
  removeItem(id: string): void {
    const currentPersons = this.personsSubject.value;
    const updatedPersons = currentPersons.filter(p => p.id !== id);
    this.personsSubject.next(updatedPersons);
    this.saveToStorage();
  }

  // Update a person by id
  updateItem(updatedPerson: Person): void {
    const currentPersons = this.personsSubject.value;
    const updatedPersons = currentPersons.map(p => 
      p.id === updatedPerson.id ? updatedPerson : p
    );
    this.personsSubject.next(updatedPersons);
    this.saveToStorage();
  }

  // Get a person by id
  getItem(id: string): Person | undefined {
    return this.personsSubject.value.find(p => p.id === id);
  }

  // Clear all persons
  clearItems(): void {
    this.personsSubject.next([]);
    this.saveToStorage();
  }

  // Gets current number of persons
  getItemCount(): number {
    return this.personsSubject.value.length;
  }

  loadFromStorage(): void {
    const storedPersons = localStorage.getItem(STORAGE_KEY);
    if (storedPersons) {
      try {
        // Parse the stored JSON and recreate Person objects
        const parsedPersons = JSON.parse(storedPersons);
        const persons = parsedPersons.map((p: any) => 
          new Person(p.firstName, p.lastName, p.profession, p.isActive, p.canBeTeamLeader)
        );
        this.personsSubject.next(persons);
      } catch (error) {
        console.error('Error loading persons from storage:', error);
        this.personsSubject.next([]);
      }
    }
  }

  saveToStorage(): void {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.personsSubject.value));
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