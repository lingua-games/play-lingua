import { TestBed } from '@angular/core/testing';
import { BasicInformationService } from './basic-information.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { BookModel } from '../models/book.model';
import { GameNameEnum } from '../models/game-name.enum';

describe('BasicInformationService', () => {
  let service: BasicInformationService;
  let httpClientSpy: {
    get: jasmine.Spy;
    post: jasmine.Spy;
    put: jasmine.Spy;
    delete: jasmine.Spy;
  };
  let sanitizerSpy: {
    bypassSecurityTrustHtml: jasmine.Spy;
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
    });
    httpClientSpy = jasmine.createSpyObj('HttpClient', [
      'get',
      'post',
      'delete',
      'put',
    ]);

    sanitizerSpy = jasmine.createSpyObj('DomSanitizer', [
      'bypassSecurityTrustHtml',
    ]);
    // tslint:disable-next-line:no-any
    service = new BasicInformationService(
      // tslint:disable-next-line:no-any
      httpClientSpy as any,
      // tslint:disable-next-line:no-any
      sanitizerSpy as any
    );
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call submitForm API when submitForm() method hit', () => {
    service.getBooks();

    expect(httpClientSpy.get).toHaveBeenCalled();
  });

  it('should call addBook API when addBook() method hit', () => {
    const mockBook: BookModel = {
      id: 1,
      baseLanguageId: 1,
      targetLanguageId: 1,
      name: '',
    };

    service.addBook(mockBook);

    expect(httpClientSpy.post).toHaveBeenCalled();
  });

  it('should call deleteBook API when deleteBook() method hit', () => {
    service.deleteBook(1);

    expect(httpClientSpy.delete).toHaveBeenCalled();
  });

  it('should call addBook API when addBook() method hit', () => {
    const mockBook: BookModel = {
      id: 1,
      baseLanguageId: 1,
      targetLanguageId: 1,
      name: '',
    };

    service.editBook(mockBook);

    expect(httpClientSpy.put).toHaveBeenCalled();
  });

  it('should call getAllLanguages API when getAllLanguages() method hit', () => {
    service.getAllLanguages();

    expect(httpClientSpy.get).toHaveBeenCalled();
  });

  it('should return array of menus when calling getGameMenus', () => {
    expect(service.getGameMenus().length).toBeGreaterThan(0);
  });
});
