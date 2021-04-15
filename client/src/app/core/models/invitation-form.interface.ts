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
  count: number;
  playerName: string;
  game: GameInformationInterface;
  htmlText: string;
  // isOpened: boolean
  // openedDate: date
}
