import { Component, OnInit, ViewChild } from '@angular/core';
import { UserModel } from '../../../core/models/user.model';
import { UserService } from '../../../core/service/user.service';
import {
  NotificationService,
  Severity,
} from '../../../core/service/notification.service';
import { Router } from '@angular/router';
import { SecurityService } from '../../../core/service/security.service';
import { Location } from '@angular/common';
import {
  RegisterApiResultModel,
  RegisterStatus,
} from '../../../core/models/register-api-result.model';
import { ApiResult } from '../../../core/models/api-result.model';
import { RecaptchaComponent } from 'ng-recaptcha';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  @ViewChild('captchaView') captchaView?: RecaptchaComponent;

  public user: UserModel = {} as UserModel;
  public hasEmailError = false;
  public registerResult: ApiResult<RegisterApiResultModel> = new ApiResult<RegisterApiResultModel>();

  constructor(
    private userService: UserService,
    private notificationService: NotificationService,
    private router: Router,
    private securityService: SecurityService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.registerResult.setLoading(false);
    this.registerResult.data = new RegisterApiResultModel();
    if (this.securityService.isLoggedIn()) {
      this.router.navigate(['game-menu']).then();
    }
  }

  back(): void {
    this.location.back();
  }

  submit(): void {
    this.hasEmailError = false;
    if (!this.user.email) {
      this.notificationService.showMessage(
        'Email is a required field',
        Severity.error
      );
      this.hasEmailError = true;
      return;
    }

    if (!/\S+@\S+\.\S+/.test(this.user.email)) {
      this.notificationService.showMessage(
        'Email is not in correct format',
        Severity.error
      );
      this.hasEmailError = true;
      return;
    }

    this.registerResult.setLoading(true);
    this.userService.add(this.user).subscribe(
      (res: RegisterApiResultModel) => {
        this.registerResult.setData(res);
        if (res.status === RegisterStatus.AlreadyRegistered) {
          if (this.captchaView) {
            this.captchaView.reset();
          }
        }
      },
      (error: string) => {
        if (this.captchaView) {
          this.captchaView.reset();
        }
        this.notificationService.showMessage('Server error', Severity.error);
        this.registerResult.setError(error);
      }
    );
  }

  showForgotPassword(): void {}
}
