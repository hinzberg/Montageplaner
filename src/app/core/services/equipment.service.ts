import { Injectable, signal, WritableSignal } from '@angular/core';
import { Equipment } from '../models/equipment.model';

const STORAGE_KEY = 'assembly-planer-equipments';

@Injectable({
  providedIn: 'root'
})
export class EquipmentService {

  // Signal holding the currently selected equipment for editing operations.
  // Null when no equipment is selected.
  private selectedEquipmentSignal: WritableSignal<Equipment | null> = signal(null);

  // Signal holding the complete array of equipments.
  // This is the single source of truth for all equipments data.
  private equipmentsSignal: WritableSignal<Equipment[]> = signal([]);

  constructor() {
    // Load items from local storage on service initialization
    this.loadFromStorage();
  }

  // Returns the equipments signal for direct access in components.
  getItems(): WritableSignal<Equipment[]> {
    return this.equipmentsSignal;
  }

  // Adds a new equipment to the collection.
  // Creates a new array with the added equipment to maintain immutability.
  addItem(equipment: Equipment): void {
    const currentEquipments = this.equipmentsSignal();
    const updatedEquipments = [...currentEquipments, equipment];
    this.equipmentsSignal.set(updatedEquipments);
    this.saveToStorage();
  }

  // Removes an equipment from the collection by their ID.
  // Creates a new filtered array to maintain immutability.
  removeItem(id: string): void {
    const currentEquipments = this.equipmentsSignal();
    const updatedEquipments = currentEquipments.filter(p => p.id !== id);
    this.equipmentsSignal.set(updatedEquipments);
    this.saveToStorage();
  }

  // Updates an existing equipment in the collection.
  // Finds the equipment by ID and replaces it with the updated version.
  // Creates a new array to maintain immutability.
  updateItem(updatedEquipment: Equipment): void {
    const currentEquipments = this.equipmentsSignal();
    const updatedEquipments = currentEquipments.map(p =>
      p.id === updatedEquipment.id ? updatedEquipment : p
    );
    this.equipmentsSignal.set(updatedEquipments);
    this.saveToStorage();
  }

  // Retrieves a single equipment by their ID.
  getItem(id: string): Equipment | undefined {
    return this.equipmentsSignal().find(p => p.id === id);
  }

  // Removes all equipments from the collection.
  clearItems(): void {
    this.equipmentsSignal.set([]);
    this.saveToStorage();
  }

  // Returns the current count of equipments in the collection.
  getItemCount(): number {
    return this.equipmentsSignal().length;
  }

  // Loads equipments data from localStorage.
  // Called automatically during service initialization.
  loadFromStorage(): void {
    const storedEquipments = localStorage.getItem(STORAGE_KEY);
    if (storedEquipments) {
      try {
        // Parse the stored JSON and recreate Equipment objects
        const parsedEquipments = JSON.parse(storedEquipments);
        const equipments = parsedEquipments.map((p: any) =>
          new Equipment(p.description, p.equipmentType, p.isActive)
        );
        this.equipmentsSignal.set(equipments);
      } catch (error) {
        console.error('Error loading equipments from storage:', error);
        this.equipmentsSignal.set([]);
      }
    }
  }

  // Persists the current equipments array to localStorage.
  // Called automatically after any CRUD operation.
  saveToStorage(): void {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.equipmentsSignal()));
    } catch (error) {
      console.error('Error saving equipments to storage:', error);
    }
  }

  // Sets the currently selected equipment for editing operations.
  setSelectedItem(equipment: Equipment): void {
    this.selectedEquipmentSignal.set(equipment);
  }

  // Returns the currently selected equipment.
  getSelectedItem(): Equipment | null {
    return this.selectedEquipmentSignal();
  }

  // Clears the currently selected equipment.
  clearSelectedItem(): void {
    this.selectedEquipmentSignal.set(null);
  }
}