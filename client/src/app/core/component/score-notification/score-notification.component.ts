import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { State } from '../../../states/app.state';
import {
  getShowNotification,
  NotificationState,
} from './state/score-notification.reducer';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-score-notification',
  templateUrl: './score-notification.component.html',
  styleUrls: ['./score-notification.component.scss'],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ transform: 'scale(.1)', top: '30vh' }),
        animate('200ms', style({ transform: 'scale(1)', top: '60vh' })),
      ]),
      transition(':leave', [
        style({ transform: 'scale(1)', top: '60vh' }),
        animate('200ms', style({ transform: 'scale(.1)', top: '30vh' })),
      ]),
    ]),
  ],
})
export class ScoreNotificationComponent implements OnInit {
  constructor(private store: Store<State>) {}
  notification: NotificationState = {} as NotificationState;
  showNotification: boolean;
  ngOnInit(): void {
    this.store
      .select(getShowNotification)
      .subscribe((notification: NotificationState) => {
        if (notification && notification.gameName) {
          this.showNotification = true;
          this.notification = notification;
          setTimeout(() => {
            this.showNotification = false;
          }, 1000);
        }
      });
  }
}
