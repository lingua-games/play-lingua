import { TestBed } from '@angular/core/testing';

import { ScoreStorageService } from './score-storage.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ScoreStoreInterface } from '../models/score-store.interface';

describe('ScoreStorageService', () => {
  let service: ScoreStorageService;
  let httpClientSpy: {
    post: jasmine.Spy;
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['post']);
    // tslint:disable-next-line:no-any
    service = new ScoreStorageService(httpClientSpy as any);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call storeScoreApi API when storeScore() method hit', () => {
    const mockBook: ScoreStoreInterface = {} as ScoreStoreInterface;

    service.storeScore(mockBook);

    expect(httpClientSpy.post).toHaveBeenCalled();
  });

  it('should increase cachedScore once catchScores() method hit', () => {
    service.cachedScore = 10;

    service.catchScores(10);

    expect(service.cachedScore).toBe(20);
  });

  it('should round the score when getCachedScores hits', () => {
    service.cachedScore = 1.123456;
    expect(service.getCachedScores()).toBe(1.1);
  });
});
