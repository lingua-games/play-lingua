import { LanguageModel } from './language.model';
import { BookModel } from './book.model';
import { ChapterModel } from './chapter.model';
import { GameInformationInterface } from './game-information.interface';

export interface InvitationForm {
  email: string;
  targetLanguage: LanguageModel;
  baseLanguage: LanguageModel;
  book: BookModel;
  chapter: ChapterModel;
  generatedLink: string;
  uniqueKey: string;
  count: number;
  playerName: string;
  gameObj: GameInformationInterface;
  game: string;
  htmlText: string;
  isOpened: boolean;
  openedDate: Date;
  addedDate: Date;
  emailErrorMessage: string;
  isEmailSent: boolean;
  isSendingInvitationLoading?: boolean;
}
