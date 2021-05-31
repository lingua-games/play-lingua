import { TestBed } from '@angular/core/testing';

import { HasResetPasswordTokenService } from './has-reset-password-token.service';

describe('HasResetPasswordTokenService', () => {
  let service: HasResetPasswordTokenService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HasResetPasswordTokenService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
