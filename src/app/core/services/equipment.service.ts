import { Injectable, EventEmitter } from '@angular/core';
import { Equipment } from '../models/equipment.model';

const STORAGE_KEY = 'montageplaner_equipment';

@Injectable({
  providedIn: 'root'
})

export class EquipmentService {

  // This is actual the list of equipment
  private equipments: Equipment[] = [];

  // For Editing equipment, we keep a reference to the equipment being edited
  private selectedEquipment: Equipment | null = null;

  // This is the event emitter for the equipment list
  // It's used to notify components that are subscribed to it about changes in the equipment list.
  public equipmentsUpdated = new EventEmitter<Equipment[]>();

  constructor() {
    // Load equipments from local storage on service initialization
    this.loadEquipmentsFromStorage();
  }

  // Get all
  getPersons(): Equipment[] {
    return [...this.equipments];
  }

  // Add a new
  addPerson(equipment: Equipment): void {
    this.equipments.push(equipment);
    this.equipmentsUpdated.emit([...this.equipments]);
    this.saveEquipmentsToStorage();
  }

  // Remove by id
  removeEquipment(id: string): void {
    const index = this.equipments.findIndex(p => p.id === id);
    if (index !== -1) {
      this.equipments.splice(index, 1);
      this.equipmentsUpdated.emit([...this.equipments]);
      this.saveEquipmentsToStorage();
    }
  }

  // Update by id
  updateEquipment(updatedEquipment: Equipment): void {
    const index = this.equipments.findIndex(p => p.id === updatedEquipment.id);
    if (index !== -1) {
      this.equipments[index] = updatedEquipment;
      this.equipmentsUpdated.emit([...this.equipments]);
      this.saveEquipmentsToStorage();
    }
  }

  // Get by id
  getPerson(id: string): Equipment | undefined {
    return this.equipments.find(p => p.id === id);
  }

  // Clear all
  clearEquipment(): void {
    this.equipments = [];
    this.equipmentsUpdated.emit([]);
    this.saveEquipmentsToStorage();
  }

  // Get current number
  getEquipmentCount(): number {
    return this.equipments.length;
  }

  private loadEquipmentsFromStorage(): void {
    const storedEquipments = localStorage.getItem(STORAGE_KEY);
    if (storedEquipments) {
      try {
        // Parse the stored JSON and recreate Person objects
        const parsedEquipments = JSON.parse(storedEquipments);
        this.equipments = parsedEquipments.map((p: any) => new Equipment(p.description, p.type, p.isActive));
        this.equipmentsUpdated.emit([...this.equipments]);
      } catch (error) {
        console.error('Error loading equipment from storage:', error);
        this.equipments = [];
      }
    }
  }

  private saveEquipmentsToStorage(): void {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.equipments));
    } catch (error) {
      console.error('Error saving equipments to storage:', error);
    }
  }

  setSelectedEquipment(equipment: Equipment): void {
    this.selectedEquipment = equipment;
  }

  getSelectedEquipment(): Equipment | null {
    return this.selectedEquipment;
  }

  clearSelectedEquipment() {
    this.selectedEquipment = null;
  }
}
