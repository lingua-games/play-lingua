import { TestBed } from '@angular/core/testing';

import { WordManagementService } from './word-management.service';
import { AddWordFormModel } from '../models/add-word-form.model';
import { BookModel } from '../models/book.model';
import { ChapterModel } from '../models/chapter.model';

describe('WordManagementService', () => {
  let service: WordManagementService;
  let httpClientSpy: {
    get: jasmine.Spy;
    post: jasmine.Spy;
    put: jasmine.Spy;
    delete: jasmine.Spy;
  };

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', [
      'get',
      'post',
      'delete',
      'put',
    ]);

    // tslint:disable-next-line:no-any
    service = new WordManagementService(httpClientSpy as any);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call getBooks API when getBooks() method hit', () => {
    const expectedForm: AddWordFormModel = {
      words: [],
      isRandom: 'true',
      book: {} as BookModel,
      chapter: {} as ChapterModel,
      targetLanguage: 1,
      baseLanguage: 1,
    };

    service.submitForm(expectedForm);

    expect(httpClientSpy.post).toHaveBeenCalled();
  });
});
