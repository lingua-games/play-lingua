import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GameConfigComponent } from './game-config.component';
import { BookModel } from '../../models/book.model';
import { of, throwError } from 'rxjs';
import { BookChapterService } from '../../service/book-chapter.service';
import { ChapterModel } from '../../models/chapter.model';
import { LocalStorageService } from '../../service/local-storage.service';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { GameInformationInterface } from '../../models/game-information.interface';
import { GamesService } from '../../service/games.service';

describe('GameConfigComponent', () => {
  let component: GameConfigComponent;
  let fixture: ComponentFixture<GameConfigComponent>;
  let mockBookChapterService;
  let mockLocalStorageService;
  let mockGameService;

  beforeEach(async () => {
    mockBookChapterService = jasmine.createSpyObj([
      'getBooksBySourceAndTargetLanguageId',
      'getChaptersByBookId',
    ]);
    mockGameService = jasmine.createSpyObj('gameService', {
      getGameCountWords: of(11),
    });
    mockLocalStorageService = jasmine.createSpyObj('localStorageService', {
      load: `{ "defaultBaseLanguage": {}, "defaultTargetLanguage": {} }`,
    });

    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [GameConfigComponent],
      providers: [
        {
          provide: BookChapterService,
          useValue: mockBookChapterService,
        },
        {
          provide: LocalStorageService,
          useValue: mockLocalStorageService,
        },
        {
          provide: GamesService,
          useValue: mockGameService,
        },
      ],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GameConfigComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    mockBookChapterService.getBooksBySourceAndTargetLanguageId.and.callFake(
      () => {
        return of([]);
      }
    );

    fixture.detectChanges();

    expect(component).toBeTruthy();
  });

  it('should call submitEmitter.emit if keyDownEvent fire with Enter key', () => {
    spyOn(component.submitEmitter, 'emit');

    component.keyDownEvent({ code: 'NumpadEnter' } as KeyboardEvent);

    expect(component.submitEmitter.emit).toHaveBeenCalledOnceWith(
      component.form
    );
  });

  it('should set books into books array after calling getBooks API', () => {
    component.books = [];
    const fakeBookList = [{ id: 1, name: 'someName' } as BookModel];
    mockBookChapterService.getBooksBySourceAndTargetLanguageId.and.callFake(
      () => {
        return of(fakeBookList);
      }
    );

    fixture.detectChanges();

    expect(component.books[1]).toEqual(fakeBookList[0]);
  });

  it('should break getBooks method if defaultLanguages array is empty', () => {
    component.defaultLanguages = undefined;

    component.getBooks();

    expect(component.bookListLoading).toBe(false);
  });

  it('should handle error when getBooks API fail', () => {
    mockBookChapterService.getBooksBySourceAndTargetLanguageId.and.callFake(
      () => {
        return throwError('some errors');
      }
    );

    fixture.detectChanges();

    expect(component.bookListLoading).toBeFalsy();
  });

  it('should break getChapters if bookId is null', () => {
    expect(component.getChapters({ id: 0 } as BookModel)).toBeUndefined();
  });

  it('should return chapters when getChapters hits', () => {
    component.chapters = [];

    const fakeChapterList = [{ id: 1, name: 'someName' } as ChapterModel];
    mockBookChapterService.getChaptersByBookId.and.callFake(() => {
      return of(fakeChapterList);
    });

    component.getChapters({ id: 1 } as BookModel);

    expect(component.chapters[1]).toEqual(fakeChapterList[0]);
  });

  it('should stop loading if getChapter API fail', () => {
    component.chapters = [];

    mockBookChapterService.getChaptersByBookId.and.callFake(() => {
      return throwError('some errors');
    });

    component.getChapters({ id: 1 } as BookModel);

    expect(component.chapterListLoading).toBeFalsy();
  });

  describe('getGameCountWords', () => {
    it('should call getGameCountWords with feedbackForm if its feedback session', () => {
      component.data = {
        isFeedback: true,
        feedbackForm: {
          book: { id: 55 },
          chapter: { id: 44 },
          targetLanguage: { id: 22 },
          baseLanguage: { id: 11 },
        },
      } as GameInformationInterface;

      component.getGameCountWords();

      expect(component);
    });

    it('should fill wordCount with getGameCountWords service value', () => {
      mockGameService.getGameCountWords.and.returnValue(of(100));
      spyOn(component.wordCount, 'setData');

      component.getGameCountWords();

      expect(component.wordCount.setData).toHaveBeenCalledWith(100);
    });
  });
});
