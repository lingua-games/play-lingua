import { TestBed } from '@angular/core/testing';

import { ScoreStorageService } from './score-storage.service';

describe('ScoreStorageService', () => {
  let service: ScoreStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ScoreStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
