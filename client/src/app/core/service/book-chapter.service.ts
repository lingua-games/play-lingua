import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BookModel } from '../models/book.model';
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

  getBooksByLanguage(
    targetLanguage: number,
    baseLanguage: number
  ): Observable<BookModel[]> {
    return this.http.get<BookModel[]>(
      `${this.bookUrl}/by-language/${targetLanguage}/${baseLanguage}`
    );
  }

  getBooksBySourceAndTargetLanguageId(
    baseLanguageId: number,
    targetLanguageId: number
  ): Observable<BookModel[]> {
    return this.http.get<BookModel[]>(
      `${this.bookUrl}/by-source-and-target-language/${baseLanguageId}/${targetLanguageId}`
    );
  }

  getChaptersByBookId(bookId: number): Observable<ChapterModel[]> {
    return this.http.get<ChapterModel[]>(
      `${this.chapterUrl}/by-book/${bookId}`
    );
  }
}
