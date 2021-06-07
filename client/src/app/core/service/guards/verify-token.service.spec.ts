import { TestBed } from '@angular/core/testing';

import { VerifyTokenService } from './verify-token.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MatDialog } from '@angular/material/dialog';

describe('VerifyTokenService', () => {
  let service: VerifyTokenService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [{ provide: MatDialog, useValue: {} }],
    });
    service = TestBed.inject(VerifyTokenService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
