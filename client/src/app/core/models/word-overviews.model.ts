export interface WordOverviewsModel {
  bookId: number;
  chapterId: number;
  baseLanguageId: number;
  targetLanguageId: number;
  targetLanguageName: string;
  baseLanguageName: string;
  count: number;
  bookName: string;
  chapterName: string;
  lastUpdateDate: Date;
  addedDate: Date;
}

export interface WordOverviewsToShowModel {
  bookId: number;
  baseLanguageId: number;
  targetLanguageId: number;
  targetLanguageName: string;
  baseLanguageName: string;
  count: number;
  bookName: string;
  WordOverviewDetails: WordOverviewsModel[];
}
