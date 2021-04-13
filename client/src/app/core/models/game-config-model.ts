import { BookModel } from './book.model';
import { ChapterModel } from './chapter.model';

export interface GameConfigModel {
  selectedBook: BookModel;
  selectedChapter: ChapterModel;
}
