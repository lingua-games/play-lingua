import { WordManagementService } from './word-management.service';
import { AddWordFormModel } from '../models/add-word-form.model';
import { BookModel } from '../models/book.model';
import { ChapterModel } from '../models/chapter.model';
import { WordOverviewsModel } from '../models/word-overviews.model';

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

    expect(httpClientSpy.post).toHaveBeenCalledWith(
      `${service.wordUrl}/submit-word-series`,
      expectedForm
    );
  });

  it('should call post when editForm() method hit', () => {
    const expectedForm = {
      words: [],
      isRandom: 'true',
      book: {} as BookModel,
      chapter: {} as ChapterModel,
      targetLanguage: 1,
      baseLanguage: 1,
    } as AddWordFormModel;

    service.editForm(expectedForm);

    expect(httpClientSpy.post).toHaveBeenCalledWith(
      `${service.wordUrl}/edit-word-series`,
      expectedForm
    );
  });

  it('should call get when getWordOverviews() method hit', () => {
    service.getWordOverviews();

    expect(httpClientSpy.get).toHaveBeenCalledWith(
      `${service.wordUrl}/get-word-overviews`
    );
  });

  it('should call post when getWordDetails() method hit', () => {
    const expectedForm = {
      bookId: 100,
    } as WordOverviewsModel;

    service.getWordDetails(expectedForm);

    expect(httpClientSpy.post).toHaveBeenCalledWith(
      `${service.wordUrl}/get-word-details`,
      expectedForm
    );
  });
});
