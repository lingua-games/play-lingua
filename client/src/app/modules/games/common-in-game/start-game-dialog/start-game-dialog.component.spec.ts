import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StartGameDialogComponent } from './start-game-dialog.component';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NotificationService } from '../../../../core/service/notification.service';
import { LocalStorageService } from '../../../../core/service/local-storage.service';
import { BookChapterService } from '../../../../core/service/book-chapter.service';
import { of, throwError } from 'rxjs';
import { BookModel } from '../../../../core/models/book.model';
import { ChapterModel } from '../../../../core/models/chapter.model';
import { GamesService } from '../../../../core/service/games.service';
import { Router } from '@angular/router';
import { WordKeyValueModel } from '../../../../core/models/word-key-value.model';

describe('StartGameDialogComponent', () => {
  let component: StartGameDialogComponent;
  let fixture: ComponentFixture<StartGameDialogComponent>;
  let mockMatDialogRef;
  let mockNotificationService;
  let mockLocalStorageService;
  let mockBookChapterService;
  let mockGameService;
  beforeEach(async(() => {
    mockNotificationService = jasmine.createSpyObj(['showMessage']);
    mockMatDialogRef = jasmine.createSpyObj(['close']);
    mockLocalStorageService = jasmine.createSpyObj('localStorageService', {
      load: `{ "defaultBaseLanguage": {}, "defaultTargetLanguage": {} }`,
    });
    mockBookChapterService = jasmine.createSpyObj([
      'getBooksBySourceAndTargetLanguageId',
      'getChaptersByBookId',
    ]);
    mockGameService = jasmine.createSpyObj(['getGameWords']);
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [StartGameDialogComponent],
      providers: [
        {
          provide: Router,
          useValue: {
            navigate: jasmine
              .createSpy('navigate')
              .and.returnValue(Promise.resolve()),
          },
        },
        {
          provide: MatDialogRef,
          useValue: mockMatDialogRef,
        },
        {
          provide: MAT_DIALOG_DATA,
          useValue: { '': '' },
        },
        {
          provide: NotificationService,
          useValue: mockNotificationService,
        },
        {
          provide: LocalStorageService,
          useValue: mockLocalStorageService,
        },
        {
          provide: BookChapterService,
          useValue: mockBookChapterService,
        },
        {
          provide: GamesService,
          useValue: mockGameService,
        },
      ],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StartGameDialogComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    mockBookChapterService.getBooksBySourceAndTargetLanguageId.and.callFake(
      () => {
        return of();
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

    expect(2).toBe(2);
  });

  it('should return chapters when getChapters hits', () => {
    component.chapters = [];
    const fakeChapterList = [{ id: 1, name: 'someName' } as ChapterModel];
    mockBookChapterService.getChaptersByBookId.and.callFake(() => {
      return of(fakeChapterList);
    });

    component.getChapters({} as BookModel);

    expect(component.chapters[1]).toEqual(fakeChapterList[0]);
  });

  it('should call dialog close when backToMenu hits', () => {
    component.backToMenu();

    expect(mockMatDialogRef.close).toHaveBeenCalled();
  });

  it('should call dialog.close once getGameWords service hits', () => {
    mockGameService.getGameWords.and.callFake(() => {
      return of([{}] as WordKeyValueModel<string[]>[]);
    });

    component.submit();

    expect(mockMatDialogRef.close).toHaveBeenCalled();
  });

  it('should show notification if getGameWords API fail', () => {
    mockGameService.getGameWords.and.callFake(() => {
      return throwError('I am error');
    });

    component.submit();

    expect(mockNotificationService.showMessage).toHaveBeenCalled();
  });
});
