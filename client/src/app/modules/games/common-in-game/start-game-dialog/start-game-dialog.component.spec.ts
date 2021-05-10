import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { StartGameDialogComponent } from './start-game-dialog.component';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {
  NotificationService,
  Severity,
} from '../../../../core/service/notification.service';
import { LocalStorageService } from '../../../../core/service/local-storage.service';
import { of, throwError } from 'rxjs';
import { GamesService } from '../../../../core/service/games.service';
import { Router } from '@angular/router';
import { WordKeyValueModel } from '../../../../core/models/word-key-value.model';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GameNameEnum } from '../../../../core/models/game-name.enum';
import { GameInformationInterface } from '../../../../core/models/game-information.interface';
import { InvitationService } from '../../../../core/service/invitation.service';
import { InvitationForm } from '../../../../core/models/invitation-form.interface';
import { BookModel } from '../../../../core/models/book.model';
import { ChapterModel } from '../../../../core/models/chapter.model';
import { LanguageModel } from '../../../../core/models/language.model';
import { GetGameWordsRequestModel } from '../../../../core/models/get-game-words-request.model';

describe('StartGameDialogComponent', () => {
  let component: StartGameDialogComponent;
  let fixture: ComponentFixture<StartGameDialogComponent>;
  let mockMatDialogRef;
  let mockNotificationService;
  let mockLocalStorageService;
  let mockGamesService;
  let mockInvitationService;
  beforeEach(
    waitForAsync(() => {
      mockInvitationService = jasmine.createSpyObj('invitationService', {
        getInvitation: () => of(),
        setAsOpen: () => of(),
      });
      mockNotificationService = jasmine.createSpyObj(['showMessage']);
      mockMatDialogRef = jasmine.createSpyObj(['close']);
      mockLocalStorageService = jasmine.createSpyObj('localStorageService', {
        load: `{ "defaultBaseLanguage": {}, "defaultTargetLanguage": {} }`,
      });

      mockGamesService = jasmine.createSpyObj(['getGameWords']);
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule, BrowserAnimationsModule],
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
            provide: InvitationService,
            useValue: mockInvitationService,
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
            provide: GamesService,
            useValue: mockGamesService,
          },
        ],
        schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(StartGameDialogComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    fixture.detectChanges();

    expect(component).toBeTruthy();
  });

  it('should set selectedOption to ranking if game is finished', () => {
    component.data = { isGameFinished: true } as GameInformationInterface;

    fixture.detectChanges();

    expect(component.selectedOption).toBe('ranking');
  });

  it('should call getInvitationInformation if it is feedback session', () => {
    component.data = { isFeedback: true } as GameInformationInterface;
    spyOn(component, 'getInvitationInformation');

    fixture.detectChanges();

    expect(component.getInvitationInformation).toHaveBeenCalled();
  });

  it('should call dialog close when backToMenu hits', () => {
    component.backToMenu();

    expect(mockMatDialogRef.close).toHaveBeenCalled();
  });

  it('should stop feedbackLoading after 1 second', () => {
    mockInvitationService.getInvitation.and.callFake(() => {
      return of({ uniqueKey: '' } as InvitationForm);
    });
    mockInvitationService.setAsOpen.and.callFake(() => {
      return of({ uniqueKey: '' } as InvitationForm);
    });

    component.data = {
      feedbackForm: {
        uniqueKey: 'test unique key',
      } as InvitationForm,
    } as GameInformationInterface;

    component.getInvitationInformation();

    expect(component.isFeedbackLoading).toBeFalsy();
  });

  it('should show notification if getInvitation API Fail', () => {
    mockInvitationService.getInvitation.and.callFake(() => {
      return throwError('I am error');
    });
    mockInvitationService.setAsOpen.and.callFake(() => {
      return of({ uniqueKey: '' } as InvitationForm);
    });
    component.data = {
      feedbackForm: {
        uniqueKey: 'test unique key',
      } as InvitationForm,
    } as GameInformationInterface;

    component.getInvitationInformation();

    expect(mockNotificationService.showMessage).toHaveBeenCalledWith(
      'Failed to get information, please try again',
      Severity.error
    );
  });

  it('should show message if submit hits but there is no word added yet with the session', () => {
    mockGamesService.getGameWords.and.callFake(() => {
      return of([]);
    });

    component.submit();

    expect(mockNotificationService.showMessage).toHaveBeenCalledWith(
      'No word has added with this condition yet',
      Severity.error
    );
  });

  it('should set result with feedbackForm if it is feedback and submit hits', () => {
    mockGamesService.getGameWords.and.callFake(() => {
      return of([]);
    });
    component.data = {
      isFeedback: true,
      feedbackForm: {
        book: { id: 1 } as BookModel,
        chapter: { id: 1 } as ChapterModel,
        targetLanguage: { id: 1 } as LanguageModel,
        baseLanguage: { id: 1 } as LanguageModel,
        count: 1,
      } as InvitationForm,
    } as GameInformationInterface;

    component.submit();

    expect(mockGamesService.getGameWords).toHaveBeenCalledWith({
      bookId: 1,
      chapterId: 1,
      count: 1,
      defaultBaseLanguage: 1,
      defaultTargetLanguage: 1,
    } as GetGameWordsRequestModel);
  });

  it('should call dialog.close once getGameWords service hits', () => {
    mockGamesService.getGameWords.and.callFake(() => {
      return of([{}] as WordKeyValueModel<string[]>[]);
    });

    jasmine.clock().uninstall();
    jasmine.clock().install();
    component.submit();
    jasmine.clock().tick(2005);

    expect(mockMatDialogRef.close).toHaveBeenCalled();
    jasmine.clock().uninstall();
  });

  it('should show notification if getGameWords API fail', () => {
    mockGamesService.getGameWords.and.callFake(() => {
      return throwError('I am error');
    });

    component.submit();

    expect(mockNotificationService.showMessage).toHaveBeenCalled();
  });

  it('should set selectedOption to help if showHelp if ON for Mario', () => {
    mockLocalStorageService.load.and.callFake(() => {
      return false;
    });
    component.data = {
      code: GameNameEnum.supperMario,
    } as GameInformationInterface;

    fixture.detectChanges();

    expect(component.selectedOption).toBe('start');
  });

  it('should set selectedOption to help if showHelp if OFF for Falling stars', () => {
    mockLocalStorageService.load.and.callFake(() => {
      return true;
    });
    component.data = {
      code: GameNameEnum.fallingStars,
    } as GameInformationInterface;

    fixture.detectChanges();

    expect(component.selectedOption).toBe('start');
  });

  it('should set selectedOption to help if showHelp if ON for Falling stars', () => {
    mockLocalStorageService.load.and.callFake(() => {
      return false;
    });
    component.data = {
      code: GameNameEnum.fallingStars,
    } as GameInformationInterface;

    fixture.detectChanges();

    expect(component.selectedOption).toBe('start');
  });

  it('should set selectedOption with 100ms timeOut when calling showSection', () => {
    jasmine.clock().uninstall();
    jasmine.clock().install();

    component.showSection('foo');
    jasmine.clock().tick(100);

    expect(component.selectedOption).toBe('foo');
    jasmine.clock().uninstall();
  });

  it('should set hoveredOption to the overed item on showHover', () => {
    component.selectedOption = 'foo option';
    expect(component.showHover('foo option')).toBeUndefined();

    component.showHover('foo option 1');
    expect(component.hoveredOption).toBe('foo option 1');
  });
});
