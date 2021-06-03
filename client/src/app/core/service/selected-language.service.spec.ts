import { TestBed } from '@angular/core/testing';

import { SelectedLanguageService } from './selected-language.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { DefaultLanguageModel } from '../models/set-default-language.model';

describe('SelectedLanguageService', () => {
  let service: SelectedLanguageService;
  let httpClientSpy: {
    post: jasmine.Spy;
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
    });
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['post']);
    // tslint:disable-next-line:no-any
    service = new SelectedLanguageService(httpClientSpy as any);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call selectionLanguageUrl/setDefaultSelection when setDefaultLanguage() hits', () => {
    service.setDefaultLanguage({
      defaultTargetLanguage: {},
      defaultBaseLanguage: {},
    } as DefaultLanguageModel);
    expect(httpClientSpy.post).toHaveBeenCalled();
  });
});
