import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ScoreStoreInterface } from '../models/score-store.interface';

@Injectable({
  providedIn: 'root',
})
export class ScoreStorageService {
  constructor(private http: HttpClient) {}

  storeScore(score: ScoreStoreInterface): Observable<boolean> {
    return this.http.post<boolean>('sdaf', score);
  }
}
