import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { of } from 'rxjs';
import { FallingStarsWord } from '../../../core/models/falling-stars-word.interface';
import { FallingStarsComponent } from './falling-stars.component';
import { MatDialog } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Store } from '@ngrx/store';
import {
  SpeechStatus,
  TranslateModel,
  WordKeyValueModel,
} from '../../../core/models/word-key-value.model';
import { GameStartInformation } from '../../../core/models/game-start-information';
import { ActivatedRoute, Router } from '@angular/router';
import { ElementStyle } from '../../../core/models/element-style.model';
import { InvitationForm } from '../../../core/models/invitation-form.interface';
import { SecurityService } from '../../../core/service/security.service';

describe('FallingStarsComponent', () => {
  let component: FallingStarsComponent;
  let fixture: ComponentFixture<FallingStarsComponent>;
  let mockMatDialog;
  let mockStore;
  let sampleWords;
  let mockActivatedRoute;
  let mockRouter;
  let mockSecurityService;

  beforeEach(
    waitForAsync(() => {
      mockStore = jasmine.createSpyObj(['select', 'dispatch']);
      mockRouter = jasmine.createSpyObj('router', ['navigate']);
      sampleWords = [
        { key: 'Apple', value: ['appel'] },
        { key: 'Banana', value: ['banaan'] },
        { key: 'Orange', value: ['oranje'] },
        { key: 'Pineapple', value: ['ananas'] },
        { key: 'Cherry', value: ['kers'] },
      ];
      mockSecurityService = {
        isLoggedIn: { success: true } as { success: boolean; route: string },
      };
      mockActivatedRoute = {
        paramMap: of({
          get: () => {
            return 'invitation code';
          },
        }),
      };
      mockMatDialog = jasmine.createSpyObj('dialog', {
        open: {
          afterClosed: () => {
            return of(sampleWords);
          },
        },
      });
      TestBed.configureTestingModule({
        imports: [BrowserAnimationsModule, HttpClientTestingModule],
        declarations: [FallingStarsComponent],
        providers: [
          {
            provide: MatDialog,
            useValue: mockMatDialog,
          },
          {
            provide: SecurityService,
            useValue: mockSecurityService,
          },
          {
            provide: Router,
            useValue: mockRouter,
          },
          {
            provide: Store,
            useValue: mockStore,
          },
          {
            provide: ActivatedRoute,
            useValue: mockActivatedRoute,
          },
        ],
        schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(FallingStarsComponent);
    component = fixture.componentInstance;
  });

  describe('getAnswerSpeech', () => {
    it('should return speech information of the correct answer', () => {
      const methodOutput = component.getAnswerSpeech({
        correctShowingAnswer: 'word B',
        correctAnswers: [
          {
            value: 'word A',
            speechCode: 'fake speech code A',
            speechStatus: SpeechStatus.Success,
          } as TranslateModel,
          {
            value: 'word B',
            speechCode: 'fake speech code B',
            speechStatus: SpeechStatus.Success,
          } as TranslateModel,
          {
            value: 'word C',
            speechCode: 'fake speech code C',
            speechStatus: SpeechStatus.Success,
          } as TranslateModel,
        ],
      } as FallingStarsWord);

      expect(methodOutput).toEqual({
        code: 'fake speech code B',
        status: SpeechStatus.Success,
      });
    });
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('should call showStartDialog', () => {
      spyOn(component, 'showStartDialog');

      fixture.detectChanges();

      expect(component.showStartDialog).toHaveBeenCalled();
    });

    it('should fill uniqueKey into feedbackForm if its feedback session', () => {
      spyOn(component, 'showStartDialog');

      fixture.detectChanges();

      expect(component.feedbackForm).toEqual({
        uniqueKey: 'invitation code',
      } as InvitationForm);
    });
  });

  describe('isLoggedIn', () => {
    it('should return false if user is not logged in', () => {
      spyOn(mockSecurityService, 'isLoggedIn').and.returnValue({
        success: false,
      });
      expect(component.isLoggedIn()).toBeFalsy();
    });
  });

  describe('startGame', () => {
    it('should set animating of first word to true on startGame method', () => {
      spyOn(component, 'setGameWords').withArgs(sampleWords);
      component.words = [{ animating: false, style: {} } as FallingStarsWord];

      component.startGame();

      expect(component.words[0].animating).toBe(true);
    });

    it('should set blinking of first word to false', () => {
      jasmine.clock().uninstall();
      jasmine.clock().install();

      spyOn(component, 'setGameWords').withArgs(sampleWords);
      component.words = [{ animating: false, style: {} } as FallingStarsWord];

      component.startGame();
      jasmine.clock().tick(2000);

      expect(component.words[0].isBlinking).toBe(false);
      jasmine.clock().uninstall();
    });
  });

  it('getRandomNumber should return number smaller than 95', () => {
    const expectedValue = component.getRandomNumber();

    expect(expectedValue).toBeLessThan(96);
  });

  it('checkSelectedAnswer should call boxAnimationDone with active word', () => {
    component.words = [
      {
        animating: true,
        style: {},
        correctAnswers: [{ value: 'testValue' } as TranslateModel],
      } as FallingStarsWord,
    ];
    spyOn(component, 'boxAnimationDone');

    component.checkSelectedAnswer('testValue');

    expect(component.boxAnimationDone).toHaveBeenCalledWith(component.words[0]);
  });

  it('checkSelectedAnswer break if activeWord is blinking', () => {
    component.words = [
      {
        animating: true,
        style: {},
        isBlinking: true,
        correctAnswers: [{ value: 'testValue' } as TranslateModel],
      } as FallingStarsWord,
    ];
    spyOn(component, 'boxAnimationDone');

    component.checkSelectedAnswer('testValue');

    expect(component.boxAnimationDone).not.toHaveBeenCalledWith(
      component.words[0]
    );
  });

  describe('keyUpEvent', () => {
    it('should return if there is no word', () => {
      component.words = [];

      const something = component.keyUpEvent({} as KeyboardEvent);

      expect(something).toBe(undefined);
    });

    it('should play next star when user press Enter', () => {
      spyOn(component, 'playNextStar');
      component.words = [{ wrongCount: 1 } as FallingStarsWord];
      component.guidBoxShowing = true;

      component.keyUpEvent({ code: 'Enter' } as KeyboardEvent);

      expect(component.playNextStar).toHaveBeenCalled();
    });

    it('should break if a word is animating and user press Enter', () => {
      component.words = [{ animating: false } as FallingStarsWord];

      const something = component.keyUpEvent({
        code: '',
      } as KeyboardEvent);

      expect(something).toBe(undefined);
    });

    it('should call checkSelectedAnswer if user press number 1 keyword', () => {
      component.words = [{ animating: true } as FallingStarsWord];
      spyOn(component, 'checkSelectedAnswer');
      spyOn(component, 'getAnswers').and.returnValue([
        'num1',
        'num2',
        'num3',
        'num4',
      ]);
      spyOn(component, 'boxAnimationDone');

      component.keyUpEvent({
        code: 'Digit1',
      } as KeyboardEvent);

      expect(component.checkSelectedAnswer).toHaveBeenCalledWith('num1');

      component.keyUpEvent({
        code: 'Numpad1',
      } as KeyboardEvent);

      expect(component.checkSelectedAnswer).toHaveBeenCalledWith('num1');
    });

    it('should call checkSelectedAnswer if user press number 2 keyword', () => {
      component.words = [{ animating: true } as FallingStarsWord];
      spyOn(component, 'checkSelectedAnswer');
      spyOn(component, 'getAnswers').and.returnValue([
        'num1',
        'num2',
        'num3',
        'num4',
      ]);
      spyOn(component, 'boxAnimationDone');

      component.keyUpEvent({
        code: 'Digit2',
      } as KeyboardEvent);

      expect(component.checkSelectedAnswer).toHaveBeenCalledWith('num2');

      component.keyUpEvent({
        code: 'Numpad2',
      } as KeyboardEvent);

      expect(component.checkSelectedAnswer).toHaveBeenCalledWith('num2');
    });

    it('should call checkSelectedAnswer if user press number 3 keyword', () => {
      component.words = [{ animating: true } as FallingStarsWord];
      spyOn(component, 'checkSelectedAnswer');
      spyOn(component, 'getAnswers').and.returnValue([
        'num1',
        'num2',
        'num3',
        'num4',
      ]);
      spyOn(component, 'boxAnimationDone');

      component.keyUpEvent({
        code: 'Digit3',
      } as KeyboardEvent);

      expect(component.checkSelectedAnswer).toHaveBeenCalledWith('num3');

      component.keyUpEvent({
        code: 'Numpad3',
      } as KeyboardEvent);

      expect(component.checkSelectedAnswer).toHaveBeenCalledWith('num3');
    });

    it('should call checkSelectedAnswer if user press number 4 keyword', () => {
      component.words = [{ animating: true } as FallingStarsWord];
      spyOn(component, 'checkSelectedAnswer');
      spyOn(component, 'getAnswers').and.returnValue([
        'num1',
        'num2',
        'num3',
        'num4',
      ]);
      spyOn(component, 'boxAnimationDone');

      component.keyUpEvent({
        code: 'Digit4',
      } as KeyboardEvent);

      expect(component.checkSelectedAnswer).toHaveBeenCalledWith('num4');

      component.keyUpEvent({
        code: 'Numpad4',
      } as KeyboardEvent);

      expect(component.checkSelectedAnswer).toHaveBeenCalledWith('num4');
    });
  });

  describe('keyDownEvent', () => {
    it('should set pressed number to 1 if user pressed digit 1 keyword', () => {
      component.keyDownEvent({
        code: 'Digit1',
      } as KeyboardEvent);

      expect(component.pressedNumber).toBe(1);

      component.keyDownEvent({
        code: 'Numpad1',
      } as KeyboardEvent);

      expect(component.pressedNumber).toBe(1);
    });

    it('should set pressed number to 2 if user pressed digit 2 keyword', () => {
      component.keyDownEvent({
        code: 'Digit2',
      } as KeyboardEvent);

      expect(component.pressedNumber).toBe(2);

      component.keyDownEvent({
        code: 'Numpad2',
      } as KeyboardEvent);

      expect(component.pressedNumber).toBe(2);
    });

    it('should set pressed number to 3 if user pressed digit 3 keyword', () => {
      component.keyDownEvent({
        code: 'Digit3',
      } as KeyboardEvent);

      expect(component.pressedNumber).toBe(3);

      component.keyDownEvent({
        code: 'Numpad3',
      } as KeyboardEvent);

      expect(component.pressedNumber).toBe(3);
    });

    it('should set pressed number to 4 if user pressed digit 4 keyword', () => {
      component.keyDownEvent({
        code: 'Digit4',
      } as KeyboardEvent);

      expect(component.pressedNumber).toBe(4);

      component.keyDownEvent({
        code: 'Numpad4',
      } as KeyboardEvent);

      expect(component.pressedNumber).toBe(4);
    });

    it('should call showStarDialog if user press Escape button', () => {
      component.words = [{ animating: true } as FallingStarsWord];
      spyOn(component, 'showStartDialog');
      component.keyDownEvent({
        code: 'Escape',
      } as KeyboardEvent);

      expect(component.showStartDialog).toHaveBeenCalled();
    });
  });

  describe('showEndGameDialog', () => {
    it('should open dialog', () => {
      component.showEndGameDialog();

      expect(mockMatDialog.open).toHaveBeenCalled();
    });

    it('should call setGameWords when dialog close', () => {
      spyOn(component, 'setGameWords');
      mockMatDialog.open.and.callFake(() => {
        return {
          afterClosed: () =>
            of({ words: [{}, {}] } as GameStartInformation<
              WordKeyValueModel<string[]>[]
            >),
        };
      });

      component.showEndGameDialog();

      expect(component.setGameWords).toHaveBeenCalled();
    });
  });

  describe('showStartDialog', () => {
    it('should open dialog', () => {
      component.showStartDialog();

      expect(mockMatDialog.open).toHaveBeenCalled();
    });

    it('should call setGameWords after dialog close', () => {
      mockMatDialog.open.and.callFake(() => {
        return {
          afterClosed: () =>
            of({
              words: [{}],
            } as GameStartInformation<WordKeyValueModel<string[]>[]>),
        };
      });
      spyOn(component, 'setGameWords');

      component.showStartDialog();

      expect(component.setGameWords).toHaveBeenCalled();
    });

    it('should call startGame after dialog close', () => {
      mockMatDialog.open.and.callFake(() => {
        return {
          afterClosed: () =>
            of({
              words: [{}],
            } as GameStartInformation<WordKeyValueModel<string[]>[]>),
        };
      });
      spyOn(component, 'startGame');

      component.showStartDialog();

      expect(component.startGame).toHaveBeenCalled();
    });
  });

  describe('generateRandomOptions', () => {
    const allWords: WordKeyValueModel<TranslateModel[]>[] = [
      {
        translates: [
          { value: 'something' } as TranslateModel,
          { value: 'somethings' } as TranslateModel,
        ],
        key: 'key1',
      } as WordKeyValueModel<TranslateModel[]>,
      {
        translates: [
          { value: 'something' } as TranslateModel,
          { value: 'somethings' } as TranslateModel,
        ],
        key: 'key12',
      } as WordKeyValueModel<TranslateModel[]>,
      {
        translates: [
          { value: 'something' } as TranslateModel,
          { value: 'somethings' } as TranslateModel,
        ],
        key: 'key13',
      } as WordKeyValueModel<TranslateModel[]>,
      {
        translates: [
          { value: 'something' } as TranslateModel,
          { value: 'somethings' } as TranslateModel,
        ],
        key: 'key14',
      } as WordKeyValueModel<TranslateModel[]>,
    ];
    it('should call Math.round', () => {
      const targetWord: WordKeyValueModel<TranslateModel[]> = {
        translates: [
          { value: 'something' } as TranslateModel,
          { value: 'somethings' } as TranslateModel,
        ],
        key: 'key1',
      } as WordKeyValueModel<TranslateModel[]>;
      spyOn(Math, 'round').and.returnValue(0);

      component.generateRandomOptions(targetWord, allWords);

      expect(Math.round).toHaveBeenCalled();
    });

    it('should call Math.round', () => {
      const targetWord: WordKeyValueModel<TranslateModel[]> = {
        translates: [
          { value: 'something' } as TranslateModel,
          { value: 'somethings' } as TranslateModel,
        ],
        key: 'key1',
      } as WordKeyValueModel<TranslateModel[]>;

      spyOn(Math, 'round').and.returnValue(0);

      expect(component.generateRandomOptions(targetWord, allWords)).toEqual([
        'something',
        'something',
        'something',
        'something',
      ]);
    });

    it('should return result with random options', () => {
      const targetWord: WordKeyValueModel<TranslateModel[]> = {
        translates: [{ value: 'something' } as TranslateModel],
        key: 'key1',
      } as WordKeyValueModel<TranslateModel[]>;

      spyOn(Math, 'round').and.returnValue(0);

      expect(component.generateRandomOptions(targetWord, allWords)).toEqual([
        'something',
        'something',
        'something',
        'something',
      ]);
    });
  });

  describe('getCountOfRemainWords', () => {
    it('should return the length of remaining words', () => {
      component.words = [
        { isCurrentlyPlaying: false } as FallingStarsWord,
        { isCurrentlyPlaying: true } as FallingStarsWord,
      ];

      expect(component.getCountOfRemainWords()).toBe(1);
    });

    it('should return the length of remaining words when its first word', () => {
      component.words = [
        { isCurrentlyPlaying: false } as FallingStarsWord,
        { isCurrentlyPlaying: false } as FallingStarsWord,
      ];

      expect(component.getCountOfRemainWords()).toBe(2);
    });
  });
  describe('boxAnimationDone', () => {
    let fakeWord;

    // it('should set word.animating to false on calling boxAnimationDone', () => {
    //   component.words = [
    //     {
    //       animating: true,
    //       style: {},
    //       correctAnswers: ['testValue'],
    //       possibleAnswers: ['', ''],
    //     } as FallingStarsWord,
    //   ];
    //
    //   const mockValue = {
    //     animating: true,
    //     correctAnswers: ['testValue'],
    //   } as FallingStarsWord;
    //
    //   component.boxAnimationDone(mockValue);
    //
    //   expect(mockValue.animating).toBe(false);
    // });

    beforeEach(() => {
      fakeWord = {
        animating: false,
        key: '1',
        correctAnswers: [{ value: 'somethingCorrect' } as TranslateModel],
        selectedAnswer: 'somethingCorrect',
      } as FallingStarsWord;
    });

    it('should break if getAnswer is returning null', () => {
      spyOn(component, 'getAnswers').and.returnValue(null);

      const something = component.boxAnimationDone(fakeWord, false);

      expect(something).toBe(undefined);
    });

    it('should call store.dispatch if user select correct answer', () => {
      spyOn(component, 'getAnswers').and.returnValue([]);

      component.boxAnimationDone(fakeWord);

      expect(mockStore.dispatch).toHaveBeenCalled();
    });

    it('should show guid box if there is not selected answer', () => {
      spyOn(component, 'getAnswers').and.returnValue([]);
      spyOn(component, 'showGuidBox');
      fakeWord.selectedAnswer = null;

      component.boxAnimationDone(fakeWord);

      expect(component.showGuidBox).toHaveBeenCalled();
    });

    it('should set appropriate value for correctShowingAnswer', () => {
      spyOn(component, 'getAnswers').and.returnValue(['test answer']);
      fakeWord.correctShowingAnswer = 'test answer';
      component.boxAnimationDone(fakeWord);

      expect(component.currentWord.correctShowingAnswer).toEqual('');
    });

    it('should show guid box if user answer wrongly', () => {
      spyOn(component, 'getAnswers').and.returnValue(['test answer']);
      spyOn(component, 'showGuidBox');
      fakeWord.correctAnswers = ['correct answer'];
      fakeWord.selectedAnswer = 'wrong selected answer';

      component.boxAnimationDone(fakeWord);

      expect(component.showGuidBox).toHaveBeenCalled();
    });
  });

  it('should return round number in calculateScore', () => {
    spyOn(Math, 'round').and.returnValue(10);

    expect(component.calculateScore(10)).toBe(1);
  });

  it('should set guidBoxShowing to true when showGuidBox hits', () => {
    component.showGuidBox();

    expect(component.guidBoxShowing).toBeTrue();
  });

  describe('playNextStar', () => {
    it('should show end game dialog if playNextStar hits and there is not more word', () => {
      jasmine.clock().uninstall();
      jasmine.clock().install();
      spyOn(component, 'showEndGameDialog');

      component.playNextStar();
      jasmine.clock().tick(1001);

      expect(component.showEndGameDialog).toHaveBeenCalled();
      jasmine.clock().uninstall();
    });

    it('should animate next waiting work when playNextStar hits', () => {
      spyOn(component, 'showEndGameDialog');
      component.words.push(
        {
          animating: false,
          style: { animation: '' } as ElementStyle,
          isBlinking: true,
        } as FallingStarsWord,
        {
          animating: false,
          isBlinking: true,
          style: { animation: '' } as ElementStyle,
        } as FallingStarsWord
      );
      component.currentWord = component.words[0];
      component.playNextStar();

      expect(component.words[1].animating).toBeTrue();
    });

    it('should stop blinking after buffer if next word is available', () => {
      jasmine.clock().uninstall();
      jasmine.clock().install();

      spyOn(component, 'showEndGameDialog');
      component.words.push(
        {
          key: 'Word A',
          animating: false,
          style: { animation: '' } as ElementStyle,
        } as FallingStarsWord,
        {
          key: 'Word B',
          animating: false,
          style: { animation: '' } as ElementStyle,
        } as FallingStarsWord
      );
      component.currentWord = component.words[0];
      component.words[1].isBlinking = true;

      component.playNextStar();
      jasmine.clock().tick(2000);

      expect(component.words[1].isBlinking).toBeFalsy();
      jasmine.clock().uninstall();
    });
  });

  it('should return true if the key is pressing', () => {
    spyOn(component, 'showEndGameDialog');
    component.pressedNumber = 1;
    component.words.push({
      animating: true,
      possibleAnswers: ['something'],
    } as FallingStarsWord);

    expect(component.isPressing(component.words[0].possibleAnswers[0])).toBe(
      true
    );
  });

  it('should return answers of animating word', () => {
    component.words = [
      {
        animating: true,
        possibleAnswers: ['possibleAnswer1', 'possibleAnswer2'],
      } as FallingStarsWord,
    ];
    const expectedValue = component.getAnswers();

    expect(expectedValue).toEqual(['possibleAnswer1', 'possibleAnswer2']);
  });
});
