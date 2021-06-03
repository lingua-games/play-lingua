import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../../core/service/user.service';
import { UserModel } from '../../../core/models/user.model';
import {
  NotificationService,
  Severity,
} from '../../../core/service/notification.service';
import { ApiResult } from '../../../core/models/api-result.model';
import { LoginResultModel } from '../../../core/models/login-result.model';
import { LocalStorageHelper } from '../../../core/models/local-storage.enum';
import { SecurityService } from '../../../core/service/security.service';
import { LocalStorageService } from '../../../core/service/local-storage.service';

@Component({
  selector: 'app-activate-user',
  templateUrl: './activate-user.component.html',
  styleUrls: ['./activate-user.component.scss'],
})
export class ActivateUserComponent implements OnInit {
  user: UserModel = {} as UserModel;
  isLoading = false;
  constructor(
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
    private notificationService: NotificationService,
    private router: Router,
    private securityService: SecurityService,
    private localStorageService: LocalStorageService
  ) {}

  ngOnInit(): void {
    this.localStorageService.clear();
    this.activatedRoute.paramMap.subscribe((paramMap) => {
      this.user.emailVerificationCode = paramMap.get('code') || '';
    });
  }

  submit(): void {
    if (!this.user.displayName) {
      this.notificationService.showMessage(
        'Display name is empty',
        Severity.error
      );
      return;
    }

    if (!this.user.password) {
      this.notificationService.showMessage('Password is empty', Severity.error);
      return;
    }

    if (this.user.password !== this.user.rePassword) {
      this.notificationService.showMessage(
        'Password not match',
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
    this.userService.activateUser(this.user).subscribe(
      (res: ApiResult<UserModel>) => {
        if (res.success) {
          this.user.email = res.data.email;
          this.login();
        } else {
          this.isLoading = false;
          this.notificationService.showMessage(
            res.errorMessage || 'Invalid code',
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

  login(): void {
    this.securityService.login(this.user).subscribe(
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
            res.message ||
              'Activation is successful but unable to login, please try login',
            Severity.error
          );
        }
      },
      () => {
        this.notificationService.showMessage(
          'Activation is successful but unable to login, please try login',
          Severity.error
        );
        this.isLoading = false;
      }
    );
  }
}
