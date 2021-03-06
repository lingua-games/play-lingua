import { TestBed } from '@angular/core/testing';
import { SecurityService } from './security.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LocalStorageService } from './local-storage.service';
import { LocalStorageHelper } from '../models/local-storage.enum';
import jwt_decode from 'jwt-decode';
import { SecurityTokenInterface } from '../models/security-token.interface';

describe('SecurityService', () => {
  let service: SecurityService;
  let httpClientSpy: {
    post: jasmine.Spy;
  };
  let mockLocalStorageService;

  beforeEach(() => {
    mockLocalStorageService = jasmine.createSpyObj(['save', 'load']);
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [
        {
          provide: MatDialog,
          useValue: {
            closeAll: () => {},
          },
        },
        {
          provide: LocalStorageService,
          useValue: mockLocalStorageService,
        },
      ],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
    });
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['post']);

    service = new SecurityService(
      // tslint:disable-next-line:no-any
      httpClientSpy as any,
      // tslint:disable-next-line:no-any
      RouterTestingModule as any,
      // tslint:disable-next-line:no-any
      {
        closeAll: () => {},
      } as any,
      mockLocalStorageService
    );
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should save value in localStorage when setToken hits', () => {
    service.setToken('someToken');
    expect(mockLocalStorageService.save).toHaveBeenCalledWith(
      LocalStorageHelper.token,
      'someToken'
    );
  });

  it('should break if it is guest', () => {
    mockLocalStorageService.load.and.callFake(() => {
      return true;
    });

    expect(service.setTotalScore('1')).toBe();
  });

  it('should load score from storage when setTotalScore hits', () => {
    mockLocalStorageService.load.and.callFake(() => {
      return false;
    });
    service.setTotalScore('1');

    expect(mockLocalStorageService.load).toHaveBeenCalled();
  });

  it('should save score into storage when initialTotalScore hits', () => {
    service.initialTotalScore('1');

    expect(mockLocalStorageService.save).toHaveBeenCalledWith(
      LocalStorageHelper.totalScore,
      '1'
    );
  });

  it('should log out when there is not token and getTokenInformation hits', () => {
    mockLocalStorageService.load.and.callFake(() => {
      return 'null';
    });
    spyOn(service, 'logoutOn401').and.returnValue();

    service.getTokenInformation();

    expect(service.logoutOn401).toHaveBeenCalled();
  });

  it('should load token when getTokenInformation hits', () => {
    mockLocalStorageService.load.and.callFake(() => {
      return '';
    });
    spyOn(service, 'logoutOn401').and.returnValue();

    service.getTokenInformation();

    expect(mockLocalStorageService.load).toHaveBeenCalled();
  });

  it('should call jwt_decode there is a valid token and getTokenInformation hits', () => {
    const token =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';
    mockLocalStorageService.load.and.callFake(() => {
      return token;
    });
    jasmine.createSpyObj('jwt_decode', ['jwt_decode']);

    expect(service.getTokenInformation()).toEqual({
      sub: '1234567890',
      name: 'John Doe',
      iat: 1516239022,
    } as SecurityTokenInterface);
  });
});
