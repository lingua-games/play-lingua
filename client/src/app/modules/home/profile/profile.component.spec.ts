import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { ProfileComponent } from './profile.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import {
  NotificationService,
  Severity,
} from '../../../core/service/notification.service';
import { RouterTestingModule } from '@angular/router/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SecurityService } from '../../../core/service/security.service';
import { SecurityTokenInterface } from '../../../core/models/security-token.interface';
import { EditUserModel } from '../../../core/models/edit-user.model';
import { UserService } from '../../../core/service/user.service';
import { of, throwError } from 'rxjs';
import { LoginResultModel } from '../../../core/models/login-result.model';

describe('ProfileComponent', () => {
  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;
  let mockNotificationService;
  let mockSecurityService;
  let mockUserService;
  beforeEach(
    waitForAsync(() => {
      mockNotificationService = jasmine.createSpyObj(['showMessage']);
      mockUserService = jasmine.createSpyObj(['editUser']);
      mockSecurityService = jasmine.createSpyObj({
        getTokenInformation: {} as SecurityTokenInterface,
        setToken: () => {},
      });

      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule, RouterTestingModule],
        declarations: [ProfileComponent],
        providers: [
          {
            provide: UserService,
            useValue: mockUserService,
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
            provide: SecurityService,
            useValue: mockSecurityService,
          },
        ],
        schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('submit', () => {
    it('should set displayName error if field is empty', () => {
      component.submit();

      expect(component.errors['displayName']).toBe(
        'Display name is a required field'
      );
    });

    it('should set currentPassword error if field is empty', () => {
      component.user = {
        isChangingPassword: true,
        displayName: 'fakeDisplayName',
      } as EditUserModel;

      component.submit();

      expect(component.errors['currentPassword']).toBe(
        'Current password is empty'
      );
    });

    it('should set newPassword error if field is empty', () => {
      component.user = {
        isChangingPassword: true,
        displayName: 'fakeDisplayName',
        currentPassword: 'fakeCurrentPassword',
      } as EditUserModel;

      component.submit();

      expect(component.errors['newPassword']).toBe('New password is empty');
    });

    it('should set newPassword error if newPassword and re-newPassword are different', () => {
      component.user = {
        isChangingPassword: true,
        displayName: 'fakeDisplayName',
        currentPassword: 'fakeCurrentPassword',
        newPassword: 'fake new password',
        reNewPassword: 'fake re new password',
      } as EditUserModel;

      component.submit();

      expect(component.errors['newPassword']).toBe(
        'New password and Re-new password are not match'
      );
    });

    it('should set new token after API success', () => {
      component.user = {
        isChangingPassword: true,
        displayName: 'fakeDisplayName',
        currentPassword: 'fakeCurrentPassword',
        newPassword: 'fake new password',
        reNewPassword: 'fake new password',
      } as EditUserModel;
      mockUserService.editUser.and.callFake(() => {
        return of({ token: 'fakeToken' } as LoginResultModel);
      });

      component.submit();

      expect(mockSecurityService.setToken).toHaveBeenCalledWith('fakeToken');
    });

    it('should show success message after API success', () => {
      component.user = {
        isChangingPassword: true,
        displayName: 'fakeDisplayName',
        currentPassword: 'fakeCurrentPassword',
        newPassword: 'fake new password',
        reNewPassword: 'fake new password',
      } as EditUserModel;
      mockUserService.editUser.and.callFake(() => {
        return of({ token: 'fakeToken' } as LoginResultModel);
      });

      component.submit();

      expect(mockNotificationService.showMessage).toHaveBeenCalledWith(
        'Profile saved',
        Severity.success
      );
    });

    it('should show Error message after API fail', () => {
      component.user = {
        isChangingPassword: true,
        displayName: 'fakeDisplayName',
        currentPassword: 'fakeCurrentPassword',
        newPassword: 'fake new password',
        reNewPassword: 'fake new password',
      } as EditUserModel;
      mockUserService.editUser.and.callFake(() => {
        return throwError('fake error');
      });

      component.submit();

      expect(mockNotificationService.showMessage).toHaveBeenCalledWith(
        'fake error',
        Severity.error
      );
    });
  });
});
