import { WritableSignal } from "@angular/core";

/**
 * Generic entity service interface that defines the contract for managing entities.
 *
 * This interface uses Angular Signals for reactive state management.
 * All implementations should maintain their state using Signals for
 * optimal change detection and reactive data flow.
 *
 * @template T The type of entity this service manages
 */
export interface IEntityService<T> {

  /**
   * Returns a signal containing all items.
   * Components can subscribe to this signal for reactive updates.
   *
   * @returns WritableSignal containing the array of all items
   */
  getItems(): WritableSignal<T[]>;

  /**
   * Adds a new item to the collection.
   *
   * @param item The item to add
   */
  addItem(item: T): void;

  /**
   * Removes an item from the collection by its ID.
   *
   * @param id The unique identifier of the item to remove
   */
  removeItem(id: string): void;

  /**
   * Updates an existing item in the collection.
   * The item is matched by ID and replaced with the updated version.
   *
   * @param updatedItem The item with updated data (must have matching ID)
   */
  updateItem(updatedItem: T): void;

  /**
   * Retrieves a single item by its ID.
   *
   * @param id The unique identifier of the item
   * @returns The item if found, undefined otherwise
   */
  getItem(id: string): T | undefined;

  /**
   * Removes all items from the collection.
   */
  clearItems(): void;

  /**
   * Returns the current count of items in the collection.
   *
   * @returns Number of items
   */
  getItemCount(): number;

  /**
   * Sets the currently selected item (for editing operations).
   *
   * @param item The item to select
   */
  setSelectedItem(item: T): void;

  /**
   * Returns the currently selected item.
   *
   * @returns The selected item or null if none is selected
   */
  getSelectedItem(): T | null;

  /**
   * Clears the currently selected item.
   */
  clearSelectedItem(): void;

  /**
   * Persists the current state to storage (e.g., localStorage).
   */
  saveToStorage(): void;

  /**
   * Loads the state from storage (e.g., localStorage).
   */
  loadFromStorage(): void;
}
