import { Injectable } from '@angular/core';
import { LocalStorageHelper } from '../models/local-storage.enum';
// @ts-ignore
import * as CryptoJS from 'crypto-js';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  constructor() {}

  save(item: LocalStorageHelper, value?: string): void {
    localStorage.setItem(
      item,
      this.encryptData(
        value as {},
        environment.secretKeys.localStoragePrivateKey
      )
    );
  }

  load(item: LocalStorageHelper): string {
    if (localStorage.getItem(item)) {
      return this.decryptData(
        localStorage.getItem(item) || '{}',
        environment.secretKeys.localStoragePrivateKey
      );
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

  encryptData(data?: {}, privateKey?: string): string {
    return CryptoJS.AES.encrypt(JSON.stringify(data), privateKey).toString();
  }

  removeCharacter(data: string, char: string): string {
    return data.split(char).join('***');
  }

  decryptData<T>(data: string, privateKey?: string): T {
    const bytes = CryptoJS.AES.decrypt(data, privateKey);
    const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    return decryptedData;
  }

  replaceCharacter(data: string, char: string): string {
    return data.split('***').join(char);
  }
}
