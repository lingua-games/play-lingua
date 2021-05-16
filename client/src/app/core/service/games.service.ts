import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  TranslateModel,
  WordKeyValueModel,
} from '../models/word-key-value.model';
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
  ): Observable<WordKeyValueModel<TranslateModel[]>[]> {
    // Todo, uncomment
    return this.http.post<WordKeyValueModel<TranslateModel[]>[]>(
      `${this.gameUrl}/get-words-for-game`,
      getGameWordsRequestModel
    );

    // const result: WordKeyValueModel<string[]>[] = [];
    // result.push({
    //   key: 'abcd efgh ijkl opqr abcd efgh ijkl opqr ',
    //   values: ['abcd efgh ijkl opqr '],
    //   wrongCount: 0,
    // });
    // result.push({ key: 'key 2', values: ['value 2'], wrongCount: 0 });
    // result.push({ key: 'key 3', values: ['value 3'], wrongCount: 0 });
    // result.push({ key: 'key 4', values: ['value 4'], wrongCount: 0 });
    // result.push({ key: 'key 4', values: ['value 4'], wrongCount: 0 });
    // return of(result);
  }

  getGameCountWords(
    getGameWordsRequestModel: GetGameWordsRequestModel
  ): Observable<number> {
    // Todo, uncomment
    return this.http.post<number>(
      `${this.gameUrl}/get-words-count-for-game`,
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
