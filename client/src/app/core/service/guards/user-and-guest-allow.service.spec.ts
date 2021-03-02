import { TestBed } from '@angular/core/testing';

import { UserAndGuestAllowService } from './user-and-guest-allow.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MatDialog } from '@angular/material/dialog';

describe('UserAndGuestAllowService', () => {
  let service: UserAndGuestAllowService;

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
    service = TestBed.inject(UserAndGuestAllowService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
