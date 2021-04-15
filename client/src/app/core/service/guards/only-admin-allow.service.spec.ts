import { TestBed } from '@angular/core/testing';

import { OnlyAdminAllowService } from './only-admin-allow.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MaterialModule } from '../../../modules/common/material/material.module';

describe('OnlyAdminAllowService', () => {
  let service: OnlyAdminAllowService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule, MaterialModule],
    });
    service = TestBed.inject(OnlyAdminAllowService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
