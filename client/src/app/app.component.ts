import { Component, OnInit } from '@angular/core';
import { SecurityService } from './core/service/security.service';
import { UserService } from './core/service/user.service';
import { UserModel } from './core/models/user.model';
import { LocalStorageHelper } from './core/models/local-storage.enum';
import { LocalStorageService } from './core/service/local-storage.service';
import {
  NotificationService,
  Severity,
} from './core/service/notification.service';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    trigger('fade', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('500ms', style({ opacity: 1 })),
      ]),
      transition(':leave', [
        style({ opacity: 1 }),
        animate('500ms', style({ opacity: 0 })),
      ]),
    ]),
  ],
})
export class AppComponent implements OnInit {
  isGettingUserInformation = false;

  constructor(
    private securityService: SecurityService,
    private userService: UserService,
    private localStorageService: LocalStorageService,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    if (this.securityService.isLoggedIn()) {
      this.getUserInformation();
    }
  }

  getUserInformation(): void {
    this.notificationService.showMessage('Unexpected error', Severity.error);
    this.isGettingUserInformation = true;
    this.securityService.initialTotalScore('loading');
    this.userService.getUserInformation().subscribe(
      (res: UserModel) => {
        this.localStorageService.save(
          LocalStorageHelper.defaultLanguages,
          JSON.stringify({
            defaultBaseLanguage: res.defaultBaseLanguage,
            defaultTargetLanguage: res.defaultTargetLanguage,
          })
        );
        this.securityService.initialTotalScore(res.totalScore.toString());
        this.isGettingUserInformation = false;
      },
      () => {
        this.securityService.initialTotalScore('0');
        this.notificationService.showMessage(
          'Unexpected error',
          Severity.error
        );
        this.isGettingUserInformation = false;
      }
    );
  }
}
