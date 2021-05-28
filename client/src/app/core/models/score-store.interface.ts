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
  feedbackUniqueKey: string;
  feedbackForm: InvitationForm;
  email: string;
  feedbackId: string;
  baseLanguageId: number;
  targetLanguageId: number;
}
