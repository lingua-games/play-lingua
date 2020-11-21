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
import { loadavg } from 'os';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  public user: UserModel = new UserModel();
  public errors: any = {};
  public isLoading: boolean;

  constructor(
    private userService: UserService,
    private notificationService: NotificationService,
    private router: Router,
    private securityService: SecurityService
  ) {}

  ngOnInit(): void {
    if (localStorage.getItem('lingua-token')) {
      this.router.navigate(['game-menu']);
    }
  }

  submit(): void {
    this.errors = {};
    if (!this.user.email) {
      this.errors.email = 'Email is a required field';
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
      (res: UserModel) => {
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
        localStorage.setItem('lingua-token', res.token);
        localStorage.setItem('lingua-email', res.user.email);
        this.router.navigate(['../game-menu']);
      },
      (error: string) => {}
    );
  }
}
