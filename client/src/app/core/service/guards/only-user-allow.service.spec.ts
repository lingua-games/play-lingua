import { TestBed } from '@angular/core/testing';

import { OnlyUserAllowService } from './only-user-allow.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatDialog } from '@angular/material/dialog';
import { SecurityService } from '../security.service';
import { Router } from '@angular/router';

describe('OnlyUserAllowService', () => {
  let service: OnlyUserAllowService;
  let mockSecurityService;
  beforeEach(() => {
    mockSecurityService = jasmine.createSpyObj(['isLoggedIn']);
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        {
          provide: MatDialog,
          useValue: {},
        },
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
    service = TestBed.inject(OnlyUserAllowService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return true if user is logged in', () => {
    mockSecurityService.isLoggedIn.and.callFake(() => {
      return true;
    });

    expect(service.canActivate()).toBe(true);
  });

  it('should return false if user is NOT logged in', () => {
    mockSecurityService.isLoggedIn.and.callFake(() => {
      return false;
    });
    expect(service.canActivate()).toBe(false);
  });
});
