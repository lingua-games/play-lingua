import { TestBed } from '@angular/core/testing';

import { BasicInformationService } from './basic-information.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('BasicInformationService', () => {
  let service: BasicInformationService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(BasicInformationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
