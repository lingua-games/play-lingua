import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivateUserComponent } from './activate-user.component';
import { ActivatedRoute, convertToParamMap, Router } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatDialog } from '@angular/material/dialog';
import { of, throwError } from 'rxjs';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { UserModel } from '../../../core/models/user.model';
import {
  NotificationService,
  Severity,
} from '../../../core/service/notification.service';
import { UserService } from '../../../core/service/user.service';
import { ApiResult } from '../../../core/models/api-result.model';
import { SecurityService } from '../../../core/service/security.service';
import { LoginResultModel } from '../../../core/models/login-result.model';
import { LocalStorageService } from '../../../core/service/local-storage.service';
import { LocalStorageHelper } from '../../../core/models/local-storage.enum';

let mockActivatedRoute;
let mockNotificationService;
let mockRouter;
let mockUserService;
let mockSecurityService;
let mockLocalStorageService;
describe('ActivateUserComponent', () => {
  let component: ActivateUserComponent;
  let fixture: ComponentFixture<ActivateUserComponent>;

  beforeEach(async () => {
    mockActivatedRoute = {
      paramMap: of(convertToParamMap({})),
    };
    mockNotificationService = jasmine.createSpyObj(['showMessage']);
    mockSecurityService = jasmine.createSpyObj(['login', 'setToken']);
    mockLocalStorageService = jasmine.createSpyObj(['delete', 'clear']);
    mockRouter = {
      navigate: jasmine
        .createSpy('navigate')
        .and.returnValue(Promise.resolve()),
    };
    mockUserService = jasmine.createSpyObj(['activateUser']);

    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [ActivateUserComponent],
      providers: [
        {
          provide: LocalStorageService,
          useValue: mockLocalStorageService,
        },
        {
          provide: SecurityService,
          useValue: mockSecurityService,
        },
        {
          provide: ActivatedRoute,
          useValue: mockActivatedRoute,
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
          useValue: {},
        },
        {
          provide: UserService,
          useValue: mockUserService,
        },
      ],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivateUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('submit', () => {
    it('should return error if displayName is empty', () => {
      component.user = { displayName: null } as UserModel;

      component.submit();

      expect(mockNotificationService.showMessage).toHaveBeenCalledWith(
        'Display name is empty',
        Severity.error
      );
    });

    it('should return error if password is empty', () => {
      component.user = {
        password: null,
        displayName: 'fake display name',
      } as UserModel;

      component.submit();

      expect(mockNotificationService.showMessage).toHaveBeenCalledWith(
        'Password is empty',
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
        'Password not match',
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

    it('should call login API is activateUser API return success', () => {
      component.user = {
        password: '111111ass',
        rePassword: '111111ass',
        displayName: 'fake display name',
      } as UserModel;
      mockUserService.activateUser.and.callFake(() => {
        return of({
          success: true,
          data: { email: 'fake email' } as UserModel,
        } as ApiResult<UserModel>);
      });
      spyOn(component, 'login');

      component.submit();

      expect(component.login).toHaveBeenCalled();
    });

    it('should show error if activate API return not success result', () => {
      component.user = {
        password: '111111ass',
        rePassword: '111111ass',
        displayName: 'fake display name',
      } as UserModel;
      mockUserService.activateUser.and.callFake(() => {
        return of({
          success: false,
          errorMessage: 'foo error message',
          data: { email: 'fake email' } as UserModel,
        } as ApiResult<UserModel>);
      });
      spyOn(component, 'login');

      component.submit();

      expect(mockNotificationService.showMessage).toHaveBeenCalledWith(
        'foo error message',
        Severity.error
      );
    });

    it('should show error if activate API fail', () => {
      component.user = {
        password: '111111ass',
        rePassword: '111111ass',
        displayName: 'fake display name',
      } as UserModel;
      mockUserService.activateUser.and.callFake(() => {
        return throwError('I am error');
      });
      spyOn(component, 'login');

      component.submit();

      expect(mockNotificationService.showMessage).toHaveBeenCalledWith(
        'Server error',
        Severity.error
      );
    });
  });

  describe('login', () => {
    it('should set token after success login', () => {
      mockSecurityService.login.and.callFake(() => {
        return of({ isLogin: true, token: 'I am token' } as LoginResultModel);
      });

      component.login();

      expect(mockSecurityService.setToken).toHaveBeenCalledWith('I am token');
    });

    it('should remove isGuest flag after success login', () => {
      mockSecurityService.login.and.callFake(() => {
        return of({ isLogin: true, token: 'I am token' } as LoginResultModel);
      });

      component.login();

      expect(mockLocalStorageService.delete).toHaveBeenCalledWith(
        LocalStorageHelper.isGuest
      );
    });

    it('should navigate to choose-languages page after success login', () => {
      mockSecurityService.login.and.callFake(() => {
        return of({ isLogin: true, token: 'I am token' } as LoginResultModel);
      });
      jasmine.clock().uninstall();
      jasmine.clock().install();
      component.login();

      jasmine.clock().tick(1501);
      expect(mockRouter.navigate).toHaveBeenCalledWith(['choose-languages']);

      jasmine.clock().uninstall();
    });

    it('should show error message on not successful login', () => {
      mockSecurityService.login.and.callFake(() => {
        return of({
          isLogin: false,
          message: 'I am message',
        } as LoginResultModel);
      });

      component.login();

      expect(mockNotificationService.showMessage).toHaveBeenCalledWith(
        'I am message',
        Severity.error
      );
    });

    it('should show error on fail API call', () => {
      mockSecurityService.login.and.callFake(() => {
        return throwError('foo error');
      });

      component.login();

      expect(mockNotificationService.showMessage).toHaveBeenCalledWith(
        'Activation is successful but unable to login, please try login',
        Severity.error
      );
    });
  });
});
