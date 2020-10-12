import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GamesService {

  constructor() {
  }

  getGameWords(): Observable<string[]> {
    return of(
      [
        'Apple',
        'Banana',
        'Orange',
        'Pineapple',
        'Cherry',
      ]);
  }
}
