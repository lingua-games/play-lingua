import { Component, OnInit } from '@angular/core';
import { UserModel } from '../../../core/models/user.model';
import { UserService } from '../../../core/service/user.service';
import {
  NotificationService,
  Severity,
} from '../../../core/service/notification.service';
import { Router } from '@angular/router';
import { SecurityService } from '../../../core/service/security.service';
import { LoginResultModel } from '../../../core/models/login-result.model';
import { LocalStorageHelper } from '../../../core/models/local-storage.enum';
import { Location } from '@angular/common';
import { LocalStorageService } from '../../../core/service/local-storage.service';
import { RegisterFormErrors } from '../../../core/models/form-errors.model';

@Component({
  selector: 'app-register',
  templateUrl: './complete-registration.html',
  styleUrls: ['./complete-registration.scss'],
})
export class CompleteRegistrationComponent implements OnInit {
  public user: UserModel = {} as UserModel;
  public errors: RegisterFormErrors = {} as RegisterFormErrors;
  public isLoading?: boolean;

  constructor(
    private userService: UserService,
    private notificationService: NotificationService,
    private router: Router,
    private securityService: SecurityService,
    private location: Location,
    private localStorageService: LocalStorageService
  ) {}

  ngOnInit(): void {
    if (this.securityService.isLoggedIn().success) {
      this.router.navigate(['game-menu']).then();
    }
  }

  back(): void {
    this.location.back();
  }

  submit(): void {
    this.errors = {} as RegisterFormErrors;

    if (!this.user.email) {
      this.errors.email = 'Email is a required field';
      return;
    }

    if (!this.user.displayName || this.user.displayName === '') {
      this.errors.displayName = 'Display name is a required field';
      return;
    }

    if (!/\S+@\S+\.\S+/.test(this.user.email)) {
      this.errors.email = 'Email is not in correct format';
      return;
    }

    if (!this.user.password) {
      this.errors.password = 'Password is a required field';
      return;
    }

    if (this.user.password !== this.user.rePassword) {
      this.errors.password = 'Password and Re-Password should be the same';
      return;
    }
    this.isLoading = true;
    this.userService.add(this.user).subscribe(
      () => {
        this.login();
      },
      (error: string) => {
        this.notificationService.showMessage(error, Severity.error);
        this.isLoading = false;
      }
    );
  }

  login(): void {
    this.securityService.login(this.user).subscribe(
      (res: LoginResultModel) => {
        this.notificationService.showMessage(
          'You registered successfully',
          Severity.success,
          'Success'
        );
        this.securityService.setToken(res.token);
        this.localStorageService.delete(LocalStorageHelper.isGuest);
        this.localStorageService.save(
          LocalStorageHelper.email,
          res?.user?.email
        );
        if (
          res?.user?.defaultBaseLanguageId &&
          res?.user?.defaultTargetLanguageId
        ) {
          this.localStorageService.save(
            LocalStorageHelper.defaultLanguages,
            `{defaultBaseLanguage: ${res?.user?.defaultBaseLanguageId}, defaultBaseLanguage: ${res?.user?.defaultTargetLanguageId} }`
          );
        }
        this.router.navigate(['../game-menu']).then();
      },
      () => {
        this.notificationService.showMessage(
          'Failed to log in after register',
          Severity.error,
          'Error'
        );
      }
    );
  }
}
