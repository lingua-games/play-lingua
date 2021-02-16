import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ScoreStoreInterface } from '../models/score-store.interface';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ScoreStorageService {
  storeScoreApi = environment.apiUrl + 'ScoreStore';
  cachedScore = 0;
  constructor(private http: HttpClient) {}

  storeScore(score: ScoreStoreInterface): Observable<boolean> {
    score.score = Math.round(this.cachedScore * 10) / 10;
    this.cachedScore = 0;
    return this.http.post<boolean>(this.storeScoreApi, score);
  }

  catchScores(score: number): void {
    if (score) {
      this.cachedScore += score;
    }
  }

  getCachedScores(): number {
    return this.cachedScore;
  }
}
