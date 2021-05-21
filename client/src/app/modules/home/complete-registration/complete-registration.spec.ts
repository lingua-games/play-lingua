import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import {
  NotificationService,
  Severity,
} from '../../../core/service/notification.service';
import { RouterTestingModule } from '@angular/router/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SecurityService } from '../../../core/service/security.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { UserModel } from '../../../core/models/user.model';
import { UserService } from '../../../core/service/user.service';
import { of, throwError } from 'rxjs';
import { LoginResultModel } from '../../../core/models/login-result.model';
import { LocalStorageHelper } from '../../../core/models/local-storage.enum';
import { LocalStorageService } from '../../../core/service/local-storage.service';
import { CompleteRegistrationComponent } from './complete-registration';

describe('RegisterComponent', () => {
  let component: CompleteRegistrationComponent;
  let fixture: ComponentFixture<CompleteRegistrationComponent>;
  let mockNotificationService;
  let mockSecurityService;
  let mockRouter;
  let mockLocation;
  let mockUserService;
  let mockLocalStorageService;
  beforeEach(
    waitForAsync(() => {
      mockNotificationService = jasmine.createSpyObj(['showMessage']);
      mockSecurityService = jasmine.createSpyObj([
        'isLoggedIn',
        'login',
        'setToken',
      ]);
      mockLocation = jasmine.createSpyObj(['back']);
      mockLocalStorageService = jasmine.createSpyObj(['save', 'delete']);
      mockRouter = {
        url: 'choose-languages',
        navigate: jasmine
          .createSpy('navigate')
          .and.returnValue(Promise.resolve()),
      };
      mockUserService = jasmine.createSpyObj(['add']);
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule, RouterTestingModule],
        declarations: [CompleteRegistrationComponent],
        providers: [
          {
            provide: LocalStorageService,
            useValue: mockLocalStorageService,
          },
          {
            provide: UserService,
            useValue: mockUserService,
          },
          {
            provide: Location,
            useValue: mockLocation,
          },
          {
            provide: SecurityService,
            useValue: mockSecurityService,
          },
          {
            provide: Router,
            useValue: mockRouter,
          },
          {
            provide: NotificationService,
            useValue: mockNotificationService,
          },
          {
            provide: MatDialog,
            useValue: {
              closeAll: () => {},
            },
          },
        ],
        schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(CompleteRegistrationComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should navigate to game menu if user is already logged in', () => {
    mockSecurityService.isLoggedIn.and.callFake(() => {
      return true;
    });

    fixture.detectChanges();

    expect(mockRouter.navigate).toHaveBeenCalled();
  });

  it('should navigate back when clicking on back button', () => {
    component.back();
    expect(mockLocation.back).toHaveBeenCalled();
  });

  describe('submit', () => {
    it('should set email error if field is empty', () => {
      component.user = {} as UserModel;

      component.submit();

      expect(component.errors['email']).toBe('Email is a required field');
    });

    it('should set displayName error if field is empty', () => {
      component.user = { email: 'fakeEmail' } as UserModel;

      component.submit();

      expect(component.errors['displayName']).toBe(
        'Display name is a required field'
      );
    });

    it('should set email error if email is not in correct format', () => {
      component.user = {
        email: 'fakeEmail',
        displayName: 'fakeDisplayName',
      } as UserModel;

      component.submit();

      expect(component.errors['email']).toBe('Email is not in correct format');
    });

    it('should set password error if field is empty', () => {
      component.user = {
        email: 'email@email.com',
        displayName: 'fakeDisplayName',
      } as UserModel;

      component.submit();

      expect(component.errors['password']).toBe('Password is a required field');
    });

    it('should set password error password and re-password are not match', () => {
      component.user = {
        email: 'email@email.com',
        displayName: 'fakeDisplayName',
        password: 'fakePassword',
        rePassword: 'fakePassword 1',
      } as UserModel;
      mockUserService.add.and.callFake(() => {
        return of({});
      });

      component.submit();

      expect(component.errors['password']).toBe(
        'Password and Re-Password should be the same'
      );
    });

    it('should call login once the API success', () => {
      component.user = {
        email: 'email@email.com',
        displayName: 'fakeDisplayName',
        password: 'fakePassword',
        rePassword: 'fakePassword',
      } as UserModel;
      mockUserService.add.and.callFake(() => {
        return of(component.user);
      });
      spyOn(component, 'login');

      component.submit();

      expect(component.login).toHaveBeenCalled();
    });

    it('should show error if API fails', () => {
      component.user = {
        email: 'email@email.com',
        displayName: 'fakeDisplayName',
        password: 'fakePassword',
        rePassword: 'fakePassword',
      } as UserModel;
      mockUserService.add.and.callFake(() => {
        return throwError('some errors');
      });

      component.submit();

      expect(mockNotificationService.showMessage).toHaveBeenCalledWith(
        'some errors',
        Severity.error
      );
    });
  });

  describe('login', () => {
    it('should show success message once login API return successfully', () => {
      mockSecurityService.login.and.callFake(() => {
        return of({
          token: 'fake token',
          user: { email: 'fake email' },
        } as LoginResultModel);
      });

      component.login();

      expect(mockNotificationService.showMessage).toHaveBeenCalledWith(
        'You registered successfully',
        Severity.success,
        'Success'
      );
    });

    it('should set token on storage after successful API', () => {
      mockSecurityService.login.and.callFake(() => {
        return of({
          token: 'fake token',
          user: { email: 'fake email' },
        } as LoginResultModel);
      });

      component.login();

      expect(mockSecurityService.setToken).toHaveBeenCalledWith('fake token');
    });

    it('should save default languages into localStorage', () => {
      mockSecurityService.login.and.callFake(() => {
        return of({
          token: 'fake token',
          user: {
            email: 'fake email',
            defaultTargetLanguageId: 1,
            defaultBaseLanguageId: 1,
          },
        } as LoginResultModel);
      });

      component.login();

      expect(mockLocalStorageService.save).toHaveBeenCalledWith(
        LocalStorageHelper.defaultLanguages,
        `{defaultBaseLanguage: 1, defaultBaseLanguage: 1 }`
      );
    });

    it('should show error if API fail', () => {
      mockSecurityService.login.and.callFake(() => {
        return throwError('some errors');
      });

      component.login();

      expect(mockNotificationService.showMessage).toHaveBeenCalledWith(
        'Failed to log in after register',
        Severity.error,
        'Error'
      );
    });
  });
});
