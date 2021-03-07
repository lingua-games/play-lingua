import { TestBed } from '@angular/core/testing';

import { UserAndGuestAllowService } from './user-and-guest-allow.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MatDialog } from '@angular/material/dialog';
import { SecurityService } from '../security.service';
import { Router } from '@angular/router';

describe('UserAndGuestAllowService', () => {
  let service: UserAndGuestAllowService;
  let mockSecurityService;
  beforeEach(() => {
    mockSecurityService = jasmine.createSpyObj(['isLoggedIn', 'isGuest']);
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
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
    service = TestBed.inject(UserAndGuestAllowService);
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

  it('should return true if it is guest', () => {
    mockSecurityService.isGuest.and.callFake(() => {
      return true;
    });

    expect(service.canActivate()).toBe(true);
  });

  it('should return false if user is NOT logged in and also it is not guest', () => {
    mockSecurityService.isLoggedIn.and.callFake(() => {
      return false;
    });
    mockSecurityService.isGuest.and.callFake(() => {
      return false;
    });

    expect(service.canActivate()).toBe(false);
  });
});
