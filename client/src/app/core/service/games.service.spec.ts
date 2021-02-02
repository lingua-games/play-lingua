import { TestBed } from '@angular/core/testing';

import { GamesService } from './games.service';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('GamesService', () => {
  let service: GamesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
    });
    service = TestBed.inject(GamesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
