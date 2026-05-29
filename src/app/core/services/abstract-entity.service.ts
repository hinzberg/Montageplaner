import { signal, WritableSignal } from '@angular/core';
import { IEntityService } from './IEntityService';
import { IndexedDbService } from './indexed-db.service';

/**
 * Generic, signal-backed entity store persisted to IndexedDB.
 *
 * Holds all the CRUD / selected-item / storage logic shared by every entity
 * service. Concrete services only declare which object store to use and how to
 * rehydrate a stored record into a model instance.
 *
 * @template T entity type, must expose a string `id`
 */
export abstract class AbstractEntityService<T extends { id: string }> implements IEntityService<T> {

  // Name of the IndexedDB object store this service persists to.
  protected abstract storeName: string;

  // Rehydrates a plain stored record into a model instance.
  protected abstract fromRecord(record: any): T;

  // Currently selected item (for editing operations); null when none.
  private selectedSignal: WritableSignal<T | null> = signal(null);

  // Single source of truth for all items.
  private itemsSignal: WritableSignal<T[]> = signal([]);

  protected constructor(protected db: IndexedDbService) {}

  getItems(): WritableSignal<T[]> {
    return this.itemsSignal;
  }

  addItem(item: T): void {
    this.itemsSignal.set([...this.itemsSignal(), item]);
    this.saveToStorage();
  }

  removeItem(id: string): void {
    this.itemsSignal.set(this.itemsSignal().filter(i => i.id !== id));
    this.saveToStorage();
  }

  updateItem(updatedItem: T): void {
    this.itemsSignal.set(
      this.itemsSignal().map(i => (i.id === updatedItem.id ? updatedItem : i))
    );
    this.saveToStorage();
  }

  getItem(id: string): T | undefined {
    return this.itemsSignal().find(i => i.id === id);
  }

  clearItems(): void {
    this.itemsSignal.set([]);
    this.saveToStorage();
  }

  getItemCount(): number {
    return this.itemsSignal().length;
  }

  // Loads items from IndexedDB. Fire-and-forget: the signal fills once the DB resolves.
  loadFromStorage(): void {
    this.db.getAll<any>(this.storeName)
      .then(records => this.itemsSignal.set(records.map(r => this.fromRecord(r))))
      .catch(error => {
        console.error(`Error loading "${this.storeName}" from storage:`, error);
        this.itemsSignal.set([]);
      });
  }

  // Persists the current array to IndexedDB. Fire-and-forget.
  saveToStorage(): void {
    this.db.putAll(this.storeName, this.itemsSignal())
      .catch(error => console.error(`Error saving "${this.storeName}" to storage:`, error));
  }

  setSelectedItem(item: T): void {
    this.selectedSignal.set(item);
  }

  getSelectedItem(): T | null {
    return this.selectedSignal();
  }

  clearSelectedItem(): void {
    this.selectedSignal.set(null);
  }
}
