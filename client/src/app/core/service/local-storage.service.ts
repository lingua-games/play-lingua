import { Injectable } from '@angular/core';
import { LocalStorageHelper } from '../models/local-storage.enum';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  constructor() {}

  save(item: LocalStorageHelper, value: string): void {}

  load(item: LocalStorageHelper): string {
    return localStorage.getItem(item);
  }

  delete(item: LocalStorageHelper): void {
    localStorage.removeItem(item);
  }

  clear(): void {
    localStorage.clear();
  }
}
