import { TestBed } from '@angular/core/testing';

import { OnlyAdminAllowService } from './only-admin-allow.service';

describe('OnlyAdminAllowService', () => {
  let service: OnlyAdminAllowService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OnlyAdminAllowService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
