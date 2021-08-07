import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForgotPasswordComponent } from './forgot-password.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import {
  NotificationService,
  Severity,
} from '../../../core/service/notification.service';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { Location } from '@angular/common';
import { UserModel } from '../../../core/models/user.model';
import { UserService } from '../../../core/service/user.service';
import { of, throwError } from 'rxjs';
import { RecaptchaComponent } from 'ng-recaptcha';

describe('ForgotPasswordComponent', () => {
  let component: ForgotPasswordComponent;
  let fixture: ComponentFixture<ForgotPasswordComponent>;
  let mockNotificationService;
  let mockLocation;
  let mockUserService;

  beforeEach(async () => {
    mockLocation = jasmine.createSpyObj(['back']);
    mockNotificationService = jasmine.createSpyObj(['showMessage']);
    mockUserService = jasmine.createSpyObj(['forgotPasswordRequest']);

    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [ForgotPasswordComponent],
      providers: [
        {
          provide: NotificationService,
          useValue: mockNotificationService,
        },
        { provide: Location, useValue: mockLocation },
        { provide: UserService, useValue: mockUserService },
      ],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ForgotPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('back', () => {
    it('should call location.back()', () => {
      component.back();

      expect(mockLocation.back).toHaveBeenCalled();
    });
  });

  describe('submit', () => {
    it('should show error if email is empty', () => {
      component.user = { email: '' } as UserModel;

      component.submit();

      expect(mockNotificationService.showMessage).toHaveBeenCalledWith(
        'Email is a required field',
        Severity.error
      );
    });

    it('should show error if email is not in correct format', () => {
      component.user = { email: 'fake email' } as UserModel;

      component.submit();

      expect(mockNotificationService.showMessage).toHaveBeenCalledWith(
        'Email is not in correct format',
        Severity.error
      );
    });

    it('should call startCountDown if service return success', () => {
      mockUserService.forgotPasswordRequest.and.returnValue(of(true));
      component.user = { email: 'email@email.com' } as UserModel;
      spyOn(component, 'startCountDown');

      component.submit();

      expect(component.startCountDown).toHaveBeenCalled();
    });

    it('should call notificationService.showMessage if service fail', () => {
      mockUserService.forgotPasswordRequest.and.returnValue(
        throwError('I am error')
      );
      component.user = { email: 'email@email.com' } as UserModel;
      component.captchaView = undefined;

      component.submit();

      expect(mockNotificationService.showMessage).toHaveBeenCalledWith(
        'Server error, please try again',
        Severity.error
      );
    });

    it('should reset captcha if service fail', () => {
      mockUserService.forgotPasswordRequest.and.returnValue(
        throwError('I am error')
      );
      component.user = { email: 'email@email.com' } as UserModel;
      component.captchaView = { reset: () => {} } as RecaptchaComponent;
      spyOn(component.captchaView, 'reset');

      component.submit();

      expect(component.captchaView.reset).toHaveBeenCalled();
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
    it('should call startCountDown', () => {
      spyOn(component, 'startCountDown');
      mockUserService.forgotPasswordRequest.and.returnValue(of(true));
      component.user = { email: 'email@email.com' } as UserModel;

      component.resendInvitationCode();

      expect(component.startCountDown).toHaveBeenCalled();
    });

    it('should call error notificationService.showMessage if service return false', () => {
      spyOn(component, 'startCountDown');
      mockUserService.forgotPasswordRequest.and.returnValue(of(false));
      component.user = { email: 'email@email.com' } as UserModel;

      component.resendInvitationCode();

      expect(mockNotificationService.showMessage).toHaveBeenCalledWith(
        'Server error, please try again',
        Severity.error
      );
    });

    it('should call error notificationService.showMessage if service fail', () => {
      spyOn(component, 'startCountDown');
      mockUserService.forgotPasswordRequest.and.returnValue(
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
      mockUserService.forgotPasswordRequest.and.returnValue(of(true));
      component.user = { email: 'email@email.com' } as UserModel;

      component.resendInvitationCode();

      expect(mockNotificationService.showMessage).toHaveBeenCalledWith(
        'Email sent',
        Severity.success
      );
    });
  });
});
