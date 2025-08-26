import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Equipment } from '../models/equipment.model';

const STORAGE_KEY = 'assembly-planer-equipments';

@Injectable({
  providedIn: 'root'
})
export class EquipmentService {

  // For Editing equipment, we keep a reference to the equipment being edited
  private selectedEquipment: Equipment | null = null;

  // Single source of truth - the BehaviorSubject holds the current state
  private equipmentsSubject = new BehaviorSubject<Equipment[]>([]);

  constructor() {
    // Load items from local storage on service initialization
    this.loadFromStorage();
  }

  // Get all equipment as an Observable
  getItems(): Observable<Equipment[]> {
    return this.equipmentsSubject.asObservable();
  }

  // Get current snapshot of equipment (useful when you need the array directly)
  getItemsSnapshot(): Equipment[] {
    return this.equipmentsSubject.value;
  }

  // Add a new equipment
  addItem(equipment: Equipment): void {
    const currentEquipments = this.equipmentsSubject.value;
    const updatedEquipments = [...currentEquipments, equipment];
    this.equipmentsSubject.next(updatedEquipments);
    this.saveToStorage();
  }

  // Remove equipment by id
  removeItem(id: string): void {
    const currentEquipments = this.equipmentsSubject.value;
    const updatedEquipments = currentEquipments.filter(p => p.id !== id);
    this.equipmentsSubject.next(updatedEquipments);
    this.saveToStorage();
  }

  // Update equipment by id
  updateItem(updatedEquipment: Equipment): void {
    const currentEquipments = this.equipmentsSubject.value;
    const updatedEquipments = currentEquipments.map(p => 
      p.id === updatedEquipment.id ? updatedEquipment : p
    );
    this.equipmentsSubject.next(updatedEquipments);
    this.saveToStorage();
  }

  // Get equipment by id
  getItem(id: string): Equipment | undefined {
    return this.equipmentsSubject.value.find(p => p.id === id);
  }

  // Clear all equipment
  clearItems(): void {
    this.equipmentsSubject.next([]);
    this.saveToStorage();
  }

  // Gets current number of equipment
  getItemCount(): number {
    return this.equipmentsSubject.value.length;
  }

  loadFromStorage(): void {
    const storedEquipments = localStorage.getItem(STORAGE_KEY);
    if (storedEquipments) {
      try {
        // Parse the stored JSON and recreate items
        const parsedEquipments = JSON.parse(storedEquipments);
        const equipments = parsedEquipments.map((p: any) => 
          new Equipment(p.description, p.equipmentType, p.isActive)
        );
        this.equipmentsSubject.next(equipments);
      } catch (error) {
        console.error('Error loading equipments from storage:', error);
        this.equipmentsSubject.next([]);
      }
    }
  }

  saveToStorage(): void {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.equipmentsSubject.value));
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