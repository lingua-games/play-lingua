import { TestBed } from '@angular/core/testing';
import { SecurityService } from './security.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LocalStorageService } from './local-storage.service';
import { LocalStorageHelper } from '../models/local-storage.enum';
import { SecurityTokenInterface } from '../models/security-token.interface';
import { UserModel } from '../models/user.model';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { compose } from '@ngrx/store';

describe('SecurityService', () => {
  let service: SecurityService;
  let mockRouter;
  let httpClientSpy: {
    post: jasmine.Spy;
  };
  let mockLocalStorageService;
  let mockDialog;
  beforeEach(() => {
    mockLocalStorageService = jasmine.createSpyObj([
      'save',
      'load',
      'clear',
      'delete',
    ]);
    mockRouter = jasmine.createSpyObj('router', ['navigate']);
    mockDialog = jasmine.createSpyObj('dialogRef', ['closeAll']);
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [
        {
          provide: MatDialog,
          useValue: mockDialog,
        },
        {
          provide: LocalStorageService,
          useValue: mockLocalStorageService,
        },
        {
          provide: Router,
          useValue: mockRouter,
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
        // tslint:disable-next-line:no-any
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
    spyOn(service, 'isLoggedIn').and.returnValue(true);

    service.initialTotalScore('1');

    expect(mockLocalStorageService.save).toHaveBeenCalledWith(
      LocalStorageHelper.totalScore,
      '1'
    );
  });

  it('should return observable when calling getTotalScore', () => {
    service.storageSub = new Subject<string>();
    spyOn(service.storageSub, 'asObservable');

    service.getTotalScore();

    expect(service.storageSub.asObservable).toHaveBeenCalled();
  });

  it('should break if new score is zero and setTotalScore calls', () => {
    mockLocalStorageService.load.and.callFake(() => {
      return false;
    });
    spyOn(service, 'isLoggedIn').and.returnValue(true);

    service.setTotalScore('0');

    expect(mockLocalStorageService.load).toHaveBeenCalledWith(
      LocalStorageHelper.totalScore
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

  it('should call authUrl when login hits', () => {
    service.login({} as UserModel);
    expect(httpClientSpy.post).toHaveBeenCalled();
  });

  it('should clear localStorage on logout', () => {
    service.logout();
    expect(mockLocalStorageService.clear).toHaveBeenCalled();
  });

  it('should delete localStorages on logoutOn401', () => {
    service.logoutOn401();
    expect(mockLocalStorageService.delete).toHaveBeenCalled();
  });

  it('should check isLoggedIn with token', () => {
    service.isLoggedIn();
    expect(mockLocalStorageService.load).toHaveBeenCalledWith(
      LocalStorageHelper.token
    );
  });

  it('should check isGuest with isGuest flag', () => {
    service.isGuest();
    expect(mockLocalStorageService.load).toHaveBeenCalledWith(
      LocalStorageHelper.isGuest
    );
  });
});
