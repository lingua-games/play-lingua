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
  mockBooks: Book[] = [];
  bookUrl = environment.apiUrl + 'books';

  constructor(private http: HttpClient) {
    this.mockBooks.push({ name: 'Book 1', id: 1 });
    this.mockBooks.push({ name: 'Book 2', id: 2 });
    this.mockBooks.push({ name: 'Book 3', id: 3 });
    this.mockBooks.push({ name: 'Book 4', id: 4 });
  }

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
