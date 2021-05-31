import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResetPasswordComponent } from './reset-password.component';
import {
  NotificationService,
  Severity,
} from '../../../core/service/notification.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { UserModel } from '../../../core/models/user.model';
import { of, throwError } from 'rxjs';
import { UserService } from '../../../core/service/user.service';
import { LoginResultModel } from '../../../core/models/login-result.model';
import { SecurityService } from '../../../core/service/security.service';

let mockNotificationService;
let mockRouter;
let mockUserService;
let mockSecurityService;
describe('ResetPasswordComponent', () => {
  let component: ResetPasswordComponent;
  let fixture: ComponentFixture<ResetPasswordComponent>;

  mockSecurityService = jasmine.createSpyObj(['login', 'setToken']);
  mockUserService = jasmine.createSpyObj(['resetPassword']);
  mockNotificationService = jasmine.createSpyObj(['showMessage']);
  mockRouter = {
    navigate: jasmine.createSpy('navigate').and.returnValue(Promise.resolve()),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [ResetPasswordComponent],
      providers: [
        {
          provide: NotificationService,
          useValue: mockNotificationService,
        },
        {
          provide: Router,
          useValue: mockRouter,
        },
        {
          provide: MatDialog,
          useValue: {},
        },
        {
          provide: UserService,
          useValue: mockUserService,
        },
        {
          provide: SecurityService,
          useValue: mockSecurityService,
        },
      ],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResetPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('submit', () => {
    it('should return error if password is empty', () => {
      component.user = {
        password: null,
        displayName: 'fake display name',
      } as UserModel;

      component.submit();

      expect(mockNotificationService.showMessage).toHaveBeenCalledWith(
        'Password is empty ',
        Severity.error
      );
    });

    it('should return error if passwords are not match', () => {
      component.user = {
        password: '1',
        rePassword: '2',
        displayName: 'fake display name',
      } as UserModel;

      component.submit();

      expect(mockNotificationService.showMessage).toHaveBeenCalledWith(
        'Password not match ',
        Severity.error
      );
    });

    it('should return error if password length is less than 6', () => {
      component.user = {
        password: '1',
        rePassword: '1',
        displayName: 'fake display name',
      } as UserModel;

      component.submit();

      expect(mockNotificationService.showMessage).toHaveBeenCalledWith(
        'Password should be more than 6 characters',
        Severity.error
      );
    });

    it('should return error if password does not have policy', () => {
      component.user = {
        password: '111111',
        rePassword: '111111',
        displayName: 'fake display name',
      } as UserModel;

      component.submit();

      expect(mockNotificationService.showMessage).toHaveBeenCalledWith(
        'Password should contain at least one number and one alphabet',
        Severity.error
      );
    });

    it('should show error if activate API return not success result', () => {
      component.user = {
        password: '111111ass',
        rePassword: '111111ass',
        displayName: 'fake display name',
      } as UserModel;
      mockUserService.resetPassword.and.callFake(() => {
        return of({
          success: false,
          message: 'foo error message',
          data: { email: 'fake email' } as UserModel,
        } as LoginResultModel);
      });

      component.submit();

      expect(mockNotificationService.showMessage).toHaveBeenCalledWith(
        'foo error message',
        Severity.error
      );
    });

    it('should navigate to game menu if API return success with token', () => {
      component.user = {
        password: '111111ass',
        rePassword: '111111ass',
        displayName: 'fake display name',
      } as UserModel;
      mockUserService.resetPassword.and.callFake(() => {
        return of({
          success: false,
          token: 'I am token',
          isLogin: true,
          data: { email: 'fake email' } as UserModel,
        } as LoginResultModel);
      });
      jasmine.clock().uninstall();
      jasmine.clock().install();

      component.submit();
      jasmine.clock().tick(1501);

      expect(mockRouter.navigate).toHaveBeenCalledWith(['game-menu']);
      jasmine.clock().uninstall();
    });

    it('should set token if API return successful', () => {
      component.user = {
        password: '111111ass',
        rePassword: '111111ass',
        displayName: 'fake display name',
      } as UserModel;
      mockUserService.resetPassword.and.callFake(() => {
        return of({
          success: false,
          token: 'I am token',
          isLogin: true,
          data: { email: 'fake email' } as UserModel,
        } as LoginResultModel);
      });

      component.submit();

      expect(mockSecurityService.setToken).toHaveBeenCalledWith('I am token');
    });

    it('should show error if activate API fail', () => {
      component.user = {
        password: '111111ass',
        rePassword: '111111ass',
        displayName: 'fake display name',
      } as UserModel;
      mockUserService.resetPassword.and.callFake(() => {
        return throwError('I am error');
      });

      component.submit();

      expect(mockNotificationService.showMessage).toHaveBeenCalledWith(
        'Server error',
        Severity.error
      );
    });
  });
});
