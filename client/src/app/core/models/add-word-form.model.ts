import { BookModel } from './book.model';
import { WordToAddModel } from './word-to-add.model';
import { ChapterModel } from './chapter.model';

export class AddWordFormModel {
  public baseLanguage: number;
  public targetLanguage: number;
  public book: BookModel;
  public chapter: ChapterModel;
  public isRandom: string;
  public words: WordToAddModel[] = [];
}
