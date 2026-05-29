import { Injectable } from '@angular/core';

// IndexedDB database + store names shared by all entity services.
const DB_NAME = 'assembly-planer-db';
const DB_VERSION = 1;
export const STORE_EQUIPMENTS = 'equipments';
export const STORE_PERSONS = 'persons';

/**
 * Thin wrapper around the native IndexedDB API.
 *
 * Opens a single database (lazily, cached as a Promise) with one object store
 * per entity type, all keyed by 'id'. Exposes Promise-based helpers so entity
 * services can persist their signal arrays without dealing with raw IDBRequest
 * event plumbing.
 */
@Injectable({
  providedIn: 'root'
})
export class IndexedDbService {

  // Cached open-database promise. The DB is opened once on first access.
  private dbPromise: Promise<IDBDatabase> | null = null;

  // Opens (or returns the cached) database connection.
  // Object stores are created during the 'upgradeneeded' event.
  private openDb(): Promise<IDBDatabase> {
    if (this.dbPromise) {
      return this.dbPromise;
    }

    this.dbPromise = new Promise<IDBDatabase>((resolve, reject) => {
      const request = indexedDB.open(DB_NAME, DB_VERSION);

      request.onupgradeneeded = () => {
        const db = request.result;
        if (!db.objectStoreNames.contains(STORE_EQUIPMENTS)) {
          db.createObjectStore(STORE_EQUIPMENTS, { keyPath: 'id' });
        }
        if (!db.objectStoreNames.contains(STORE_PERSONS)) {
          db.createObjectStore(STORE_PERSONS, { keyPath: 'id' });
        }
      };

      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });

    return this.dbPromise;
  }

  // Returns all records from the given object store.
  async getAll<T>(store: string): Promise<T[]> {
    const db = await this.openDb();
    return new Promise<T[]>((resolve, reject) => {
      const tx = db.transaction(store, 'readonly');
      const request = tx.objectStore(store).getAll();
      request.onsuccess = () => resolve(request.result as T[]);
      request.onerror = () => reject(request.error);
    });
  }

  // Replaces the entire contents of the given object store with `items`.
  // Clears the store then puts each item, all inside one readwrite transaction.
  // Mirrors the previous "rewrite the whole array" persistence semantics.
  async putAll(store: string, items: any[]): Promise<void> {
    const db = await this.openDb();
    return new Promise<void>((resolve, reject) => {
      const tx = db.transaction(store, 'readwrite');
      const objectStore = tx.objectStore(store);
      objectStore.clear();
      for (const item of items) {
        objectStore.put(item);
      }
      tx.oncomplete = () => resolve();
      tx.onerror = () => reject(tx.error);
      tx.onabort = () => reject(tx.error);
    });
  }
}
