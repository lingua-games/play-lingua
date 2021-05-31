import { Component, OnInit } from '@angular/core';
import { UserModel } from '../../../core/models/user.model';
import {
  NotificationService,
  Severity,
} from '../../../core/service/notification.service';
import { UserService } from '../../../core/service/user.service';
import { LocalStorageHelper } from '../../../core/models/local-storage.enum';
import { SecurityService } from '../../../core/service/security.service';
import { LocalStorageService } from '../../../core/service/local-storage.service';
import { Router } from '@angular/router';
import { LoginResultModel } from '../../../core/models/login-result.model';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
})
export class ResetPasswordComponent implements OnInit {
  user: UserModel = {} as UserModel;
  isLoading = false;
  constructor(
    private notificationService: NotificationService,
    private userService: UserService,
    private securityService: SecurityService,
    private localStorageService: LocalStorageService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  submit(): void {
    if (!this.user.password) {
      this.notificationService.showMessage(
        'Password is empty ',
        Severity.error
      );
      return;
    }

    if (this.user.password !== this.user.rePassword) {
      this.notificationService.showMessage(
        'Password not match ',
        Severity.error
      );
      return;
    }

    if (this.user.password.length < 6) {
      this.notificationService.showMessage(
        'Password should be more than 6 characters',
        Severity.error
      );
      return;
    }

    const hasNumber = /\d/;
    const containsAlphabet = /[a-zA-Z]/;
    if (
      !hasNumber.test(this.user.password) ||
      !containsAlphabet.test(this.user.password)
    ) {
      this.notificationService.showMessage(
        'Password should contain at least one number and one alphabet',
        Severity.error
      );
      return;
    }

    this.isLoading = true;
    this.userService.resetPassword(this.user).subscribe(
      (res: LoginResultModel) => {
        if (res.isLogin) {
          this.securityService.setToken(res.token);
          this.localStorageService.delete(LocalStorageHelper.isGuest);
          setTimeout(() => {
            this.router.navigate(['game-menu']).then();
          }, 1500);
        } else {
          this.isLoading = false;
          this.notificationService.showMessage(
            res.message || 'Invalid code',
            Severity.error
          );
        }
      },
      () => {
        this.notificationService.showMessage('Server error', Severity.error);
        this.isLoading = false;
      }
    );
  }
}
