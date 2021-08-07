import { Component, OnInit, ViewChild } from '@angular/core';
import { RecaptchaComponent } from 'ng-recaptcha';
import { UserModel } from '../../../core/models/user.model';
import { ApiResult } from '../../../core/models/api-result.model';
import { UserService } from '../../../core/service/user.service';
import {
  NotificationService,
  Severity,
} from '../../../core/service/notification.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
})
export class ForgotPasswordComponent implements OnInit {
  @ViewChild('captchaView') captchaView?: RecaptchaComponent;

  public user: UserModel = {} as UserModel;
  public hasEmailError = false;
  public forgotPasswordResult: ApiResult<boolean> = new ApiResult<boolean>();
  countdown = 0;

  constructor(
    private userService: UserService,
    private notificationService: NotificationService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.forgotPasswordResult.setData(false);
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

    this.forgotPasswordResult.setLoading(true);
    this.userService.forgotPasswordRequest(this.user).subscribe(
      (res: boolean) => {
        this.forgotPasswordResult.setData(res);
        if (res) {
          this.startCountDown();
        }
      },
      (error: string) => {
        console.log(this.captchaView);
        if (this.captchaView) {
          this.captchaView.reset();
        }
        this.notificationService.showMessage(
          'Server error, please try again',
          Severity.error
        );
        this.forgotPasswordResult.setError(error);
      }
    );
  }

  startCountDown(): void {
    this.countdown = 60;
    const interval = setInterval(() => {
      if (this.countdown <= 0) {
        clearInterval(interval);
        return;
      }
      this.countdown--;
    }, 1000);
  }

  resendInvitationCode(): void {
    this.startCountDown();
    this.userService.forgotPasswordRequest(this.user).subscribe(
      (res: boolean) => {
        if (!res) {
          this.notificationService.showMessage(
            'Server error, please try again',
            Severity.error
          );
        } else {
          this.notificationService.showMessage('Email sent', Severity.success);
        }
      },
      () => {
        this.notificationService.showMessage(
          'Server error, please try again',
          Severity.error
        );
      }
    );
  }
}
