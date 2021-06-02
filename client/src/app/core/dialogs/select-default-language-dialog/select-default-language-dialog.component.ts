import { Component, OnInit } from '@angular/core';
import {
  NotificationService,
  Severity,
} from '../../service/notification.service';
import { MatDialogRef } from '@angular/material/dialog';
import { DefaultLanguageModel } from '../../models/set-default-language.model';
import { BasicInformationService } from '../../service/basic-information.service';
import { LanguageModel } from '../../models/language.model';
import { ApiResult } from '../../models/api-result.model';
import { SelectedLanguageService } from '../../service/selected-language.service';
import { LocalStorageService } from '../../service/local-storage.service';
import { LocalStorageHelper } from '../../models/local-storage.enum';

@Component({
  selector: 'app-select-default-language-dialog',
  templateUrl: './select-default-language-dialog.component.html',
  styleUrls: ['./select-default-language-dialog.component.scss'],
})
export class SelectDefaultLanguageDialogComponent implements OnInit {
  selectedItems: DefaultLanguageModel = {} as DefaultLanguageModel;
  languages: ApiResult<LanguageModel[]> = new ApiResult<LanguageModel[]>();

  constructor(
    private notificationService: NotificationService,
    public dialogRef: MatDialogRef<SelectDefaultLanguageDialogComponent>,
    private basicInformationService: BasicInformationService,
    private selectedLanguageService: SelectedLanguageService,
    private localStorageService: LocalStorageService
  ) {}

  ngOnInit(): void {
    this.getLanguages();
  }

  getLanguages(): void {
    this.languages.setLoading(true);
    this.basicInformationService.getAllLanguages().subscribe(
      (res: LanguageModel[]) => {
        this.languages.setData(res);
      },
      () => {
        this.languages.setError('Unable to load languages');
      }
    );
  }
  submit(): void {
    if (!this.selectedItems.baseLanguage) {
      this.notificationService.showMessage(
        'Base language is empty',
        Severity.error
      );
      return;
    }

    if (!this.selectedItems.targetLanguage) {
      this.notificationService.showMessage(
        'Target language is empty',
        Severity.error
      );
      return;
    }

    this.languages.setLoading(true);
    this.selectedLanguageService
      .setDefaultLanguage(this.selectedItems)
      .subscribe(
        () => {
          this.localStorageService.save(
            LocalStorageHelper.defaultLanguages,
            JSON.stringify(this.selectedItems)
          );
          this.dialogRef.close();
        },
        () => {
          this.languages.setLoading(false);
          this.notificationService.showMessage(
            'Unexpected issue, please try again',
            Severity.error
          );
          return;
        }
      );
  }
}
