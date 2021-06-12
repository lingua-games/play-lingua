import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { State } from '../../../states/app.state';
import {
  getShowNotification,
  NotificationState,
} from './state/score-notification.reducer';
import { animate, style, transition, trigger } from '@angular/animations';
import { MessageService } from 'primeng/api';

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
  constructor(
    private store: Store<State>,
    private messageService: MessageService
  ) {}
  notification: NotificationState = {} as NotificationState;
  showNotification?: boolean;
  victoryMessage = '';

  ngOnInit(): void {
    this.store
      .select(getShowNotification)
      .subscribe((notification: NotificationState) => {
        this.chooseMessage();
        if (notification && notification.gameName) {
          this.notification = notification;
          if (notification.position) {
            this.showMessage();
          } else {
            this.showNotification = true;
            setTimeout(() => {
              this.showNotification = false;
            }, 1000);
          }
        }
      });
  }

  chooseMessage(): void {
    const messages: string[] = ['Yay', 'Hurray', 'Super', 'Perfect', 'Amazing'];
    const randomNumber = Math.floor(Math.random() * messages.length);
    this.victoryMessage = messages[randomNumber];
  }

  showMessage(): void {
    setTimeout(() => {
      this.messageService.add({
        severity: 'success',
        key: this.notification.positionKey,
        summary: this.notification.title,
        detail: this.notification.message,
      });
    }, 1);
  }
}
