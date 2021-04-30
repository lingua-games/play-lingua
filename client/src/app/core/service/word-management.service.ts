import { Injectable } from '@angular/core';
import { AddWordFormModel } from '../models/add-word-form.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { WordOverviewsModel } from '../models/word-overviews.model';
import { WordDetails } from '../models/word-details.model';

@Injectable({
  providedIn: 'root',
})
export class WordManagementService {
  wordUrl = environment.apiUrl + 'word';

  constructor(private http: HttpClient) {}

  submitForm(form: AddWordFormModel): Observable<{}> {
    return this.http.post<{}>(`${this.wordUrl}/submit-word-series`, form);
  }

  editForm(form: AddWordFormModel): Observable<{}> {
    return this.http.post<{}>(`${this.wordUrl}/edit-word-series`, form);
  }

  getWordOverviews(): Observable<WordOverviewsModel[]> {
    return this.http.get<WordOverviewsModel[]>(
      `${this.wordUrl}/get-word-overviews`
    );
  }

  getWordDetails(overview: WordOverviewsModel): Observable<WordDetails[]> {
    return this.http.post<WordDetails[]>(
      `${this.wordUrl}/get-word-details`,
      overview
    );
  }
}
