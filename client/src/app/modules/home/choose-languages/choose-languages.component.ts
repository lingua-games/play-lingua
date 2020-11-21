import { Component, OnInit } from '@angular/core';
import { BasicInformationService } from '../../../core/service/basic-information.service';
import { LanguageModel } from '../../../core/models/language.model';
import { ValidationModel } from '../../../core/models/validation.model';
import { ApiResult } from '../../../core/models/api-result.model';
import {
  NotificationService,
  Severity,
} from '../../../core/service/notification.service';
import { Router } from '@angular/router';
import { SelectedLanguageService } from '../../../core/service/selected-language.service';
import { SelectedLanguageModel } from '../../../core/models/selected-language.model';

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
    private notificationService: NotificationService,
    private router: Router,
    private selectedLanguageService: SelectedLanguageService
  ) {}

  ngOnInit(): void {
    if (localStorage.getItem('lingua-selected-languages')) {
      this.router.navigate(['./game-menu']);
      return;
    }
    this.getLanguages();
  }

  getLanguages(): void {
    this.allLanguages.setLoading(true);
    this.basicInformationService.getAllLanguages().subscribe(
      (res: LanguageModel[]) => {
        this.allLanguages.setData(res);
      },
      (error: any) => {
        this.notificationService.showMessage(
          'Failed to load languages',
          Severity.error
        );
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
    localStorage.removeItem('lingua-selected-languages');
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

    if (this.formValidation.length > 0) {
      return;
    }

    if (localStorage.getItem('lingua-token')) {
      this.saveToBackend();
    } else {
      // This block is for guest
      // BUT
      // It also can save to backend with finding a uniq number/string from
      // user computer and fetch data with found id later for this user.
      this.saveToLocalStorage();
      this.router.navigate(['./game-menu']);
    }
  }

  saveToBackend(): void {
    this.allLanguages.setLoading(false);
    const apiData: SelectedLanguageModel = {
      baseLanguages: JSON.stringify(this.baseLanguages),
      targetLanguages: JSON.stringify(this.targetLanguages),
    } as SelectedLanguageModel;
    this.selectedLanguageService.add(apiData).subscribe(
      (res: SelectedLanguageModel) => {
        this.saveToLocalStorage();
        this.allLanguages.setLoading(false);
        this.router.navigate(['./game-menu']);
      },
      (error: string) => {}
    );
  }

  saveToLocalStorage(): void {
    localStorage.setItem(
      'lingua-selected-languages',
      JSON.stringify({
        base: this.baseLanguages.map((x: LanguageModel) => {
          return {
            id: x.id,
            name: x.name,
          };
        }),
        target: this.targetLanguages.map((x: LanguageModel) => {
          return {
            id: x.id,
            name: x.name,
          };
        }),
      })
    );
  }
}
