import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { WordKeyValueModel } from '../models/word-key-value.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { GetGameWordsRequestModel } from '../models/get-game-words-request.model';
import { GameInformationInterface } from '../models/game-information.interface';

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

  getGames(): GameInformationInterface[] {
    return [
      {
        name: 'Super Mario',
        code: 1,
        gameNameForRanking: 'super-mario',
      } as GameInformationInterface,
      {
        name: 'Falling Stars',
        code: 0,
        gameNameForRanking: 'falling-stars',
      } as GameInformationInterface,
    ];
  }
}
