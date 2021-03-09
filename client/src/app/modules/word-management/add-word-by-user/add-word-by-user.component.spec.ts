import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddWordByUserComponent } from './add-word-by-user.component';
import { NotificationService } from '../../../core/service/notification.service';
import { FormBuilder } from '@angular/forms';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { LocalStorageService } from '../../../core/service/local-storage.service';
import { of, throwError } from 'rxjs';
import { ChapterModel } from '../../../core/models/chapter.model';
import { BookChapterService } from '../../../core/service/book-chapter.service';
import { BookModel } from '../../../core/models/book.model';

describe('AddWordByUserComponent', () => {
  let component: AddWordByUserComponent;
  let fixture: ComponentFixture<AddWordByUserComponent>;
  let mockNotificationService;
  let mockMatDialog;
  let mockLocalStorageService;
  let mockBookChapterService;

  beforeEach(async(() => {
    mockNotificationService = jasmine.createSpyObj(['showMessage']);
    mockBookChapterService = jasmine.createSpyObj([
      'getChaptersByBookId',
      'getBooksByLanguage',
    ]);
    mockMatDialog = jasmine.createSpyObj('dialog', {
      open: {
        afterClosed: () => {
          return of();
        },
      },
    });
    mockLocalStorageService = jasmine.createSpyObj(['load']);
    TestBed.configureTestingModule({
      declarations: [AddWordByUserComponent],
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [
        {
          provide: BookChapterService,
          useValue: mockBookChapterService,
        },
        {
          provide: MatDialog,
          useValue: mockMatDialog,
        },
        {
          provide: NotificationService,
          useValue: mockNotificationService,
        },
        {
          provide: LocalStorageService,
          useValue: mockLocalStorageService,
        },
        FormBuilder,
      ],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddWordByUserComponent);
    component = fixture.componentInstance;
  });

  describe('onInit', () => {
    beforeEach(() => {
      mockLocalStorageService.load.and.callFake(() => {
        return '{"base": [], "target": []}';
      });

      fixture.detectChanges();
    });

    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should disable base and target languages when subscribe true', () => {
      spyOn(component.baseLanguage, 'disable');
      spyOn(component.targetLanguage, 'disable');
      component.isSelectedLanguageSubmit.setValue(true);

      expect(component.baseLanguage.disable).toHaveBeenCalled();
      expect(component.targetLanguage.disable).toHaveBeenCalled();
    });

    it('should enable base and target languages when subscribe false', () => {
      spyOn(component.baseLanguage, 'enable');
      spyOn(component.targetLanguage, 'enable');
      component.isSelectedLanguageSubmit.setValue(false);

      expect(component.baseLanguage.enable).toHaveBeenCalled();
      expect(component.targetLanguage.enable).toHaveBeenCalled();
    });
  });

  describe('checkDraft', () => {
    it('should return if there is nothing stored in local storage', () => {
      mockLocalStorageService.load.and.callFake(() => {
        return null;
      });

      const foo = component.checkDraft();

      expect(foo).toBe(undefined);
    });

    it('should set value for random if isRandom has random value', () => {
      mockLocalStorageService.load.and.callFake(() => {
        return '{"targetLanguage": [], "baseLanguage": [], "isRandom": "random"}';
      });

      component.checkDraft();

      expect(component.selectBookRandom.value).toBe('random');
    });

    it('should call getBooks isRandom does not have random value', () => {
      mockLocalStorageService.load.and.callFake(() => {
        return '{"targetLanguage": [], "baseLanguage": [], "isRandom": "something else"}';
      });
      spyOn(component, 'getBooks');

      component.checkDraft();

      expect(component.getBooks).toHaveBeenCalled();
    });

    it('should set chapter from draft into component property', () => {
      mockLocalStorageService.load.and.callFake(() => {
        return '{"targetLanguage": [], "baseLanguage": [], "isRandom": "something else", "chapter": "foo chapter", "book": "foo book"}';
      });
      mockBookChapterService.getChaptersByBookId.and.callFake(() => {
        return of([
          { id: 1, name: 'fake chapter' } as ChapterModel,
        ] as ChapterModel[]);
      });

      spyOn(component, 'getBooks');

      component.checkDraft();

      expect(component.chapter.value).toBe('foo chapter');
      expect(component.book.value).toBe('foo book');
    });
  });

  describe('bookSelectionChange', () => {
    it('should open dialog', () => {
      component.bookSelectionChange({ value: { id: -1 } });
      expect(mockMatDialog.open).toHaveBeenCalled();
    });

    it('should set book value into component.book after dialog close with response', () => {
      mockMatDialog.open.and.returnValue({
        afterClosed: () => {
          return of({ bookName: 'foo book' });
        },
      });

      component.bookSelectionChange({ value: { id: -1 } });

      expect(component.book.value.name).toBe('foo book');
    });

    it('should clear component.book if dialog close without response', () => {
      mockMatDialog.open.and.returnValue({
        afterClosed: () => {
          return of(null);
        },
      });

      component.bookSelectionChange({ value: { id: -1 } });

      expect(component.book.value).toBe('');
    });
  });

  describe('getChapters', () => {
    it('should set chapters array if bookId is zero', () => {
      component.getChapters(0);
      expect(component.chapters[0].id).toBe(-1);
    });

    it('should push fetched chapters from API into component chapters array', () => {
      mockBookChapterService.getChaptersByBookId.and.callFake(() => {
        return of([
          { id: 1, name: 'fake chapter' } as ChapterModel,
        ] as ChapterModel[]);
      });

      component.getChapters(1);

      expect(component.chapters[1].name).toBe('fake chapter');
    });
  });

  describe('chapterSelectionChange', () => {
    it('should open dialog', () => {
      component.chapterSelectionChange({ value: { id: -1 } });
      expect(mockMatDialog.open).toHaveBeenCalled();
    });

    it('should push added chapter from dialog into component.chapter array', () => {
      mockMatDialog.open.and.callFake(() => {
        return {
          afterClosed: () => of({ chapterName: 'fake chapter name' }),
        };
      });

      component.chapterSelectionChange({ value: { id: -1 } });

      expect(component.chapter.value.name).toBe('fake chapter name');
    });

    it('should clear chapter if user close dialog without adding any chapter', () => {
      mockMatDialog.open.and.callFake(() => {
        return {
          afterClosed: () => of(null),
        };
      });

      component.chapterSelectionChange({ value: { id: -1 } });

      expect(component.chapter.value).toBe('');
    });
  });

  describe('getBooks', () => {
    it('should push fetched books from API into component.books array', () => {
      mockBookChapterService.getBooksByLanguage.and.callFake(() => {
        return of([
          { id: 1, name: 'fake book name' } as BookModel,
        ] as BookModel[]);
      });

      component.getBooks();

      expect(component.books[1].name).toBe('fake book name');
    });

    it('should stop book loading if API failed', () => {
      mockBookChapterService.getBooksByLanguage.and.callFake(() => {
        return throwError('some errors');
      });

      component.getBooks();

      expect(component.isBookLoading).toBeFalse();
    });
  });

  it('should return form value for selectBookRandom', () => {
    component.selectBookForm.controls['selectBookRandom'].setValue('testValue');
    expect(component.selectBookRandom.value).toEqual('testValue');
  });

  it('should return form value for book', () => {
    component.selectBookForm.controls['book'].setValue('testValue');
    expect(component.book.value).toEqual('testValue');
  });

  it('should return form value for chapter', () => {
    component.selectBookForm.controls['chapter'].setValue('testValue');
    expect(component.chapter.value).toEqual('testValue');
  });
});
