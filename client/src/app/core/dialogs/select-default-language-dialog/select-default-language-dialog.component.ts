import { Component, OnInit } from '@angular/core';
import { LanguageModel } from '../../models/language.model';
import {
  NotificationService,
  Severity,
} from '../../service/notification.service';
import { SelectedLanguageService } from '../../service/selected-language.service';
import { MatDialogRef } from '@angular/material/dialog';
import { Local } from 'protractor/built/driverProviders';
import { LocalStorageHelper } from '../../models/local-storage.enum';
import { SetDefaultLanguageModel } from '../../models/set-default-language.model';

@Component({
  selector: 'app-select-default-language-dialog',
  templateUrl: './select-default-language-dialog.component.html',
  styleUrls: ['./select-default-language-dialog.component.scss'],
})
export class SelectDefaultLanguageDialogComponent implements OnInit {
  baseLanguages: LanguageModel[] = [];
  targetLanguages: LanguageModel[] = [];
  isLoading: boolean;
  selectedItems: SetDefaultLanguageModel = new SetDefaultLanguageModel();

  constructor(
    private notificationService: NotificationService,
    private languageService: SelectedLanguageService,
    public dialogRef: MatDialogRef<SelectDefaultLanguageDialogComponent>
  ) {}

  ngOnInit(): void {
    const selectedLanguages = JSON.parse(
      localStorage.getItem(LocalStorageHelper.selectedLanguages)
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
          LocalStorageHelper.defaultLanguages,
          JSON.stringify(this.selectedItems)
        );
        this.dialogRef.close(this.selectedItems);
      },
      (error: any) => {
        this.isLoading = false;
      }
    );
  }
}
