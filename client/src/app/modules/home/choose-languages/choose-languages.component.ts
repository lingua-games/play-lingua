import { Component, OnInit } from '@angular/core';
import { BasicInformationService } from '../../../core/service/basic-information.service';
import { LanguageModel } from '../../../core/models/language.model';
import { ValidationModel } from '../../../core/models/validation.model';
import { ApiResult } from '../../../core/models/api-result.model';
import {
  NotificationService,
  Severity,
} from '../../../core/service/notification.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SelectedLanguageService } from '../../../core/service/selected-language.service';
import { SelectedLanguageModel } from '../../../core/models/selected-language.model';
import { LocalStorageHelper } from '../../../core/models/local-storage.enum';
import { SecurityService } from '../../../core/service/security.service';
import { LocalStorageService } from '../../../core/service/local-storage.service';
import { Location } from '@angular/common';

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
    private selectedLanguageService: SelectedLanguageService,
    private activatedRoute: ActivatedRoute,
    private securityService: SecurityService,
    private localStorageService: LocalStorageService,
    private location: Location
  ) {}

  ngOnInit(): void {
    if (!this.activatedRoute.snapshot.paramMap.get('mode')) {
      if (this.localStorageService.load(LocalStorageHelper.selectedLanguages)) {
        this.router.navigate(['./game-menu']).then();
        return;
      }
    }
    this.getLanguages();
  }

  isLoggedIn(): boolean {
    return this.securityService.isLoggedIn();
  }

  back(): void {
    this.location.back();
  }

  getLanguages(): void {
    this.allLanguages.setLoading(true);
    this.basicInformationService.getAllLanguages().subscribe(
      (res: LanguageModel[]) => {
        this.allLanguages.setData(res);
        if (
          this.activatedRoute.snapshot.paramMap.get('mode') &&
          this.activatedRoute.snapshot.paramMap.get('mode') === 'edit'
        ) {
          this.fillDataInModels();
        }
      },
      () => {
        this.notificationService.showMessage(
          'Failed to load languages',
          Severity.error
        );
        this.allLanguages.setLoading(false);
      }
    );
  }

  fillDataInModels(): void {
    const storedData = JSON.parse(
      this.localStorageService.load(LocalStorageHelper.selectedLanguages)
    );
    if (storedData && storedData.base) {
      this.baseLanguages = [];
      this.allLanguages.data.forEach((element: LanguageModel) => {
        if (
          storedData &&
          storedData.base &&
          storedData.base.find((x) => x.id === element.id)
        ) {
          this.baseLanguages.push(element);
        }
        if (
          storedData &&
          storedData.target &&
          storedData.target.find((x) => x.id === element.id)
        ) {
          this.targetLanguages.push(element);
        }
      });
    }
  }

  checkFormValidation(fieldName: string): string {
    if (this.formValidation.find((x) => x.field === fieldName)) {
      return 'field-not-valid';
    }
    return '';
  }

  submit(): void {
    this.localStorageService.delete(LocalStorageHelper.selectedLanguages);
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
    if (this.targetLanguages.length > 5) {
      this.formValidation.push({
        isValid: false,
        message: 'Target language should be less than 5',
        field: 'targetLanguages',
      });
    }

    if (this.baseLanguages.length > 5) {
      this.formValidation.push({
        isValid: false,
        message: 'Base language should be less than 5',
        field: 'baseLanguages',
      });
    }

    this.formValidation.forEach((element: ValidationModel) => {
      this.notificationService.showMessage(element.message, Severity.error);
    });

    if (this.formValidation.length > 0) {
      return;
    }

    if (this.securityService.isLoggedIn()) {
      this.allLanguages.setLoading(true);
      this.saveToBackend();
    } else {
      // This block is for guest
      // BUT
      // It also can save to backend with finding a uniq number/string from
      // user computer and fetch data with found id later for this user.
      this.saveToLocalStorage();
      setTimeout(() => {
        this.router.navigate(['./game-menu']).then();
      }, 100);
    }
  }

  saveToBackend(): void {
    const apiData: SelectedLanguageModel = {
      baseLanguages: JSON.stringify(this.baseLanguages),
      targetLanguages: JSON.stringify(this.targetLanguages),
    } as SelectedLanguageModel;
    this.selectedLanguageService.add(apiData).subscribe(
      () => {
        this.saveToLocalStorage();
        this.allLanguages.setLoading(false);
        this.router.navigate(['./game-menu']).then();
      },
      () => {
        this.allLanguages.setLoading(false);
      }
    );
  }

  saveToLocalStorage(): void {
    // TODO: USER SHOULD NOT BE ALLOWED TO CHANGE HIS DEFAULT LANGUAGE
    if (this.securityService.isLoggedIn()) {
      this.localStorageService.save(
        LocalStorageHelper.selectedLanguages,
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
    } else {
      this.localStorageService.save(
        LocalStorageHelper.selectedLanguages,
        JSON.stringify({
          base: [this.baseLanguages],
          target: [this.targetLanguages],
        })
      );
    }
  }
}
