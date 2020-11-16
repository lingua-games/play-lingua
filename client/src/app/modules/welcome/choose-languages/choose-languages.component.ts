import { Component, OnInit } from '@angular/core';
import { BasicInformationService } from '../../../core/service/basic-information.service';
import { LanguageModel } from '../../../core/models/language.model';
import { ValidationModel } from '../../../core/models/validation.model';
import { ApiResult } from '../../../core/models/api-result.model';
import {
  NotificationService,
  Severity,
} from '../../../core/service/notification.service';

@Component({
  selector: 'app-choose-languages',
  templateUrl: './choose-languages.component.html',
  styleUrls: ['./choose-languages.component.scss'],
})
export class ChooseLanguagesComponent implements OnInit {
  allLanguages: ApiResult<LanguageModel[]> = new ApiResult<LanguageModel[]>();
  baseLanguages: LanguageModel[] = [];
  targetLanguages: LanguageModel[] = [];
  formValidation: ValidationModel[] = [];

  constructor(
    private basicInformationService: BasicInformationService,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.getLanguages();
  }

  getLanguages(): void {
    this.allLanguages.setLoading(true);
    this.basicInformationService.getAllLanguages().subscribe(
      (res: LanguageModel[]) => {
        this.allLanguages.setData(res);
      },
      (error: any) => {
        this.ngOnInit();
        this.allLanguages.setLoading(false);
      }
    );
  }

  checkFormValidation(fieldName: string): string {
    if (this.formValidation.find((x) => x.field === fieldName)) {
      return 'field-not-valid';
    }
    return '';
  }

  submit(): void {
    this.formValidation = [];
    if (this.baseLanguages.length === 0) {
      this.formValidation.push({
        isValid: false,
        message: 'Base language cannot be empty',
        field: 'baseLanguages',
      });
    }

    if (this.targetLanguages.length === 0) {
      this.formValidation.push({
        isValid: false,
        message: 'Target language cannot be empty',
        field: 'targetLanguages',
      });
    }

    this.formValidation.forEach((element: ValidationModel) => {
      this.notificationService.showMessage(element.message, Severity.error);
    });
  }
}
