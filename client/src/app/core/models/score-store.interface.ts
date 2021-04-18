import { InvitationForm } from './invitation-form.interface';

export interface ScoreStoreInterface {
  guestCode: string;
  gameName: string;
  bookId: number;
  chapterId: number;
  score: number;
  count: number;
  gameDisplayName: string;
  isFeedback: boolean;
  feedbackForm: InvitationForm;
  email: string;
}
