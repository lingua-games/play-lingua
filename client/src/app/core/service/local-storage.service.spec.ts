import { TestBed } from '@angular/core/testing';
import * as CryptoJS from 'crypto-js';
import { LocalStorageService } from './local-storage.service';
import { LocalStorageHelper } from '../models/local-storage.enum';

describe('LocalStorageService', () => {
  let service: LocalStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LocalStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call encryptData when save() hits', () => {
    spyOn(localStorage, 'setItem');
    spyOn(service, 'encryptData');
    const expectedValue = 'testString';

    service.save(LocalStorageHelper.isGuest, expectedValue);

    expect(service.encryptData).toHaveBeenCalledWith(expectedValue);
  });

  it('should store value into localStorage on save() method', () => {
    const expectedValue = 'testString';
    spyOn(localStorage, 'setItem');
    spyOn(service, 'encryptData').and.returnValue(expectedValue);

    service.save(LocalStorageHelper.isGuest, expectedValue);

    expect(localStorage.setItem).toHaveBeenCalledWith(
      LocalStorageHelper.isGuest,
      expectedValue
    );
  });

  it('should call decryptData when load() hits', () => {
    spyOn(localStorage, 'getItem').and.returnValue('something');
    spyOn(service, 'decryptData');

    service.load(LocalStorageHelper.isGuest);

    expect(service.decryptData).toHaveBeenCalledWith('something');
  });

  it('should return empty string if there is nothing in storage', () => {
    spyOn(localStorage, 'getItem').and.returnValue(null);

    expect(service.load(LocalStorageHelper.isGuest)).toBe('');
  });

  it('should call decryptData when load() hits', () => {
    const expectedValue = 'expectedValue';
    spyOn(localStorage, 'getItem').and.returnValue('something');
    spyOn(service, 'decryptData').and.returnValue(expectedValue);

    service.load(LocalStorageHelper.isGuest);

    expect(service.load(LocalStorageHelper.isGuest)).toBe(expectedValue);
  });

  it('should call removeItem when delete() hits', () => {
    spyOn(localStorage, 'removeItem');

    service.delete(LocalStorageHelper.isGuest);

    expect(localStorage.removeItem).toHaveBeenCalledWith(
      LocalStorageHelper.isGuest
    );
  });

  it('should call clear when clear() hits', () => {
    spyOn(localStorage, 'clear');

    service.clear();

    expect(localStorage.clear).toHaveBeenCalled();
  });

  it('should encrypt data when encrypt() hits', () => {
    spyOn(CryptoJS.AES, 'encrypt').and.returnValue({
      encrypt: jasmine.createSpy(),
    });

    service.encryptData('something');

    expect(CryptoJS.AES.encrypt).toHaveBeenCalled();
  });

  it('should decrypt data when decryptData() hits', () => {
    spyOn(CryptoJS.AES, 'decrypt').and.returnValue({
      encrypt: jasmine.createSpy(),
    });
    spyOn(JSON, 'parse').and.returnValue({ name: 1 });

    service.decryptData('{"name": 1}');

    expect(CryptoJS.AES.decrypt).toHaveBeenCalled();
  });
});
