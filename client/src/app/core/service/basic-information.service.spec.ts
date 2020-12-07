import { TestBed } from '@angular/core/testing';

import { BasicInformationService } from './basic-information.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';

describe('BasicInformationService', () => {
  let service: BasicInformationService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
    });
    service = TestBed.inject(BasicInformationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
