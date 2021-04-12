import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameConfigComponent } from './game-config.component';
import { BookModel } from '../../models/book.model';
import { of, throwError } from 'rxjs';
import { BookChapterService } from '../../service/book-chapter.service';
import { ChapterModel } from '../../models/chapter.model';
import { LocalStorageService } from '../../service/local-storage.service';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';

describe('GameConfigComponent', () => {
  let component: GameConfigComponent;
  let fixture: ComponentFixture<GameConfigComponent>;
  let mockBookChapterService;
  let mockLocalStorageService;
  beforeEach(async () => {
    mockBookChapterService = jasmine.createSpyObj([
      'getBooksBySourceAndTargetLanguageId',
      'getChaptersByBookId',
    ]);
    mockLocalStorageService = jasmine.createSpyObj('localStorageService', {
      load: `{ "defaultBaseLanguage": {}, "defaultTargetLanguage": {} }`,
    });

    await TestBed.configureTestingModule({
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

  it('should handle error when getBooks API fail', () => {
    mockBookChapterService.getBooksBySourceAndTargetLanguageId.and.callFake(
      () => {
        return throwError('some errors');
      }
    );

    fixture.detectChanges();

    expect(component.bookListLoading).toBeFalsy();
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
});
