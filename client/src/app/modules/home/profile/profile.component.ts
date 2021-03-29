import { Component, OnInit } from '@angular/core';
import {
  NotificationService,
  Severity,
} from '../../../core/service/notification.service';
import { UserService } from '../../../core/service/user.service';
import { SecurityService } from '../../../core/service/security.service';
import { EditUserModel } from '../../../core/models/edit-user.model';
import { animate, style, transition, trigger } from '@angular/animations';
import { LoginResultModel } from '../../../core/models/login-result.model';
import { ProfileFormErrors } from '../../../core/models/form-errors.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  animations: [
    trigger('fadePasswords', [
      transition(':enter', [
        style({ height: '0vh' }),
        animate('400ms', style({ height: '25vh' })),
      ]),
      transition(':leave', [
        style({ height: '25vh' }),
        animate('400ms', style({ height: '0vh' })),
      ]),
    ]),
  ],
})
export class ProfileComponent implements OnInit {
  public user: EditUserModel = new EditUserModel();
  public errors: ProfileFormErrors = {} as ProfileFormErrors;
  public isLoading?: boolean;
  constructor(
    private userService: UserService,
    private notificationService: NotificationService,
    private securityService: SecurityService
  ) {}

  ngOnInit(): void {
    this.user.displayName = this.securityService?.getTokenInformation()?.displayName;
  }

  submit(): void {
    this.errors = {} as ProfileFormErrors;

    if (!this.user.displayName || this.user.displayName === '') {
      this.errors.displayName = 'Display name is a required field';
      return;
    }

    if (this.user.isChangingPassword) {
      if (!this.user.currentPassword) {
        this.errors.currentPassword = 'Current password is empty';
        return;
      }

      if (!this.user.newPassword) {
        this.errors.newPassword = 'New password is empty';
        return;
      }

      if (this.user.reNewPassword !== this.user.newPassword) {
        this.errors.newPassword =
          'New password and Re-new password are not match';
        return;
      }
    }

    this.isLoading = true;
    this.userService.editUser(this.user).subscribe(
      (user: LoginResultModel) => {
        this.notificationService.showMessage('Profile saved', Severity.success);
        this.securityService.setToken(user.token);

        this.user.newPassword = '';
        this.user.reNewPassword = '';
        this.user.currentPassword = '';
        this.user.isChangingPassword = false;
      },
      (error: string) => {
        this.notificationService.showMessage(error, Severity.error);
        this.isLoading = false;
      },
      () => {
        this.isLoading = false;
      }
    );
  }
}
