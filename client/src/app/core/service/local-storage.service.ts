import { Injectable } from '@angular/core';
import { LocalStorageHelper } from '../models/local-storage.enum';
import * as CryptoJS from 'crypto-js';
import { secretKeys } from '../../../environments/secret';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  constructor() {}

  save(item: LocalStorageHelper, value: string): void {
    localStorage.setItem(item, this.encryptData(value));
  }

  load(item: LocalStorageHelper): string {
    if (localStorage.getItem(item)) {
      return this.decryptData(localStorage.getItem(item));
    } else {
      return '';
    }
  }

  delete(item: LocalStorageHelper): void {
    localStorage.removeItem(item);
  }

  clear(): void {
    localStorage.clear();
  }

  encryptData(data): string {
    try {
      return CryptoJS.AES.encrypt(
        JSON.stringify(data),
        secretKeys.localStoragePrivateKey
      ).toString();
    } catch (e) {
      console.error(e);
    }
  }

  decryptData(data): string {
    try {
      const bytes = CryptoJS.AES.decrypt(
        data,
        secretKeys.localStoragePrivateKey
      );
      const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
      return decryptedData;
    } catch (e) {
      console.error(e);
    }
  }
}
