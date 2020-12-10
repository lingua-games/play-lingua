import { Component, OnInit } from '@angular/core';
import { LanguageModel } from '../../models/language.model';
import {
  NotificationService,
  Severity,
} from '../../service/notification.service';
import { SelectedLanguageService } from '../../service/selected-language.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-select-default-language-dialog',
  templateUrl: './select-default-language-dialog.component.html',
  styleUrls: ['./select-default-language-dialog.component.scss'],
})
export class SelectDefaultLanguageDialogComponent implements OnInit {
  baseLanguages: LanguageModel[] = [];
  targetLanguages: LanguageModel[] = [];
  isLoading: boolean;
  selectedItems: {
    defaultBaseLanguage: LanguageModel;
    defaultTargetLanguage: LanguageModel;
  } = {} as any;

  constructor(
    private notificationService: NotificationService,
    private languageService: SelectedLanguageService,
    public dialogRef: MatDialogRef<SelectDefaultLanguageDialogComponent>
  ) {}

  ngOnInit(): void {
    const selectedLanguages = JSON.parse(
      localStorage.getItem('lingua-selected-languages')
    );

    if (selectedLanguages) {
      this.baseLanguages = selectedLanguages.base;
      this.targetLanguages = selectedLanguages.target;
    }
  }

  submit(): void {
    if (!this.selectedItems.defaultBaseLanguage) {
      this.notificationService.showMessage(
        'Base language is empty',
        Severity.error
      );
      return;
    }

    if (!this.selectedItems.defaultTargetLanguage) {
      this.notificationService.showMessage(
        'Target language is empty',
        Severity.error
      );
      return;
    }
    this.isLoading = true;
    this.languageService.setDefaultLanguage(this.selectedItems).subscribe(
      (red: any) => {
        localStorage.setItem(
          'lingua-default-languages',
          JSON.stringify(this.selectedItems)
        );
        this.dialogRef.close();
      },
      (error: any) => {
        this.isLoading = false;
      }
    );
  }
}
