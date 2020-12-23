import { BookModel } from './book.model';
import { ChapterModel } from './chapter.model';
import { WordToAddModel } from './word-to-add.model';

export class AddWordFormModel {
  public baseLanguage: number;
  public targetLanguage: number;
  public book: BookModel;
  public chapter: ChapterModel;
  public isRandom: string;
  public words: WordToAddModel[] = [];
}
