import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

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
import { LocalStorageService } from '../../../core/service/local-storage.service';
import {
  RegisterApiResultModel,
  RegisterStatus,
} from '../../../core/models/register-api-result.model';
import { RecaptchaComponent } from 'ng-recaptcha';

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
      mockUserService = jasmine.createSpyObj(['resendActivationCode', 'add']);
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
    mockSecurityService.isLoggedIn.and.callFake(() => {
      return { success: true };
    });

    fixture.detectChanges();

    expect(component).toBeTruthy();
  });

  it('should navigate to game menu if user is already logged in', () => {
    mockSecurityService.isLoggedIn.and.callFake(() => {
      return { success: true };
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

    it('should call startCountDown if API success and return status EmailSent', () => {
      component.user = {
        email: 'email@email.com',
        displayName: 'fakeDisplayName',
        password: 'fakePassword',
        rePassword: 'fakePassword',
      } as UserModel;
      mockUserService.add.and.callFake(() => {
        return of({
          status: RegisterStatus.EmailSent,
        } as RegisterApiResultModel);
      });
      spyOn(component, 'startCountDown');

      component.submit();

      expect(component.startCountDown).toHaveBeenCalled();
    });

    it('should navigate to reset-password if API success and return status NeedsChangePassword', () => {
      component.user = {
        email: 'email@email.com',
        displayName: 'fakeDisplayName',
        password: 'fakePassword',
        rePassword: 'fakePassword',
      } as UserModel;
      mockUserService.add.and.callFake(() => {
        return of({
          status: RegisterStatus.NeedsChangePassword,
        } as RegisterApiResultModel);
      });

      component.submit();

      expect(mockRouter.navigate).toHaveBeenCalledWith(['reset-password']);
    });

    it('should navigate to reset captcha if API success and return status AlreadyRegistered', () => {
      component.user = {
        email: 'email@email.com',
        displayName: 'fakeDisplayName',
        password: 'fakePassword',
        rePassword: 'fakePassword',
      } as UserModel;
      mockUserService.add.and.callFake(() => {
        return of({
          status: RegisterStatus.AlreadyRegistered,
        } as RegisterApiResultModel);
      });
      component.captchaView = { reset: () => {} } as RecaptchaComponent;
      spyOn(component.captchaView, 'reset');

      component.submit();

      expect(component.captchaView.reset).toHaveBeenCalled();
    });

    it('should reset captcha if API fails', () => {
      component.user = {
        email: 'email@email.com',
        displayName: 'fakeDisplayName',
        password: 'fakePassword',
        rePassword: 'fakePassword',
      } as UserModel;
      mockUserService.add.and.callFake(() => {
        return throwError('');
      });
      component.captchaView = { reset: () => {} } as RecaptchaComponent;
      spyOn(component.captchaView, 'reset');

      component.submit();

      expect(component.captchaView.reset).toHaveBeenCalled();
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
        'Server error, please try again',
        Severity.error
      );
    });
  });

  describe('startCountDown', () => {
    it('should decrease countdown value by one after one second', () => {
      jasmine.clock().uninstall();
      jasmine.clock().install();

      component.startCountDown();
      jasmine.clock().tick(1000);

      expect(component.countdown).toBe(59);
      jasmine.clock().uninstall();
    });

    it('should stop countdown after 60 seconds', () => {
      jasmine.clock().uninstall();
      jasmine.clock().install();
      spyOn(window, 'clearInterval');

      component.startCountDown();
      jasmine.clock().tick(61000);

      expect(clearInterval).toHaveBeenCalledWith(1);
      jasmine.clock().uninstall();
    });
  });

  describe('resendInvitationCode', () => {
    xit('should call startCountDown', () => {
      spyOn(component, 'startCountDown');
      console.log(mockUserService);
      mockUserService.resendActivationCode.and.returnValue(of(true));
      component.user = { email: 'email@email.com' } as UserModel;

      component.resendInvitationCode();

      expect(component.startCountDown).toHaveBeenCalled();
    });

    it('should call error notificationService.showMessage if service return false', () => {
      spyOn(component, 'startCountDown');
      mockUserService.resendActivationCode.and.returnValue(of(false));
      component.user = { email: 'email@email.com' } as UserModel;

      component.resendInvitationCode();

      expect(mockNotificationService.showMessage).toHaveBeenCalledWith(
        'Server error, please try again',
        Severity.error
      );
    });

    it('should call error notificationService.showMessage if service fail', () => {
      spyOn(component, 'startCountDown');
      mockUserService.resendActivationCode.and.returnValue(
        throwError('I am error')
      );
      component.user = { email: 'email@email.com' } as UserModel;

      component.resendInvitationCode();

      expect(mockNotificationService.showMessage).toHaveBeenCalledWith(
        'Server error, please try again',
        Severity.error
      );
    });

    it('should call success notificationService.showMessage if service return true', () => {
      spyOn(component, 'startCountDown');
      mockUserService.resendActivationCode.and.returnValue(of(true));
      component.user = { email: 'email@email.com' } as UserModel;

      component.resendInvitationCode();

      expect(mockNotificationService.showMessage).toHaveBeenCalledWith(
        'Email sent',
        Severity.success
      );
    });
  });
});
