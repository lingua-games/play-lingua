import { TestBed } from '@angular/core/testing';

import { OnlyNotSignedAllowService } from './only-not-signed-allow.service';

describe('OnlyNotSignedAllowService', () => {
  let service: OnlyNotSignedAllowService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OnlyNotSignedAllowService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
