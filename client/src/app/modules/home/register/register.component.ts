import { Component, OnInit } from '@angular/core';
import { UserModel } from '../../../core/models/user.model';
import { UserService } from '../../../core/service/user.service';
import {
  NotificationService,
  Severity,
} from '../../../core/service/notification.service';

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
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {}

  submit(): void {
    if (!this.user.username) {
      this.errors.username = 'Username is a required field';
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
        this.isLoading = false;
      },
      (error: string) => {
        this.notificationService.showMessage(error, Severity.error);
        this.isLoading = false;
      }
    );
  }
}
