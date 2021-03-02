import { TestBed } from '@angular/core/testing';

import { UserAndGuestAllowService } from './user-and-guest-allow.service';

describe('UserAndGuestAllowService', () => {
  let service: UserAndGuestAllowService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserAndGuestAllowService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
