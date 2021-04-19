import { GameHint } from './game-hint.interface';
import { GameNameEnum } from './game-name.enum';
import { InvitationForm } from './invitation-form.interface';
import { ScoreStoreInterface } from './score-store.interface';

export interface GameInformationInterface {
  name: string;
  gameNameForRanking: string;
  code: GameNameEnum;
  hints: GameHint[];
  isFeedback: boolean;
  feedbackForm: InvitationForm;
  isGameFinished: boolean;
  scoreStore: ScoreStoreInterface;
}
