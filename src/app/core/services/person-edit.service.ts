import { Injectable, EventEmitter } from '@angular/core';
import { Person } from '../models/person.model';

@Injectable({ providedIn: 'root' })

export class PersonEditService {
  private personToEdit: Person | null = null;

  setPerson(person: Person): void {
    this.personToEdit = person;
  }

  getPerson(): Person | null {
    return this.personToEdit;
  }

  clearPerson() {
    this.personToEdit = null;
  }
}
