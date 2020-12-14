import { Component, OnInit } from '@angular/core';
import { LanguageModel } from '../../../core/models/language.model';
import {
  NotificationService,
  Severity,
} from '../../../core/service/notification.service';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-add-word-by-user',
  templateUrl: './add-word-by-user.component.html',
  styleUrls: ['./add-word-by-user.component.scss'],
})
export class AddWordByUserComponent implements OnInit {
  baseLanguages: LanguageModel[] = [];
  targetLanguages: LanguageModel[] = [];

  selectLanguageForm = this.formBuilder.group({
    baseLanguage: ['', Validators.required],
    targetLanguage: ['', Validators.required],
    isSelectedLanguageSubmit: [false],
  });

  get baseLanguage(): AbstractControl {
    return this.selectLanguageForm.get('baseLanguage');
  }

  get targetLanguage(): AbstractControl {
    return this.selectLanguageForm.get('targetLanguage');
  }

  get isSelectedLanguageSubmit(): AbstractControl {
    return this.selectLanguageForm.get('isSelectedLanguageSubmit');
  }

  constructor(
    private notificationService: NotificationService,
    private formBuilder: FormBuilder
  ) {}

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

  submitSelectedLanguages(): void {
    if (this.isSelectedLanguageSubmit.value) {
      this.isSelectedLanguageSubmit.setValue(false);
      return;
    }
    if (this.selectLanguageForm.invalid) {
      this.selectLanguageForm.markAsDirty();
      if (this.baseLanguage.invalid) {
        this.notificationService.showMessage(
          'Base language has not selected yet',
          Severity.error,
          '',
          'bc'
        );
      }

      if (this.targetLanguage.invalid) {
        this.notificationService.showMessage(
          'Target language has not selected yet',
          Severity.error,
          '',
          'bc'
        );
      }
      return;
    }
    this.isSelectedLanguageSubmit.setValue(true);
  }

  checkFormValidation(fieldName: string): string {
    // if (
    //   this.formValidation.find((x: ValidationModel) => x.field === fieldName)
    // ) {
    //   return 'field-not-valid';
    // }
    return '';
  }
}
