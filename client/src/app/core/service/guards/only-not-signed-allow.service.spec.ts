import { TestBed } from '@angular/core/testing';

import { OnlyNotSignedAllowService } from './only-not-signed-allow.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MaterialModule } from '../../../modules/common/material/material.module';

describe('OnlyNotSignedAllowService', () => {
  let service: OnlyNotSignedAllowService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule, MaterialModule],
    });
    service = TestBed.inject(OnlyNotSignedAllowService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
