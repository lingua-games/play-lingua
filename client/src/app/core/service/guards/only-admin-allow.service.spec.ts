import { TestBed } from '@angular/core/testing';

import { OnlyAdminAllowService } from './only-admin-allow.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MaterialModule } from '../../../modules/common/material/material.module';
import { SecurityService } from '../security.service';
import { Router } from '@angular/router';

describe('OnlyAdminAllowService', () => {
  let service: OnlyAdminAllowService;
  let mockSecurityService;

  beforeEach(() => {
    mockSecurityService = jasmine.createSpyObj(['isAdmin']);
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
    service = TestBed.inject(OnlyAdminAllowService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return false if user is not admin when calling canActivate', () => {
    mockSecurityService.isAdmin.and.callFake(() => {
      return false;
    });
    expect(service.canActivate()).toBeFalsy();
  });

  it('should return true if user is admin when calling canActivate', () => {
    mockSecurityService.isAdmin.and.callFake(() => {
      return true;
    });
    expect(service.canActivate()).toBeTruthy();
  });
});
