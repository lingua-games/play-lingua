import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class WordService {
  wordUrl = environment.apiUrl + 'word';

  constructor(private http: HttpClient) {}

  getSelectedLanguagesInformation(data: {
    base: number[];
    target: number[];
  }): Observable<any> {
    return this.http.post<any>(this.wordUrl, data);
  }
}
