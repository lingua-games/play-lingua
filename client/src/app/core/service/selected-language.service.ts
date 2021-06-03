import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { DefaultLanguageModel } from '../models/set-default-language.model';

@Injectable({
  providedIn: 'root',
})
export class SelectedLanguageService {
  selectionLanguageUrl = environment.apiUrl + 'SelectedLanguages';

  constructor(private http: HttpClient) {}

  public setDefaultLanguage(
    selectedItems: DefaultLanguageModel
  ): Observable<{}> {
    return this.http.post<{}>(
      this.selectionLanguageUrl + '/setDefaultLanguage',
      {
        baseLanguage: selectedItems.defaultBaseLanguage.id,
        targetLanguage: selectedItems.defaultTargetLanguage.id,
      }
    );
  }
}
