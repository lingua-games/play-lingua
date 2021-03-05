import { TestBed } from '@angular/core/testing';
import { BookChapterService } from './book-chapter.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BookModel } from '../models/book.model';
import { AddWordFormModel } from '../models/add-word-form.model';
import { ChapterModel } from '../models/chapter.model';

describe('BookChapterService', () => {
  let service: BookChapterService;
  let httpClientSpy: {
    get: jasmine.Spy;
    post: jasmine.Spy;
    put: jasmine.Spy;
    delete: jasmine.Spy;
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    httpClientSpy = jasmine.createSpyObj('HttpClient', [
      'get',
      'post',
      'delete',
      'put',
    ]);
    // tslint:disable-next-line:no-any
    service = new BookChapterService(httpClientSpy as any);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call getBooks API when getBooks() method hit', () => {
    const expectedForm: AddWordFormModel = {
      words: [],
      isRandom: 'true',
      book: new BookModel(),
      chapter: new ChapterModel(),
      targetLanguage: 1,
      baseLanguage: 1,
    };

    service.submitForm(expectedForm);

    expect(httpClientSpy.post).toHaveBeenCalled();
  });

  it('should call getBooksByLanguage API when getBooksByLanguage() method hit', () => {
    service.getBooksByLanguage(1);
    expect(httpClientSpy.get).toHaveBeenCalled();
  });

  it('should call getBooksBySourceAndTargetLanguageId API when getBooksBySourceAndTargetLanguageId() method hit', () => {
    service.getBooksBySourceAndTargetLanguageId(1, 1);
    expect(httpClientSpy.get).toHaveBeenCalled();
  });

  it('should call getChaptersByBookId API when getChaptersByBookId() method hit', () => {
    service.getChaptersByBookId(1);
    expect(httpClientSpy.get).toHaveBeenCalled();
  });
});
