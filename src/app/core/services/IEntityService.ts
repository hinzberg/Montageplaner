import { Observable } from "rxjs/internal/Observable";

export interface IEntityService<T> {

  // Get all items as an array copy
  getItems(): Observable<T[]>;

  // Add an item
  addItem(item: T): void;

  // Remove an item by string id
  removeItem(id: string): void;

  // Update an item by providing a new item (with same id)
  updateItem(updatedItem: T): void;

  // Get a single item by id (or undefined if not found)
  getItem(id: string): T | undefined;

  // Clear all items
  clearItems(): void;

  // Get number of items
  getItemCount(): number;

  // Set a selected item
  setSelectedItem(item: T): void;

  // Get selected item (or null if none selected)
  getSelectedItem(): T | null;

  // Clear selected item
  clearSelectedItem(): void;

  saveToStorage(): void;

  loadFromStorage(): void;
}
