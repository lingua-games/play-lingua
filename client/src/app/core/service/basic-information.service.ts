import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Book } from '../models/book.interface';

@Injectable({
  providedIn: 'root',
})
export class BasicInformationService {
  constructor(private http: HttpClient) {}

  addBook(book: Book): Observable<any> {
    return this.http.post('', book);
  }
}
