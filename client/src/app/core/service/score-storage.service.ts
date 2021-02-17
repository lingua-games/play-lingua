import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { ScoreStoreInterface } from '../models/score-store.interface';
import { environment } from '../../../environments/environment';
import { RanksResultInterface } from '../models/ranks-result.interface';

@Injectable({
  providedIn: 'root',
})
export class ScoreStorageService {
  storeScoreApi = environment.apiUrl + 'ScoreStore';
  cachedScore = 0;
  constructor(private http: HttpClient) {}

  storeScore(score: ScoreStoreInterface): Observable<RanksResultInterface[]> {
    score.score = Math.round(this.cachedScore * 10) / 10;
    this.cachedScore = 0;
    return this.http.post<RanksResultInterface[]>(this.storeScoreApi, score);
  }

  catchScores(score: number): void {
    if (score) {
      this.cachedScore += score;
    }
  }

  getCachedScores(): number {
    return Math.round(this.cachedScore * 10) / 10;
  }
}
