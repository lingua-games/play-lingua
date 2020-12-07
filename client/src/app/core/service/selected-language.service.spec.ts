import { TestBed } from '@angular/core/testing';

import { SelectedLanguageService } from './selected-language.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';

describe('SelectedLanguageService', () => {
  let service: SelectedLanguageService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
    });
    service = TestBed.inject(SelectedLanguageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
