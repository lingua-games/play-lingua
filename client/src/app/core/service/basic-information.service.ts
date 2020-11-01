import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Book } from '../models/book.interface';
import { environment } from '../../../environments/environment';
import { retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class BasicInformationService {
  bookUrl = environment.apiUrl + 'books';

  constructor(private http: HttpClient) {}

  getBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(this.bookUrl);
  }

  addBook(book: Book): Observable<Book> {
    return this.http.post<Book>(this.bookUrl, book);
  }

  deleteBook(bookId: number): Observable<{}> {
    return this.http.delete(`${this.bookUrl}/${bookId}`);
  }

  editBook(book: Book): Observable<any> {
    return this.http.put(`${this.bookUrl}/${book.id}`, book);
  }
}
