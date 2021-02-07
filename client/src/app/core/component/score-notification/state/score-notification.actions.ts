import { createAction, props } from '@ngrx/store';
import { NotificationState } from './score-notification.reducer';

export const toggleNotification = createAction(
  '[Score notification] Toggle the score popup',
  props<NotificationState>()
);
