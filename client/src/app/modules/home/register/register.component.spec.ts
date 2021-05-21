import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterComponent } from './register.component';
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

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
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
        declarations: [RegisterComponent],
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
    fixture = TestBed.createComponent(RegisterComponent);
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

      expect(mockNotificationService.showMessage).toHaveBeenCalledWith(
        'Email is a required field',
        Severity.error
      );
    });

    it('should set email error if email is not in correct format', () => {
      component.user = {
        email: 'fakeEmail',
        displayName: 'fakeDisplayName',
      } as UserModel;

      component.submit();

      expect(mockNotificationService.showMessage).toHaveBeenCalledWith(
        'Email is not in correct format',
        Severity.error
      );
    });

    it('should show error if API fails', () => {
      component.user = {
        email: 'email@email.com',
        displayName: 'fakeDisplayName',
        password: 'fakePassword',
        rePassword: 'fakePassword',
      } as UserModel;
      mockUserService.add.and.callFake(() => {
        return throwError('');
      });

      component.submit();

      expect(mockNotificationService.showMessage).toHaveBeenCalledWith(
        'Server error',
        Severity.error
      );
    });
  });
});
