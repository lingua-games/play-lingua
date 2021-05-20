import { Component, OnInit } from '@angular/core';
import { UserModel } from '../../../core/models/user.model';
import { UserService } from '../../../core/service/user.service';
import {
  NotificationService,
  Severity,
} from '../../../core/service/notification.service';
import { Router } from '@angular/router';
import { SecurityService } from '../../../core/service/security.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  public user: UserModel = {} as UserModel;
  public isLoading?: boolean;
  public hasEmailError = false;

  constructor(
    private userService: UserService,
    private notificationService: NotificationService,
    private router: Router,
    private securityService: SecurityService,
    private location: Location
  ) {}

  ngOnInit(): void {
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

    this.isLoading = true;
    this.userService.add(this.user).subscribe(
      () => {},
      (error: string) => {
        this.notificationService.showMessage(error, Severity.error);
        this.isLoading = false;
      }
    );
  }
}
