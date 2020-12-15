import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { BookModel } from '../models/book.model';

@Injectable({
  providedIn: 'root',
})
export class BookChapterService {
  constructor() {}

  getBooksByLanguages(languageIds: number[]): Observable<BookModel[]> {
    return of([
      { id: 1, name: 'book1', TargetLanguageId: 123 },
      { id: 1, name: 'book aaa', TargetLanguageId: 38 },
      { id: 1, name: 'book bbb', TargetLanguageId: 123 },
      { id: 1, name: 'book ccc', TargetLanguageId: 123 },
      { id: 1, name: 'book sss', TargetLanguageId: 38 },
      { id: 1, name: 'book asdfz', TargetLanguageId: 123 },
    ]);
  }
}
