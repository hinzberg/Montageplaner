import {Injectable, EventEmitter} from '@angular/core';
import {Equipment} from '../models/equipment.model';
const STORAGE_KEY = 'assembly-planer-equipments';

@Injectable({
  providedIn: 'root'
})

export class EquipmentService {

  // This is actual the list of equipment
  private equipments: Equipment[] = [];

  // For Editing equipment, we keep a reference to the equipment being edited
  private selectedEquipment: Equipment | null = null;

  // This is the event emitter
  // It's used to notify components that are subscribed to it about changes in the equipment list.
  public itemsUpdated = new EventEmitter<Equipment[]>();

  constructor() {
    // Load items from local storage on service initialization
    this.loadFromStorage();
  }

  // Get all
  getItems(): Equipment[] {
    return [...this.equipments];
  }

  // Add a new
  addItem(equipment: Equipment): void {
    this.equipments.push(equipment);
    this.itemsUpdated.emit([...this.equipments]);
    this.saveToStorage();
  }

  // Remove by id
  removeItem(id: string): void {
    const index = this.equipments.findIndex(p => p.id === id);
    if (index !== -1) {
      this.equipments.splice(index, 1);
      this.itemsUpdated.emit([...this.equipments]);
      this.saveToStorage();
    }
  }

  // Update by id
  updateItem(updatedEquipment: Equipment): void {
    const index = this.equipments.findIndex(p => p.id === updatedEquipment.id);
    if (index !== -1) {
      this.equipments[index] = updatedEquipment;
      this.itemsUpdated.emit([...this.equipments]);
      this.saveToStorage();
    }
  }

  // Get by id
  getItem(id: string): Equipment | undefined {
    return this.equipments.find(p => p.id === id);
  }

  // Clear all
  clearItems(): void {
    this.equipments = [];
    this.itemsUpdated.emit([]);
    this.saveToStorage();
  }

  // Gets current number of items
  getItemCount(): number {
    return this.equipments.length;
  }

  loadFromStorage(): void {
    const storedEquipments = localStorage.getItem(STORAGE_KEY);
    if (storedEquipments) {
      try {
        // Parse the stored JSON and recreate items
        const parsedEquipments = JSON.parse(storedEquipments);
        this.equipments = parsedEquipments.map((p: any) => new Equipment(p.description, p.equipmentType, p.isActive));
        this.itemsUpdated.emit([...this.equipments]);
      } catch (error) {
        console.error('Error loading equipments from storage:', error);
        this.equipments = [];
      }
    }
  }

  saveToStorage(): void {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.equipments));
    } catch (error) {
      console.error('Error saving equipments to storage:', error);
    }
  }

  setSelectedItem(equipment: Equipment): void {
    this.selectedEquipment = equipment;
  }

  getSelectedItem(): Equipment | null {
    return this.selectedEquipment;
  }

  clearSelectedItem() {
    this.selectedEquipment = null;
  }
}
