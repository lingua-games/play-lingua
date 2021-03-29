import { BookModel } from './book.model';
import { WordToAddModel } from './word-to-add.model';
import { ChapterModel } from './chapter.model';

export interface AddWordFormModel {
  baseLanguage: number;
  targetLanguage: number;
  book: BookModel;
  chapter: ChapterModel;
  isRandom: string;
  words: WordToAddModel[];
}
