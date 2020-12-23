import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { BookModel } from '../models/book.model';

@Injectable({
  providedIn: 'root',
})
export class BookChapterService {
  constructor() {}

  getBooksByLanguages(languageIds: number): Observable<BookModel[]> {
    return of([
      { id: 1, name: 'book1', targetLanguageId: 367 },
      { id: 1, name: 'book aaa', targetLanguageId: 398 },
      { id: 1, name: 'book bbb', targetLanguageId: 367 },
      { id: 1, name: 'book ccc', targetLanguageId: 398 },
      { id: 1, name: 'book sss', targetLanguageId: 367 },
      { id: 1, name: 'book zzz', targetLanguageId: 398 },
    ]);
  }

  getChaptersByBookId(bookId: number): Observable<BookModel[]> {
    return of([
      { id: 1, name: 'chapter 1', targetLanguageId: 367 },
      { id: 1, name: 'chapter aaa', targetLanguageId: 398 },
      { id: 1, name: 'chapter bbb', targetLanguageId: 367 },
      { id: 1, name: 'chapter ccc', targetLanguageId: 398 },
      { id: 1, name: 'chapter sss', targetLanguageId: 367 },
      { id: 1, name: 'chapter zzz', targetLanguageId: 398 },
    ]);
  }
}
