import { TestBed } from '@angular/core/testing';

import { OnlyUserAllowService } from './only-user-allow.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MatDialog } from '@angular/material/dialog';

describe('OnlyUserAllowService', () => {
  let service: OnlyUserAllowService;

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
    service = TestBed.inject(OnlyUserAllowService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
