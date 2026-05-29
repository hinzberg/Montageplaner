import { Injectable } from '@angular/core';
import { Equipment } from '../models/equipment.model';
import { AbstractEntityService } from './abstract-entity.service';
import { IndexedDbService, STORE_EQUIPMENTS } from './indexed-db.service';

/**
 * Manages the application's equipment data.
 * All shared CRUD / selection / storage logic lives in AbstractEntityService.
 */
@Injectable({
  providedIn: 'root'
})
export class EquipmentService extends AbstractEntityService<Equipment> {

  protected storeName = STORE_EQUIPMENTS;

  constructor(db: IndexedDbService) {
    super(db);
    this.loadFromStorage();
  }

  protected fromRecord(record: any): Equipment {
    return new Equipment(
      record.description,
      record.equipmentType,
      record.isActive,
      record.id
    );
  }
}
