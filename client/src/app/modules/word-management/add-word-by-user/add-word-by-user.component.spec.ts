import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddWordByUserComponent } from './add-word-by-user.component';
import {
  NotificationService,
  Severity,
} from '../../../core/service/notification.service';
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
import {
  SourceTargetModel,
  WordToAddModel,
} from '../../../core/models/word-to-add.model';
import { AddWordFormModel } from '../../../core/models/add-word-form.model';
import { Router } from '@angular/router';

describe('AddWordByUserComponent', () => {
  let component: AddWordByUserComponent;
  let fixture: ComponentFixture<AddWordByUserComponent>;
  let mockNotificationService;
  let mockMatDialog;
  let mockLocalStorageService;
  let mockBookChapterService;

  beforeEach(
    waitForAsync(() => {
      mockNotificationService = jasmine.createSpyObj(['showMessage']);
      mockBookChapterService = jasmine.createSpyObj([
        'getChaptersByBookId',
        'getBooksByLanguage',
        'submitForm',
      ]);
      mockMatDialog = jasmine.createSpyObj('dialog', {
        open: {
          afterClosed: () => {
            return of();
          },
        },
      });
      mockLocalStorageService = jasmine.createSpyObj([
        'load',
        'delete',
        'save',
      ]);
      TestBed.configureTestingModule({
        declarations: [AddWordByUserComponent],
        imports: [HttpClientTestingModule, RouterTestingModule],
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
    })
  );

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
      component.isSelectedLanguageSubmit?.setValue(true);

      expect(component.baseLanguage.disable).toHaveBeenCalled();
      expect(component.targetLanguage.disable).toHaveBeenCalled();
    });

    it('should enable base and target languages when subscribe false', () => {
      spyOn(component.baseLanguage, 'enable');
      spyOn(component.targetLanguage, 'enable');
      component.isSelectedLanguageSubmit?.setValue(false);

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
      component.bookSelectionChange({ value: { id: -1 } as BookModel });
      expect(mockMatDialog.open).toHaveBeenCalled();
    });

    it('should set book value into component.book after dialog close with response', () => {
      mockMatDialog.open.and.returnValue({
        afterClosed: () => {
          return of({ bookName: 'foo book' });
        },
      });

      component.bookSelectionChange({ value: { id: -1 } as BookModel });

      expect(component.book.value.name).toBe('foo book');
    });

    it('should clear component.book if dialog close without response', () => {
      mockMatDialog.open.and.returnValue({
        afterClosed: () => {
          return of(null);
        },
      });

      component.bookSelectionChange({ value: { id: -1 } as BookModel });

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
      component.chapterSelectionChange({ value: { id: -1 } as ChapterModel });
      expect(mockMatDialog.open).toHaveBeenCalled();
    });

    it('should push added chapter from dialog into component.chapter array', () => {
      mockMatDialog.open.and.callFake(() => {
        return {
          afterClosed: () => of({ chapterName: 'fake chapter name' }),
        };
      });

      component.chapterSelectionChange({ value: { id: -1 } as ChapterModel });

      expect(component.chapter.value.name).toBe('fake chapter name');
    });

    it('should clear chapter if user close dialog without adding any chapter', () => {
      mockMatDialog.open.and.callFake(() => {
        return {
          afterClosed: () => of(null),
        };
      });

      component.chapterSelectionChange({ value: { id: -1 } as ChapterModel });

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

  describe('submitSelectedBooks', () => {
    it('should show error if book is invalid', () => {
      component.selectBookRandom?.setValue('book');
      component.book.setErrors([]);

      component.submitSelectedBooks();

      expect(mockNotificationService.showMessage).toHaveBeenCalledWith(
        'Please select a book',
        Severity.error,
        '',
        'bc'
      );
    });

    it('should show error if chapter is invalid', () => {
      component.selectBookRandom?.setValue('book');
      component.book?.setValue('fake book');
      component.chapter?.setErrors([]);

      component.submitSelectedBooks();

      expect(mockNotificationService.showMessage).toHaveBeenCalledWith(
        'Please select a chapter',
        Severity.error,
        '',
        'bc'
      );
    });
  });

  describe('submitForm', () => {
    it('should show error if book is invalid', () => {
      component.book?.setErrors([]);
      component.selectBookRandom?.setValue('book');

      component.submitForm();

      expect(mockNotificationService.showMessage).toHaveBeenCalledWith(
        'Please select a book',
        Severity.error,
        '',
        'bc'
      );
    });

    it('should show error if chapter is invalid', () => {
      component.chapter.setErrors([]);
      component.selectBookRandom?.setValue('book');

      component.submitForm();

      expect(mockNotificationService.showMessage).toHaveBeenCalledWith(
        'Please select a chapter',
        Severity.error,
        '',
        'bc'
      );
    });

    it('should show error if no word selected in the form', () => {
      component.selectBookRandom?.setValue('something else');

      component.submitForm();

      expect(mockNotificationService.showMessage).toHaveBeenCalledWith(
        'You should at least add a word',
        Severity.error,
        '',
        'bc'
      );
    });

    it('should set all the words invalid in the form if target.value is null', () => {
      component.selectBookRandom?.setValue('something else');
      component.formData = {
        words: [
          {
            base: {},
            targets: [{}],
          } as WordToAddModel,
        ],
      } as AddWordFormModel;

      component.submitForm();

      expect(component.formData.words[0].base.isValid).toBe(false);
      expect(component.formData.words[0].targets[0].isValid).toBe(false);
    });

    it('should call saveInformationInfoForm', () => {
      component.selectBookRandom?.setValue('something else');
      component.formData = {
        words: [
          {
            base: { value: 'fakeBase', isValid: true },
            targets: [{ value: 'fakeTarget', isValid: true }],
          } as WordToAddModel,
        ],
      } as AddWordFormModel;
      spyOn(component, 'saveInformationInfoForm');
      mockBookChapterService.submitForm.and.callFake(() => {
        return of();
      });

      component.submitForm();

      expect(component.saveInformationInfoForm).toHaveBeenCalled();
    });

    it('should delete draft if API can store data into backend', () => {
      component.selectBookRandom?.setValue('something else');
      component.formData = {
        words: [
          {
            base: { value: 'fakeBase', isValid: true },
            targets: [{ value: 'fakeTarget', isValid: true }],
          } as WordToAddModel,
        ],
      } as AddWordFormModel;
      spyOn(component, 'saveInformationInfoForm');
      mockBookChapterService.submitForm.and.callFake(() => {
        return of({});
      });

      component.submitForm();

      expect(mockLocalStorageService.delete).toHaveBeenCalled();
    });

    it('should stop page loading ig API fail', () => {
      component.selectBookRandom?.setValue('something else');
      component.formData = {
        words: [
          {
            base: { value: 'fakeBase', isValid: true },
            targets: [{ value: 'fakeTarget', isValid: true }],
          } as WordToAddModel,
        ],
      } as AddWordFormModel;
      spyOn(component, 'saveInformationInfoForm');
      mockBookChapterService.submitForm.and.callFake(() => {
        return throwError('some errors');
      });

      component.submitForm();

      expect(component.isPageLoading).toBeFalse();
    });
  });

  it('should remove word from the form', () => {
    const words: WordToAddModel[] = [
      {
        targets: [
          { value: 'a' } as SourceTargetModel,
          { value: 'b' } as SourceTargetModel,
          { value: 'c' } as SourceTargetModel,
        ],
        base: { value: 'z' } as SourceTargetModel,
      },
      {
        targets: [
          { value: 'v' } as SourceTargetModel,
          { value: 'n' } as SourceTargetModel,
          { value: 'm' } as SourceTargetModel,
        ],
        base: { value: 't' } as SourceTargetModel,
      },
    ];

    component.formData.words = words;
    component.removeWordSeries(words[1]);

    expect(component.formData.words.indexOf(words[1])).toBe(-1);
  });

  it('should series of words and scroll down', () => {
    jasmine.clock().uninstall();
    jasmine.clock().install();
    component.formData = {
      words: [
        { targets: [{ value: 'foo' } as SourceTargetModel] } as WordToAddModel,
      ],
    } as AddWordFormModel;
    const el = { scrollTo: () => {} } as Element;
    component.addWordSeries(el);
    jasmine.clock().tick(2);

    expect(
      component.formData.words[component.formData.words.length - 1].base.value
    ).toBe('');

    jasmine.clock().uninstall();
  });

  it('should disable add target if target values is empty', () => {
    const word: WordToAddModel = {
      base: { value: 'fake base', isValid: true },
      targets: [{ value: '' } as SourceTargetModel],
    };

    expect(component.disableAddTarget(word)).toBeTrue();
  });

  it('should disable remove target if there is not target left', () => {
    const word: WordToAddModel = {
      base: { value: 'fake base', isValid: true },
      targets: [],
    };

    expect(component.disableRemoveTarget(word)).toBeTrue();
  });

  it('should return form value for selectBookRandom', () => {
    component.selectBookForm.controls['selectBookRandom']?.setValue(
      'testValue'
    );
    expect(component.selectBookRandom.value).toEqual('testValue');
  });

  it('should return form value for book', () => {
    component.selectBookForm.controls['book']?.setValue('testValue');
    expect(component.book.value).toEqual('testValue');
  });

  it('should return form value for chapter', () => {
    component.selectBookForm.controls['chapter']?.setValue('testValue');
    expect(component.chapter.value).toEqual('testValue');
  });

  it('should remove last target of the word', () => {
    const fakeWord: WordToAddModel = {
      targets: [
        { value: 'a' } as SourceTargetModel,
        { value: 'b' } as SourceTargetModel,
      ],
      base: { value: 'z' } as SourceTargetModel,
    };

    component.removeTargetWord(fakeWord);

    expect(fakeWord.targets.length).toBe(1);
  });

  it('should add empty target word', () => {
    const fakeWord: WordToAddModel = {
      targets: [
        { value: 'a' } as SourceTargetModel,
        { value: 'b' } as SourceTargetModel,
      ],
      base: { value: 'z' } as SourceTargetModel,
    };

    component.addTargetWord(fakeWord);

    expect(fakeWord.targets.length).toBe(3);
  });

  it('should save information into formData when saveInformationInfoForm hits', () => {
    component.saveInformationInfoForm();

    expect(component.formData.baseLanguage).toBe(component.baseLanguage.value);
    expect(component.formData.targetLanguage).toBe(
      component.targetLanguage.value
    );
    expect(component.formData.isRandom).toBe(component.selectBookRandom.value);
    expect(component.formData.book).toBe(component.book.value);
    expect(component.formData.chapter).toBe(component.chapter.value);
  });

  it('should save form information in localStorage when saveToDraft hits', () => {
    component.saveToDraft();

    expect(mockLocalStorageService.save).toHaveBeenCalled();
  });

  it('should show success notification when saveToDraft hits', () => {
    component.saveToDraft();

    expect(mockNotificationService.showMessage).toHaveBeenCalledWith(
      'Saved to draft',
      Severity.success,
      '',
      'bc'
    );
  });

  describe('submitSelectedLanguages', () => {
    it('should check isSelectedLanguageSubmit', () => {
      component.isSelectedLanguageSubmit?.setValue(true);

      component.submitSelectedLanguages();

      expect(component.isSelectedLanguageSubmit.value).toBe(false);
    });

    it('should show notification if selectedLanguageForm is invalid', () => {
      component.selectLanguageForm.setErrors([]);

      component.submitSelectedLanguages();

      expect(mockNotificationService.showMessage).toHaveBeenCalledWith(
        'Base language has not selected yet',
        Severity.error,
        '',
        'bc'
      );
    });

    it('should getBooks if selectLanguageForm is valid', () => {
      component.selectLanguageForm?.setValue({
        baseLanguage: 1,
        targetLanguage: 1,
        isSelectedLanguageSubmit: false,
      });
      spyOn(component, 'getBooks');

      component.submitSelectedLanguages();

      expect(component.getBooks).toHaveBeenCalled();
    });
  });

  it('should call addWordSeries when both of Ctrl and Enter are pressed', () => {
    spyOn(component, 'addWordSeries');
    component.isSelectedLanguageSubmit.setValue('something');

    component.keyDownEvent({ ctrlKey: true, key: 'Enter' } as KeyboardEvent);

    expect(component.addWordSeries).toHaveBeenCalled();
  });
});
