import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { State } from '../../../states/app.state';
import {
  getShowNotification,
  NotificationState,
} from './state/score-notification.reducer';

@Component({
  selector: 'app-score-notification',
  templateUrl: './score-notification.component.html',
  styleUrls: ['./score-notification.component.scss'],
})
export class ScoreNotificationComponent implements OnInit {
  constructor(private store: Store<State>) {}

  ngOnInit(): void {
    this.store
      .select(getShowNotification)
      .subscribe((notification: NotificationState) => {});
  }
}
