import { TestBed } from '@angular/core/testing';

import { HasResetPasswordTokenService } from './has-reset-password-token.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MatDialog } from '@angular/material/dialog';
import { SecurityService } from '../security.service';

describe('HasResetPasswordTokenService', () => {
  let service: HasResetPasswordTokenService;
  let mockSecurityService;

  beforeEach(() => {
    mockSecurityService = jasmine.createSpyObj(['getTokenInformation']);

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [
        {
          provide: SecurityService,
          useValue: mockSecurityService,
        },
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

  it('should return true if user must reset his password', () => {
    mockSecurityService.getTokenInformation.and.returnValue({
      needsResetPassword: 'true',
    });

    expect(service.canActivate()).toBeTruthy();
  });
  it('should return false if needsResetPassword flag is undefined', () => {
    mockSecurityService.getTokenInformation.and.returnValue({
      needsResetPassword: undefined,
    });

    expect(service.canActivate()).toBeFalsy();
  });
});
