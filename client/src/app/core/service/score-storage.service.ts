import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ScoreStoreInterface } from '../models/score-store.interface';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ScoreStorageService {
  storeScoreApi = environment.apiUrl + 'storeScore';
  cachedScore = 0;
  constructor(private http: HttpClient) {}

  storeScore(score: ScoreStoreInterface): Observable<boolean> {
    return this.http.post<boolean>(this.storeScoreApi, score);
  }

  catchScores(score): void {
    if (score) {
      this.cachedScore += score;
    }
  }
}
