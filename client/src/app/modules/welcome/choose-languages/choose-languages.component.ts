import { Component, OnInit } from '@angular/core';
import { BasicInformationService } from '../../../core/service/basic-information.service';
import { LanguageModel } from '../../../core/models/language.model';
import { ValidationModel } from '../../../core/models/validation.model';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-choose-languages',
  templateUrl: './choose-languages.component.html',
  styleUrls: ['./choose-languages.component.scss'],
})
export class ChooseLanguagesComponent implements OnInit {
  allLanguages: LanguageModel[] = [];
  baseLanguages: LanguageModel[] = [];
  targetLanguages: LanguageModel[] = [];
  formValidation: ValidationModel[] = [];

  constructor(
    private basicInformationService: BasicInformationService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.getLanguages();
  }

  getLanguages(): void {
    this.allLanguages = this.basicInformationService
      .getAllLanguages()
      .map((x) => {
        return {
          code: x.code,
          fullName: x.name + ' - ' + x.nativeName,
          name: x.name,
          nativeName: x.nativeName,
        };
      });
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
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: element.message,
      });
    });
  }
}
