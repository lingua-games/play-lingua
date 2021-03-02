import { TestBed } from '@angular/core/testing';

import { OnlyUserAllowService } from './only-user-allow.service';

describe('OnlyUserAllowService', () => {
  let service: OnlyUserAllowService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OnlyUserAllowService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
