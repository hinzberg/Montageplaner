import { Injectable } from '@angular/core';
import { Person } from '../models/person.model';
import { AbstractEntityService } from './abstract-entity.service';
import { IndexedDbService, STORE_PERSONS } from './indexed-db.service';

/**
 * Manages the application's persons data.
 * All shared CRUD / selection / storage logic lives in AbstractEntityService.
 */
@Injectable({
  providedIn: 'root'
})
export class PersonService extends AbstractEntityService<Person> {

  protected storeName = STORE_PERSONS;

  constructor(db: IndexedDbService) {
    super(db);
    this.loadFromStorage();
  }

  protected fromRecord(record: any): Person {
    return new Person(
      record.firstName,
      record.lastName,
      record.profession,
      record.isActive,
      record.canBeTeamLeader,
      record.id
    );
  }
}
