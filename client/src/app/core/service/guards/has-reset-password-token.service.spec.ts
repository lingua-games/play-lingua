import { TestBed } from '@angular/core/testing';

import { HasResetPasswordTokenService } from './has-reset-password-token.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MatDialog } from '@angular/material/dialog';

describe('HasResetPasswordTokenService', () => {
  let service: HasResetPasswordTokenService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [
        {
          provide: MatDialog,
          useValue: {},
        },
      ],
    });
    service = TestBed.inject(HasResetPasswordTokenService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
