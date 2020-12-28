import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { BookModel } from '../models/book.model';
import { AddWordFormModel } from '../models/add-word-form.model';
import { delay } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { ChapterModel } from '../models/chapter.model';

@Injectable({
  providedIn: 'root',
})
export class BookChapterService {
  bookUrl = environment.apiUrl + 'books';
  chapterUrl = environment.apiUrl + 'chapters';

  constructor(private http: HttpClient) {}

  submitForm(form: AddWordFormModel): Observable<boolean> {
    return of(true).pipe(delay(3000));
  }

  getBooksByLanguage(languageId: number): Observable<BookModel[]> {
    return this.http.get<BookModel[]>(
      `${this.bookUrl}/by-language/${languageId}`
    );
    // return of([
    //   { id: 1, name: 'book1', targetLanguageId: 367 },
    //   { id: 1, name: 'book aaa', targetLanguageId: 398 },
    //   { id: 1, name: 'book bbb', targetLanguageId: 367 },
    //   { id: 1, name: 'book ccc', targetLanguageId: 398 },
    //   { id: 1, name: 'book sss', targetLanguageId: 367 },
    //   { id: 1, name: 'book zzz', targetLanguageId: 398 },
    // ]);
  }

  getChaptersByBookId(bookId: number): Observable<ChapterModel[]> {
    return this.http.get<ChapterModel[]>(
      `${this.chapterUrl}/by-book/${bookId}`
    );
    // return of([
    //   { id: 1, name: 'chapter 1', targetLanguageId: 367 },
    //   { id: 1, name: 'chapter aaa', targetLanguageId: 398 },
    //   { id: 1, name: 'chapter bbb', targetLanguageId: 367 },
    //   { id: 1, name: 'chapter ccc', targetLanguageId: 398 },
    //   { id: 1, name: 'chapter sss', targetLanguageId: 367 },
    //   { id: 1, name: 'chapter zzz', targetLanguageId: 398 },
    // ]);
  }
}
