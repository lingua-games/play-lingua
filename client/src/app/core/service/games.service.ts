import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { WordKeyValueModel } from '../models/word-key-value.model';

@Injectable({
  providedIn: 'root',
})
export class GamesService {
  constructor() {}

  getGameWords(): Observable<WordKeyValueModel<string[]>[]> {
    return of([
      { key: 'Apple', value: ['appel'] },
      { key: 'Banana', value: ['banaan'] },
      { key: 'Orange', value: ['oranje'] },
      { key: 'Pineapple', value: ['ananas'] },
      { key: 'Cherry', value: ['kers'] },
    ]);
  }
}
