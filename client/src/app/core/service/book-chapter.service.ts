import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { BookModel } from '../models/book.model';
import { AddWordFormModel } from '../models/add-word-form.model';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { ChapterModel } from '../models/chapter.model';

@Injectable({
  providedIn: 'root',
})
export class BookChapterService {
  bookUrl = environment.apiUrl + 'books';
  wordUrl = environment.apiUrl + 'word';
  chapterUrl = environment.apiUrl + 'chapters';

  constructor(private http: HttpClient) {}

  submitForm(form: AddWordFormModel): Observable<any> {
    return this.http.post<any>(`${this.wordUrl}/submit-word-series`, form);
  }

  getBooksByLanguage(languageId: number): Observable<BookModel[]> {
    return this.http.get<BookModel[]>(
      `${this.bookUrl}/by-language/${languageId}`
    );
  }

  getChaptersByBookId(bookId: number): Observable<ChapterModel[]> {
    return this.http.get<ChapterModel[]>(
      `${this.chapterUrl}/by-book/${bookId}`
    );
  }
}
