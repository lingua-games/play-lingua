import {
  createFeatureSelector,
  createReducer,
  createSelector,
  on,
} from '@ngrx/store';
import { toggleNotification } from './score-notification.actions';
import { ScoreType } from '../../../models/score-notification-appearance.enum';

export interface NotificationState {
  gameName: string;
  score: number;
  message: string;
  title: string;
  position?: ScoreType;
  positionKey?: string;
}

const initialState: NotificationState = {
  gameName: '',
  score: 0,
  message: '',
  title: '',
};

export const getNotificationFeatureState = createFeatureSelector<NotificationState>(
  'notifications'
);

export const getShowNotification = createSelector(
  getNotificationFeatureState,
  (notification) => notification
);

export const scoreNotificationReducer = createReducer<NotificationState>(
  initialState,
  on(
    toggleNotification,
    (state, newAction): NotificationState => {
      return newAction;
    }
  )
);
