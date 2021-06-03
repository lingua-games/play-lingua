import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UserModel } from '../../../core/models/user.model';
import { Location } from '@angular/common';
import { SecurityService } from '../../../core/service/security.service';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { LoginResultModel } from '../../../core/models/login-result.model';
import { LocalStorageHelper } from '../../../core/models/local-storage.enum';
import { LocalStorageService } from '../../../core/service/local-storage.service';
import { LanguageModel } from '../../../core/models/language.model';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let mockLocation;
  let mockSecurityService;
  let mockRouter;
  let mockLocalStorageService;
  beforeEach(
    waitForAsync(() => {
      mockRouter = {
        url: 'choose-languages',
        navigate: jasmine
          .createSpy('navigate')
          .and.returnValue(Promise.resolve()),
      };
      mockLocation = jasmine.createSpyObj(['back']);
      mockLocalStorageService = jasmine.createSpyObj(['save', 'delete']);
      mockSecurityService = jasmine.createSpyObj([
        'isLoggedIn',
        'login',
        'setToken',
        'storeCredentialsAfterLogin',
      ]);
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule, RouterTestingModule],
        declarations: [LoginComponent],
        providers: [
          {
            provide: MatDialog,
            useValue: { closeAll: () => {} },
          },
          {
            provide: Router,
            useValue: mockRouter,
          },
          {
            provide: SecurityService,
            useValue: mockSecurityService,
          },
          {
            provide: Location,
            useValue: mockLocation,
          },
          {
            provide: LocalStorageService,
            useValue: mockLocalStorageService,
          },
        ],
        schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should navigate to game menu if user is already logged in ', () => {
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

  describe('login', () => {
    it('should set email error if field is empty', () => {
      component.user = {} as UserModel;

      component.login();

      expect(component.formError['email']).toBe('Email field is empty');
    });

    it('should set password error if field is empty', () => {
      component.user = { email: 'fake email' } as UserModel;

      component.login();

      expect(component.formError['password']).toBe('Password field is empty');
    });

    it('should call storeCredentialsAfterLogin API success', () => {
      component.user = {
        email: 'fake email',
        password: 'fake password',
        totalScore: 1,
        defaultBaseLanguageId: 1,
        defaultTargetLanguageId: 1,
      } as UserModel;
      const res = {
        token: 'fake token',
        isLogin: true,
        user: {
          totalScore: 1,
          defaultBaseLanguage: {} as LanguageModel,
          defaultTargetLanguage: {} as LanguageModel,
        },
      } as LoginResultModel;
      mockSecurityService.login.and.callFake(() => {
        return of(res);
      });

      component.login();

      expect(
        mockSecurityService.storeCredentialsAfterLogin
      ).toHaveBeenCalledWith(res);
    });

    it('should set error if API return isLogin falsy', () => {
      component.user = {
        email: 'fake email',
        password: 'fake password',
        totalScore: 1,
        defaultBaseLanguageId: 1,
        defaultTargetLanguageId: 1,
      } as UserModel;
      mockSecurityService.login.and.callFake(() => {
        return of({
          isLogin: false,
          message: 'error message',
        } as LoginResultModel);
      });

      component.login();

      expect(component.errorMessage).toBe('error message');
    });

    it('should stop loading if API fail', () => {
      component.user = {
        email: 'fake email',
        password: 'fake password',
        totalScore: 1,
        defaultBaseLanguageId: 1,
        defaultTargetLanguageId: 1,
      } as UserModel;
      mockSecurityService.login.and.callFake(() => {
        return throwError('some errors');
      });

      component.login();

      expect(component.isLoading).toBeFalse();
    });
  });
});
