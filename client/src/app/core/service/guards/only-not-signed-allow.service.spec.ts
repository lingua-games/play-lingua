import { TestBed } from '@angular/core/testing';

import { OnlyNotSignedAllowService } from './only-not-signed-allow.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MaterialModule } from '../../../modules/common/material/material.module';
import { MatDialog } from '@angular/material/dialog';
import { SecurityService } from '../security.service';
import { Router } from '@angular/router';
import { computeStartOfLinePositions } from '@angular/compiler-cli/src/ngtsc/sourcemaps/src/source_file';

describe('OnlyNotSignedAllowService', () => {
  let service: OnlyNotSignedAllowService;
  let mockSecurityService;

  beforeEach(() => {
    mockSecurityService = jasmine.createSpyObj(['isLoggedIn']);
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule, MaterialModule],
      providers: [
        {
          provide: SecurityService,
          useValue: mockSecurityService,
        },
        {
          provide: Router,
          useValue: {
            url: 'choose-languages',
            navigate: jasmine
              .createSpy('navigate')
              .and.returnValue(Promise.resolve()),
          },
        },
      ],
    });
    service = TestBed.inject(OnlyNotSignedAllowService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return true if user is not logged in when calling canActivate', () => {
    mockSecurityService.isLoggedIn.and.callFake(() => {
      return { success: false };
    });
    expect(service.canActivate()).toBeTruthy();
  });

  it('should return false if user is logged in when calling canActivate', () => {
    mockSecurityService.isLoggedIn.and.callFake(() => {
      return { success: true };
    });
    expect(service.canActivate()).toBeFalse();
  });
});
