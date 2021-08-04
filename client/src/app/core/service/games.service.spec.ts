import { TestBed } from '@angular/core/testing';

import { GamesService } from './games.service';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { GetGameWordsRequestModel } from '../models/get-game-words-request.model';

describe('GamesService', () => {
  let service: GamesService;
  let httpClientSpy: {
    post: jasmine.Spy;
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
    });
    service = TestBed.inject(GamesService);
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['post']);
    // tslint:disable-next-line:no-any
    service = new GamesService(httpClientSpy as any);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call getBooks API when getBooks() method hit', () => {
    const expectedForm = {
      defaultBaseLanguage: 1,
      count: 1,
      chapterId: 1,
      bookId: 1,
      defaultTargetLanguage: 1,
    } as GetGameWordsRequestModel;

    service.getGameWords(expectedForm);

    console.log(service.gameUrl);
    expect(httpClientSpy.post).toHaveBeenCalledWith(
      `${service.gameUrl}/get-words-for-game`,
      expectedForm
    );
  });

  it('should call http.post when getGameCountWords() method hit', () => {
    const expectedForm = {
      defaultBaseLanguage: 1,
      count: 1,
      chapterId: 1,
      bookId: 1,
      defaultTargetLanguage: 1,
    } as GetGameWordsRequestModel;

    service.getGameCountWords(expectedForm);

    expect(httpClientSpy.post).toHaveBeenCalledWith(
      `${service.gameUrl}/get-words-count-for-game`,
      expectedForm
    );
  });
});
