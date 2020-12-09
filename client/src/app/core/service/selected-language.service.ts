import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SelectedLanguageModel } from '../models/selected-language.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SelectedLanguageService {
  selectionLanguageUrl = environment.apiUrl + 'SelectedLanguages';

  constructor(private http: HttpClient) {}

  public add(
    selectedLanguages: SelectedLanguageModel
  ): Observable<SelectedLanguageModel> {
    return this.http.post<SelectedLanguageModel>(
      this.selectionLanguageUrl,
      selectedLanguages
    );
  }

  public setDefaultLanguage(selectedItems: any): Observable<any> {
    return this.http.post<SelectedLanguageModel>(
      this.selectionLanguageUrl + '/setDefaultSelection',
      selectedItems
    );
  }
}
