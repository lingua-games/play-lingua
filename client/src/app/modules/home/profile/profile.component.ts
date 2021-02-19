import { Component, OnInit } from '@angular/core';
import { UserModel } from '../../../core/models/user.model';
import {
  NotificationService,
  Severity,
} from '../../../core/service/notification.service';
import { UserService } from '../../../core/service/user.service';
import { SecurityService } from '../../../core/service/security.service';
import { EditUserModel } from '../../../core/models/edit-user.model';
import { animate, style, transition, trigger } from '@angular/animations';

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
  public errors: any = {};
  public isLoading: boolean;
  constructor(
    private userService: UserService,
    private notificationService: NotificationService,
    private securityService: SecurityService
  ) {}

  ngOnInit(): void {
    this.user.displayName = this.securityService.getTokenInformation().displayName;
  }

  submit(): void {
    this.errors = {};

    if (!this.user.displayName || this.user.displayName === '') {
      this.errors.displayName = 'Display name is a required field';
      return;
    }

    // if (!this.user.) {
    //   this.errors.password = 'Password is a required field';
    //   return;
    // }
    //
    // if (this.user.password !== this.user.rePassword) {
    //   this.errors.password = 'Password and Re-Password should be the same';
    //   return;
    // }
    // this.isLoading = true;
    // this.userService.add(this.user).subscribe(
    //   (res: UserModel) => {},
    //   (error: string) => {
    //     this.notificationService.showMessage(error, Severity.error);
    //     this.isLoading = false;
    //   }
    // );
  }
}
