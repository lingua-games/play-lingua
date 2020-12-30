import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { WordKeyValueModel } from '../models/word-key-value.model';
import { BookModel } from '../models/book.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { GetGameWordsRequestModel } from '../models/get-game-words-request.model';

@Injectable({
  providedIn: 'root',
})
export class GamesService {
  gameUrl = environment.apiUrl + 'Games';

  constructor(private http: HttpClient) {}

  getGameWords(
    getGameWordsRequestModel: GetGameWordsRequestModel
  ): Observable<WordKeyValueModel<string[]>[]> {
    return this.http.post<WordKeyValueModel<string[]>[]>(
      `${this.gameUrl}/get-words-for-game`,
      getGameWordsRequestModel
    );
  }
}
