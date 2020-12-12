import { Component, OnInit } from '@angular/core';
import { LanguageModel } from '../../../core/models/language.model';

@Component({
  selector: 'app-add-word-by-user',
  templateUrl: './add-word-by-user.component.html',
  styleUrls: ['./add-word-by-user.component.scss'],
})
export class AddWordByUserComponent implements OnInit {
  selectedBaseLanguage: LanguageModel = new LanguageModel();
  selectedTargetLanguage: LanguageModel = new LanguageModel();

  baseLanguages: LanguageModel[] = [];
  targetLanguages: LanguageModel[] = [];

  constructor() {}

  ngOnInit(): void {
    this.getBaseAndTargetLanguages();
  }

  getBaseAndTargetLanguages(): void {
    const selectedLanguages = JSON.parse(
      localStorage.getItem('lingua-selected-languages')
    );
    this.baseLanguages = selectedLanguages.base;
    this.targetLanguages = selectedLanguages.target;
  }

  submitSelectedLanguages(): void {}
}
