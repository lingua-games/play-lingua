import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheatSheetComponent } from './cheat-sheet.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GamesService } from '../../service/games.service';
import { of, throwError } from 'rxjs';
import { LocalStorageService } from '../../service/local-storage.service';
import {
  TranslateModel,
  WordKeyValueModel,
} from '../../models/word-key-value.model';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { GameInformationInterface } from '../../models/game-information.interface';
import { GetGameWordsRequestModel } from '../../models/get-game-words-request.model';

describe('CheatSheetComponent', () => {
  let component: CheatSheetComponent;
  let fixture: ComponentFixture<CheatSheetComponent>;
  let mockGamesService;
  let mockLocalStorageService;

  beforeEach(async () => {
    mockGamesService = jasmine.createSpyObj(['getGameWords']);
    mockLocalStorageService = jasmine.createSpyObj('localStorageService', {
      load: `{ "defaultBaseLanguage": {}, "defaultTargetLanguage": {} }`,
    });
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, BrowserAnimationsModule],
      declarations: [CheatSheetComponent],
      providers: [
        {
          provide: GamesService,
          useValue: mockGamesService,
        },
        {
          provide: GamesService,
          useValue: mockGamesService,
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
    fixture = TestBed.createComponent(CheatSheetComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    spyOn(component, 'getWords');

    fixture.detectChanges();

    expect(component).toBeTruthy();
  });

  it('should call getWords in initial time', () => {
    spyOn(component, 'getWords');

    fixture.detectChanges();

    expect(component.getWords).toHaveBeenCalled();
  });

  describe('getWords', () => {
    it('should call getGameWords service when', () => {
      mockGamesService.getGameWords.and.callFake(() => {
        return of([]);
      });
      spyOn(component.words, 'setLoading');

      component.getWords();

      expect(mockGamesService.getGameWords).toHaveBeenCalled();
    });

    it('should stop loading if getGameWords return error', () => {
      mockGamesService.getGameWords.and.callFake(() => {
        return throwError('fake error');
      });
      spyOn(component.words, 'setLoading');

      component.getWords();

      expect(component.words.setLoading).toHaveBeenCalledWith(false);
    });

    it('should set data into words if api return value successfully', () => {
      mockGamesService.getGameWords.and.callFake(() => {
        return of([{ key: 'fake key' } as WordKeyValueModel<TranslateModel[]>]);
      });
      spyOn(component.words, 'setLoading');
      spyOn(component.words, 'setData');

      component.getWords();

      expect(component.words.setData).toHaveBeenCalledWith([
        { key: 'fake key' } as WordKeyValueModel<TranslateModel[]>,
      ]);
    });

    it('should set feedback form values if its feedback session', () => {
      mockGamesService.getGameWords.and.callFake(() => {
        return of([{ key: 'fake key' } as WordKeyValueModel<TranslateModel[]>]);
      });
      component.data = {
        isFeedback: true,
        feedbackForm: {
          count: 100,
          targetLanguage: { id: 50 },
          baseLanguage: { id: 60 },
        },
      } as GameInformationInterface;

      const serviceInput = {
        bookId: undefined,
        chapterId: undefined,
        count: 100,
        defaultTargetLanguage: 50,
        defaultBaseLanguage: 60,
      } as GetGameWordsRequestModel;

      component.getWords();

      expect(mockGamesService.getGameWords).toHaveBeenCalledWith(serviceInput);
    });
  });
});
