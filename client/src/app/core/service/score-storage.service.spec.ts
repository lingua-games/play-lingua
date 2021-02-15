import { TestBed } from '@angular/core/testing';

import { ScoreStorageService } from './score-storage.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('ScoreStorageService', () => {
  let service: ScoreStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(ScoreStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
