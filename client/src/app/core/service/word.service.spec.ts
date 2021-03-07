import { TestBed } from '@angular/core/testing';
import { WordService } from './word.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';

describe('WordService', () => {
  let service: WordService;
  let httpClientSpy: {
    post: jasmine.Spy;
  };
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
    });
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['post', 'get', 'put']);
    // tslint:disable-next-line:no-any
    service = new WordService(httpClientSpy as any);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should post to wordUrl/inquiry-about-selected-language when getSelectedLanguagesInformation() hits', () => {
    service.getSelectedLanguagesInformation({ target: 1, base: 1 });
    expect(httpClientSpy.post).toHaveBeenCalled();
  });
});
