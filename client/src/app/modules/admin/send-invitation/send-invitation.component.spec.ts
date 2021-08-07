import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SendInvitationComponent } from './send-invitation.component';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MessageService } from 'primeng/api';
import { of, throwError } from 'rxjs';
import { LanguageModel } from '../../../core/models/language.model';
import {
  NotificationService,
  Severity,
} from '../../../core/service/notification.service';
import { BasicInformationService } from '../../../core/service/basic-information.service';
import { BookModel } from '../../../core/models/book.model';
import { BookChapterService } from '../../../core/service/book-chapter.service';
import { InvitationForm } from '../../../core/models/invitation-form.interface';
import { ChapterModel } from '../../../core/models/chapter.model';
import { GameInformationInterface } from '../../../core/models/game-information.interface';
import { InvitationService } from '../../../core/service/invitation.service';
import { MatDialog } from '@angular/material/dialog';
import { UserModel } from '../../../core/models/user.model';

describe('SendInvitationComponent', () => {
  let component: SendInvitationComponent;
  let mockBookChapterService;
  let fixture: ComponentFixture<SendInvitationComponent>;
  let mockMessageService;
  let mockMatDialog;
  let mockBasicInformationService;
  let mockActivatedRouteWithGet;
  let mockNotificationService;
  let mockInvitationService;

  beforeEach(async () => {
    mockMatDialog = jasmine.createSpyObj('dialog', {
      open: {
        afterClosed: () => {
          return of();
        },
      },
    });
    mockBookChapterService = jasmine.createSpyObj([
      'getBooksBySourceAndTargetLanguageId',
      'getChaptersByBookId',
      'getBooksByLanguage',
    ]);
    mockInvitationService = jasmine.createSpyObj(['send', 'getUserList']);
    mockBasicInformationService = jasmine.createSpyObj(['getAllLanguages']);
    mockMessageService = jasmine.createSpyObj(['add']);
    mockNotificationService = jasmine.createSpyObj(['showMessage']);
    mockActivatedRouteWithGet = {
      snapshot: {
        paramMap: {
          get: () => {
            return 'edit';
          },
        },
      },
    };

    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [SendInvitationComponent],
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
          provide: InvitationService,
          useValue: mockInvitationService,
        },
        {
          provide: MessageService,
          useValue: mockMessageService,
        },
        {
          provide: BasicInformationService,
          useValue: mockBasicInformationService,
        },
        {
          provide: NotificationService,
          useValue: mockNotificationService,
        },
      ],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SendInvitationComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    spyOn(component, 'getLanguages');
    spyOn(component, 'getUserList');

    fixture.detectChanges();

    expect(component).toBeTruthy();
  });

  describe('getLanguages', () => {
    it('should set fill allLanguages with API result', () => {
      mockBasicInformationService.getAllLanguages.and.callFake(() => {
        return of([{ code: 'a' } as LanguageModel] as LanguageModel[]);
      });
      TestBed.compileComponents();
      fixture = TestBed.createComponent(SendInvitationComponent);
      component = fixture.componentInstance;

      component.getLanguages();

      expect(component.allLanguages.data[0].code).toBe('a');
    });

    it('should handle error when API fail', () => {
      mockBasicInformationService.getAllLanguages.and.callFake(() => {
        return throwError('some errors');
      });

      component.getLanguages();

      expect(mockNotificationService.showMessage).toHaveBeenCalledWith(
        'Failed to load languages',
        Severity.error
      );
      expect(component.allLanguages.isLoading).toBeFalse();
    });
  });

  describe('getBooks', () => {
    beforeEach(() => {
      component.form = {
        targetLanguage: { id: 1 } as LanguageModel,
        baseLanguage: { id: 1 } as LanguageModel,
      } as InvitationForm;
    });

    it('should break function if either target or base languages are empty', () => {
      const functionResult = component.getBooks({
        baseLanguage: null,
        targetLanguage: { id: 1 } as LanguageModel,
      });

      expect(functionResult).toBeUndefined();
    });

    it('should push fetched books from API into component.books array', () => {
      mockBookChapterService.getBooksByLanguage.and.callFake(() => {
        return of([
          { id: 1, name: 'fake book name' } as BookModel,
        ] as BookModel[]);
      });

      component.getBooks({
        baseLanguage: { id: 1 } as LanguageModel,
        targetLanguage: { id: 1 } as LanguageModel,
      });

      expect(component.books.data[0].name).toBe('fake book name');
    });

    it('should stop book loading if API failed', () => {
      mockBookChapterService.getBooksByLanguage.and.callFake(() => {
        return throwError('some errors');
      });

      component.getBooks({
        baseLanguage: { id: 1 } as LanguageModel,
        targetLanguage: { id: 1 } as LanguageModel,
      });

      expect(component.books.isLoading).toBeFalse();
    });
  });

  it('should return chapters when getChapters hits', () => {
    component.chapters.data = [];

    const fakeChapterList = [{ id: 1, name: 'someName' } as ChapterModel];
    mockBookChapterService.getChaptersByBookId.and.callFake(() => {
      return of(fakeChapterList);
    });

    component.getChapters(1);

    expect(component.chapters.data[0]).toEqual(fakeChapterList[0]);
  });

  it('should stop loading if getChapter API fail', () => {
    component.chapters.data = [];

    mockBookChapterService.getChaptersByBookId.and.callFake(() => {
      return throwError('some errors');
    });

    component.getChapters(1);

    expect(component.chapters.isLoading).toBeFalsy();
  });

  describe('isFormValid', () => {
    it('should return message if email is empty', () => {
      component.form = {
        email: '',
      } as InvitationForm;

      const functionResult = component.isFormValid();

      expect(mockNotificationService.showMessage).toHaveBeenCalledWith(
        'Email is empty',
        Severity.error
      );
      expect(functionResult).toBeFalsy();
    });

    it('should return message if baseLanguage is empty', () => {
      component.form = {
        baseLanguage: null,
      } as InvitationForm;

      const functionResult = component.isFormValid();

      expect(mockNotificationService.showMessage).toHaveBeenCalledWith(
        'Base language is empty',
        Severity.error
      );
      expect(functionResult).toBeFalsy();
    });

    it('should return message if targetLanguage is empty', () => {
      component.form = {
        targetLanguage: null,
      } as InvitationForm;

      const functionResult = component.isFormValid();

      expect(mockNotificationService.showMessage).toHaveBeenCalledWith(
        'Target language is empty',
        Severity.error
      );
      expect(functionResult).toBeFalsy();
    });

    it('should return message if gameObj is empty', () => {
      component.form = {
        gameObj: null,
      } as InvitationForm;

      const functionResult = component.isFormValid();

      expect(mockNotificationService.showMessage).toHaveBeenCalledWith(
        'Game is empty',
        Severity.error
      );
      expect(functionResult).toBeFalsy();
    });
  });

  describe('preview', () => {
    beforeEach(() => {
      component.form = {
        gameObj: { name: 'game name' } as GameInformationInterface,
        baseLanguage: { name: 'base name' } as LanguageModel,
        targetLanguage: { name: 'target name' } as LanguageModel,
        count: 10,
      } as InvitationForm;
    });
    it('should break if form is not valid', () => {
      spyOn(component, 'isFormValid').and.returnValue(false);
      expect(component.preview()).toBeUndefined();
    });

    it('should call generateLink and store its value into form.generatedLink', () => {
      spyOn(component, 'isFormValid').and.returnValue(true);
      spyOn(component, 'generateLink').and.returnValue('test value');

      component.preview();

      expect(component.form.generatedLink).toBe('test value');
    });

    it('should not include count into text if count is zero', () => {
      spyOn(component, 'isFormValid').and.returnValue(true);
      component.form.count = 0;

      component.preview();

      expect(
        component.form.generatedLink.indexOf(
          'In this session you will play only'
        )
      ).toBe(-1);
    });

    it('should call submit after closing dialog with res:true', () => {
      spyOn(component, 'isFormValid').and.returnValue(true);
      mockMatDialog.open.and.callFake(() => {
        return {
          afterClosed: () => of(true),
        };
      });
      spyOn(component, 'submit');

      component.preview();

      expect(component.submit).toHaveBeenCalled();
    });

    it('should NOT call submit after closing dialog with res:false', () => {
      spyOn(component, 'isFormValid').and.returnValue(true);
      mockMatDialog.open.and.callFake(() => {
        return {
          afterClosed: () => of(false),
        };
      });
      spyOn(component, 'submit');

      component.preview();

      expect(component.submit).not.toHaveBeenCalled();
    });
  });

  describe('submit', () => {
    it('should break if form is not valid', () => {
      spyOn(component, 'isFormValid');
      expect(component.submit()).toBeUndefined();
    });

    it('should push notification if API successfully call', () => {
      spyOn(component, 'isFormValid').and.returnValue(true);
      mockInvitationService.send.and.callFake(() => {
        return of({ game: 'test game' } as InvitationForm);
      });

      component.form = {
        gameObj: {
          gameNameForRanking: 'test name',
        } as GameInformationInterface,
      } as InvitationForm;

      component.submit();

      expect(mockNotificationService.showMessage).toHaveBeenCalledWith(
        'successful',
        Severity.success
      );
      expect(component.isFormLoading).toBeFalsy();
    });

    it('should push error notification if API fail', () => {
      spyOn(component, 'isFormValid').and.returnValue(true);
      mockInvitationService.send.and.callFake(() => {
        return throwError('I am error');
      });

      component.form = {
        gameObj: {
          gameNameForRanking: 'test name',
        } as GameInformationInterface,
      } as InvitationForm;

      component.submit();

      expect(mockNotificationService.showMessage).toHaveBeenCalledWith(
        'Failed to send invitation',
        Severity.error
      );
      expect(component.isFormLoading).toBeFalsy();
    });
  });

  describe('gameSelectionChange', () => {
    it('should set appropriate text for form.title', () => {
      const eventName = 'fake name';

      component.gameSelectionChange({
        name: eventName,
      } as GameInformationInterface);

      expect(component.form).toEqual({
        title: `PlayingLingua.com | ${eventName} feedback session`,
      } as InvitationForm);
    });
  });

  describe('getUserList', () => {
    it('should call userList.setData with service result', () => {
      const fakeServiceResult = [{ id: 1 } as UserModel];
      spyOn(component.userList, 'setLoading');
      spyOn(component.userList, 'setData');
      component.userList.data = fakeServiceResult;
      mockInvitationService.getUserList.and.callFake(() => {
        return of(fakeServiceResult);
      });

      component.getUserList();

      expect(component.userList.setData).toHaveBeenCalledWith(
        fakeServiceResult
      );
    });
    it('should call userList.setError if service fail', () => {
      const errorMessage = 'I am error';
      spyOn(component.userList, 'setLoading');
      spyOn(component.userList, 'setError');
      mockInvitationService.getUserList.and.callFake(() => {
        return throwError(errorMessage);
      });

      component.getUserList();

      expect(component.userList.setError).toHaveBeenCalledWith(errorMessage);
    });
  });

  describe('clearEmailSelection', () => {
    it('should set clear form.email', () => {
      component.clearEmailSelection();

      expect(component.form.email).toBe('');
    });
    it('should set clear form.playerName', () => {
      component.clearEmailSelection();

      expect(component.form.playerName).toBe('');
    });
  });

  describe('fillEmailAndDisplayName', () => {
    it('should set form.email with method param', () => {
      const expectedEmail = 'fake email';

      component.fillEmailAndDisplayName({ email: expectedEmail } as UserModel);

      expect(component.form.email).toBe(expectedEmail);
    });

    it('should set form.playerName  with method param', () => {
      const expectedPlayerName = 'fake playerName ';

      component.fillEmailAndDisplayName({
        email: expectedPlayerName,
      } as UserModel);

      expect(component.form.email).toBe(expectedPlayerName);
    });
  });
});
