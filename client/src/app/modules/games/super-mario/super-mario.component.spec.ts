import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SuperMarioComponent } from './super-mario.component';
import { of } from 'rxjs';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Store } from '@ngrx/store';
import { GameStartInformation } from '../../../core/models/game-start-information';
import {
  SpeechStatus,
  TranslateModel,
  WordKeyValueModel,
} from '../../../core/models/word-key-value.model';
import { MarioModel } from '../../../core/models/mario.model';
import { ElementStyle } from '../../../core/models/element-style.model';
import { ScoreStorageService } from '../../../core/service/score-storage.service';
import {
  MarioEnemy,
  MarioEnemyStatus,
} from '../../../core/models/mario-enemy.model';
import { SoundService } from '../../../core/service/sound.service';
import { BasicInformationService } from '../../../core/service/basic-information.service';
import { InvitationForm } from '../../../core/models/invitation-form.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { SecurityService } from '../../../core/service/security.service';
import { GameActionEnum } from '../../../core/models/game-action.enum';

describe('SuperMarioComponent', () => {
  let component: SuperMarioComponent;
  let fixture: ComponentFixture<SuperMarioComponent>;
  let mockServiceResultValue;
  let mockMatDialogRef;
  let mockStore;
  let mockMatDialog;
  let mockScoreStorageService;
  let mockSoundService;
  let mockBasicInformationService;
  let mockActivatedRoute;
  let mockRouter;
  let mockSecurityService;
  beforeEach(
    waitForAsync(() => {
      mockBasicInformationService = jasmine.createSpyObj(
        'basicInformationService',
        {
          loadFile: () => {
            return of('something');
          },
          gameHints: () => {
            return '';
          },
        }
      );
      mockSecurityService = {
        isLoggedIn: { success: true } as { success: boolean; route: string },
      };
      mockStore = jasmine.createSpyObj(['select', 'dispatch']);
      mockSoundService = jasmine.createSpyObj([
        'playActionSong',
        'stopGameSong',
        'loadSounds',
      ]);
      mockRouter = jasmine.createSpyObj('router', ['navigate']);
      mockScoreStorageService = jasmine.createSpyObj([
        'clearCatch',
        'getCachedScores',
        'catchScores',
      ]);
      mockActivatedRoute = {
        paramMap: of({
          get: () => {
            return 'invitation code';
          },
        }),
      };
      mockMatDialogRef = jasmine.createSpyObj(['close']);
      mockMatDialog = jasmine.createSpyObj('dialog', {
        open: {
          afterClosed: () => {
            return of();
          },
        },
      });
      TestBed.configureTestingModule({
        declarations: [SuperMarioComponent],
        imports: [HttpClientTestingModule],
        providers: [
          {
            provide: BasicInformationService,
            useValue: mockBasicInformationService,
          },
          {
            provide: SoundService,
            useValue: mockSoundService,
          },
          {
            provide: ScoreStorageService,
            useValue: mockScoreStorageService,
          },
          {
            provide: SecurityService,
            useValue: mockSecurityService,
          },
          {
            provide: Store,
            useValue: mockStore,
          },
          {
            provide: MatDialogRef,
            useValue: mockMatDialogRef,
          },
          {
            provide: MatDialog,
            useValue: mockMatDialog,
          },
          {
            provide: ActivatedRoute,
            useValue: mockActivatedRoute,
          },
          {
            provide: Router,
            useValue: mockRouter,
          },
        ],
        schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(SuperMarioComponent);
    component = fixture.componentInstance;
    mockServiceResultValue = ['foo', 'bar'];
  });

  beforeEach(() => {
    jasmine.clock().uninstall();
    jasmine.clock().install();
  });

  afterEach(() => {
    jasmine.clock().uninstall();
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call loadImages for all the images of game', () => {
    mockBasicInformationService.loadFile.and.callFake(() => {
      return of('something');
    });

    component.loadImages();

    expect(mockBasicInformationService.loadFile).toHaveBeenCalledTimes(5);
  });

  describe('ngOnInit', () => {
    it('should fill uniqueKey into feedbackForm if its feedback session', () => {
      spyOn(component, 'showStartDialog');
      spyOn(component.mario, 'setStyle');
      mockBasicInformationService.loadFile.and.callFake(() => {
        return of('something');
      });

      fixture.detectChanges();

      expect(component.feedbackForm).toEqual({
        uniqueKey: 'invitation code',
      } as InvitationForm);
    });

    it('should initial mario style', () => {
      spyOn(component.mario, 'setStyle');
      mockBasicInformationService.loadFile.and.callFake(() => {
        return of('something');
      });

      fixture.detectChanges();

      expect(component.mario.setStyle).toHaveBeenCalled();
    });

    it('should call loadImages', () => {
      spyOn(component, 'loadImages');

      fixture.detectChanges();

      expect(component.loadImages).toHaveBeenCalled();
    });

    it('should call loadSounds', () => {
      mockBasicInformationService.loadFile.and.callFake(() => {
        return of('something');
      });

      fixture.detectChanges();

      expect(mockSoundService.loadSounds).toHaveBeenCalled();
    });

    it('should clear catch for scores', () => {
      mockBasicInformationService.loadFile.and.callFake(() => {
        return of('something');
      });

      fixture.detectChanges();

      expect(mockScoreStorageService.clearCatch).toHaveBeenCalled();
    });

    it('should call showStartDialog', () => {
      spyOn(component, 'showStartDialog');
      mockBasicInformationService.loadFile.and.callFake(() => {
        return of('something');
      });

      fixture.detectChanges();

      expect(component.showStartDialog).toHaveBeenCalled();
    });
  });

  describe('getAnswerSpeech', () => {
    it('should return speech information of the correct answer', () => {
      const methodOutput = component.getAnswerSpeech({
        value: 'word C',
        speechCode: 'fake speech code C',
        speechStatus: SpeechStatus.Success,
      } as TranslateModel);

      expect(methodOutput).toEqual({
        code: 'fake speech code C',
        status: SpeechStatus.Success,
      });
    });
  });

  describe('Key down events', () => {
    it('should call showStartDialog when keyDownEvent call with Escape key', () => {
      spyOn(component, 'showStartDialog');

      component.keyDownEvent({ code: 'Escape' } as KeyboardEvent);

      expect(component.showStartDialog).toHaveBeenCalled();
    });

    it('should NOT function arrow keys if guid box is showing', () => {
      component.guidBoxShowing = true;
      expect(
        component.keyDownEvent({ code: 'ArrowLeft' } as KeyboardEvent)
      ).toBe(undefined);
    });

    it('should call prepareTheWord when keyDownEvent call with Enter or NumpadEnter key', () => {
      spyOn(component, 'prepareTheWord');
      component.guidBoxShowing = true;

      component.keyDownEvent({ code: 'Enter' } as KeyboardEvent);
      expect(component.prepareTheWord).toHaveBeenCalled();

      component.keyDownEvent({ code: 'NumpadEnter' } as KeyboardEvent);
      expect(component.prepareTheWord).toHaveBeenCalled();
    });

    it('should call startMovingLeft on pressing arrow left', () => {
      const mockEvent = { code: 'ArrowLeft' } as KeyboardEvent;
      spyOn(component, 'startMovingLeft');

      component.keyDownEvent(mockEvent);

      expect(component.startMovingLeft).toHaveBeenCalled();
    });

    it('should call startMovingRight on pressing arrow right', () => {
      const mockEvent = { code: 'ArrowRight' } as KeyboardEvent;
      spyOn(component, 'startMovingRight');

      component.keyDownEvent(mockEvent);

      expect(component.startMovingRight).toHaveBeenCalled();
    });

    it('should call skipEnemy on pressing Q key', () => {
      const mockEvent = { code: 'KeyQ' } as KeyboardEvent;
      spyOn(component, 'skipEnemy');

      component.keyDownEvent(mockEvent);

      expect(component.skipEnemy).toHaveBeenCalled();
    });

    it('should jump should be called on pressing space key', () => {
      const mockEvent = { code: 'Space' } as KeyboardEvent;
      spyOn(component, 'jump');

      component.keyDownEvent(mockEvent);

      expect(component.jump).toHaveBeenCalled();
    });
  });

  describe('Key up events', () => {
    beforeEach(() => {
      jasmine.clock().uninstall();
      jasmine.clock().install();
    });

    afterEach(() => {
      jasmine.clock().uninstall();
    });

    it('should NOT call arrow functions if guid box showing is true', () => {
      component.guidBoxShowing = true;

      expect(component.keyUpEvent({} as KeyboardEvent)).toBe(undefined);
    });

    it('should move left arrow right left', () => {
      const mockEvent = { code: 'ArrowLeft' } as KeyboardEvent;
      spyOn(component, 'stopMovingLeft');

      component.keyUpEvent(mockEvent);

      expect(component.stopMovingLeft).toHaveBeenCalled();
    });

    it('should move right arrow right press', () => {
      const mockEvent = { code: 'ArrowRight' } as KeyboardEvent;
      spyOn(component, 'stopMovingRight');

      component.keyUpEvent(mockEvent);

      expect(component.stopMovingRight).toHaveBeenCalled();
    });
  });

  it('should getWords be called in startGame method', () => {
    spyOn(component, 'prepareTheWord');
    component.allEnemies = {
      words: [],
    } as GameStartInformation<WordKeyValueModel<TranslateModel[]>[]>;

    component.startGame();

    expect(component.prepareTheWord).toHaveBeenCalled();
  });

  it('should clearInterval be called in stopMovingLeft', () => {
    spyOn(window, 'clearInterval');

    component.stopMovingLeft();

    expect(clearInterval).toHaveBeenCalled();
    expect(component.movingLeftInterval).toBeUndefined();
  });

  it('should clearInterval be called in stopMovingRight', () => {
    spyOn(window, 'clearInterval');

    component.stopMovingRight();

    expect(clearInterval).toHaveBeenCalled();
    expect(component.movingRightInterval).toBeUndefined();
  });

  it('should startMovingLeft call moveLeft after a period', () => {
    spyOn(component.mario, 'moveLeft');

    component.startMovingLeft();
    jasmine.clock().tick(100);

    expect(component.mario.moveLeft).toHaveBeenCalledWith(1);
    jasmine.clock().uninstall();
  });

  it('should startMovingRight call moveRight after a period', () => {
    spyOn(component.mario, 'moveRight');

    component.startMovingRight();
    jasmine.clock().tick(100);

    expect(component.mario.moveRight).toHaveBeenCalledWith(1);
  });

  it('should jump call mario.jump method', () => {
    spyOn(component.mario, 'jump');
    component.jumpHeight = 10;

    component.jump();

    expect(component.mario.jump).toHaveBeenCalledWith(10);
  });

  it('should set mario width on browser resize', () => {
    component.mario = {
      style: {
        width: '50%',
      } as ElementStyle,
    } as MarioModel;

    component.onResize();

    expect(component.mario.style.width !== '50%').toBeTruthy();
  });

  it('should stop moving objects when windows loosing its focus', () => {
    spyOn(component, 'stopMovingRight');
    spyOn(component, 'stopMovingLeft');

    component.onBlur();

    expect(component.stopMovingLeft).toHaveBeenCalled();
    expect(component.stopMovingRight).toHaveBeenCalled();
  });

  it('should call startGame after closing start game dialog', () => {
    mockMatDialog.open.and.callFake(() => {
      return {
        afterClosed: () =>
          of({
            words: [
              {
                key: 'foo',
                translates: [
                  { value: 'foo' } as TranslateModel,
                  { value: 'bar' } as TranslateModel,
                ],
              },
            ],
          } as GameStartInformation<WordKeyValueModel<string[]>[]>),
      };
    });
    spyOn(component, 'startGame');

    component.showStartDialog();

    expect(component.startGame).toHaveBeenCalled();
  });

  describe('showEndGameDialog', () => {
    it('should stop sound', () => {
      spyOn(component, 'stopSound');

      component.showEndGameDialog();

      expect(component.stopSound).toHaveBeenCalledWith(false);
    });
    it('should open dialog', () => {
      spyOn(component, 'stopSound');

      component.showEndGameDialog();

      expect(mockMatDialog.open).toHaveBeenCalled();
    });

    it('should start game after closing dialog with res.words', () => {
      spyOn(component, 'stopSound');
      spyOn(component, 'startGame');
      mockMatDialog.open.and.returnValue({
        afterClosed: () => {
          return of({
            words: [{ key: '1' } as WordKeyValueModel<TranslateModel[]>],
          } as GameStartInformation<WordKeyValueModel<TranslateModel[]>[]>);
        },
      });
      component.showEndGameDialog();

      expect(component.startGame).toHaveBeenCalled();
    });

    it('should NOT call start game after closing dialog with NO res.words', () => {
      spyOn(component, 'stopSound');
      spyOn(component, 'startGame');
      mockMatDialog.open.and.returnValue({
        afterClosed: () => {
          return of({
            words: [],
          } as GameStartInformation<WordKeyValueModel<TranslateModel[]>[]>);
        },
      });
      component.showEndGameDialog();

      expect(component.startGame).not.toHaveBeenCalled();
    });
  });

  describe('stopSound', () => {
    it('should call playActionSong if value is true', () => {
      component.isSoundOn = true;

      component.stopSound(true);

      expect(mockSoundService.playActionSong).toHaveBeenCalledWith(
        GameActionEnum.backGroundSond,
        true
      );
    });
    it('should call stopGameSong if value is false', () => {
      component.stopSound(false);

      expect(mockSoundService.stopGameSong).toHaveBeenCalledWith(
        GameActionEnum.backGroundSond
      );
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

  describe('prepareTheWord', () => {
    beforeEach(() => {
      spyOn(component, 'generateRandomNumber').and.returnValue([1]);
      spyOn(component, 'prepareAnswerOptions');
      component.allEnemies = {
        words: [
          {
            key: 'foo1',
            translates: [
              { value: 'foo1' } as TranslateModel,
              { value: 'bar1' } as TranslateModel,
            ],
            wrongCount: 0,
          } as WordKeyValueModel<TranslateModel[]>,
          {
            key: 'foo2',
            translates: [
              { value: 'foo2' } as TranslateModel,
              { value: 'bar2' } as TranslateModel,
            ],
            wrongCount: 0,
          } as WordKeyValueModel<TranslateModel[]>,
        ],
        bookId: 1,
        chapterId: 1,
      };
    });

    it('should playActionSoung with backgroundSound if guidboxShowing is true', () => {
      component.guidBoxShowing = true;

      component.prepareTheWord();

      expect(mockSoundService.playActionSong).toHaveBeenCalledWith(
        GameActionEnum.backGroundSond,
        component.isSoundOn
      );
    });

    it('should set next enemy as current enemy', () => {
      component.currentEnemy = component.allEnemies.words[0];
      jasmine.clock().uninstall();
      jasmine.clock().install();

      component.prepareTheWord();
      jasmine.clock().tick(10);

      expect(component.currentEnemy).toEqual(component.allEnemies.words[1]);
      jasmine.clock().uninstall();
    });

    it('should show end game dialog if it is the last word', () => {
      component.currentEnemy = component.allEnemies.words[1];
      spyOn(component, 'showEndGameDialog');

      component.prepareTheWord();

      expect(component.showEndGameDialog).toHaveBeenCalled();
    });

    it('should set current enemy if method has parameter', () => {
      spyOn(component, 'showEndGameDialog');

      component.prepareTheWord(component.allEnemies.words[0]);

      expect(component.currentEnemy).toEqual(component.allEnemies.words[0]);
    });
  });

  describe('getRemainWordCount', () => {
    it('should return the number minus one if guide box is showing', () => {
      const allEnemies = {
        words: [
          { key: '1' } as WordKeyValueModel<TranslateModel[]>,
          { key: '2' } as WordKeyValueModel<TranslateModel[]>,
          { key: '3' } as WordKeyValueModel<TranslateModel[]>,
        ],
      } as GameStartInformation<WordKeyValueModel<TranslateModel[]>[]>;
      component.guidBoxShowing = true;
      component.allEnemies = allEnemies;
      component.currentEnemy = allEnemies[1];

      expect(component.getRemainWordCount()).toBe(3);
    });

    it('should return the number if guide box is NOT showing', () => {
      const allEnemies = {
        words: [
          { key: '1' } as WordKeyValueModel<TranslateModel[]>,
          { key: '2' } as WordKeyValueModel<TranslateModel[]>,
          { key: '3' } as WordKeyValueModel<TranslateModel[]>,
        ],
      } as GameStartInformation<WordKeyValueModel<TranslateModel[]>[]>;
      component.guidBoxShowing = false;
      component.allEnemies = allEnemies;
      component.currentEnemy = allEnemies[1];

      expect(component.getRemainWordCount()).toBe(4);
    });
  });

  it('should return random numbers when calling generateRandomNumber', () => {
    component.allEnemies = { words: [] } as GameStartInformation<
      WordKeyValueModel<TranslateModel[]>[]
    >;
    component.allEnemies.words.push({} as WordKeyValueModel<TranslateModel[]>);
    component.allEnemies.words.push({} as WordKeyValueModel<TranslateModel[]>);
    component.allEnemies.words.push({} as WordKeyValueModel<TranslateModel[]>);
    component.allEnemies.words.push({} as WordKeyValueModel<TranslateModel[]>);

    expect(component.generateRandomNumber().length).toBe(4);
  });

  it('should call setEnemyStyle when calling prepareAnswerOptions', () => {
    component.enemies = [];
    component.randomNumbers = [0, 1, 2, 3];
    component.currentEnemy = {
      translates: [{ value: 'foo' } as TranslateModel],
    } as WordKeyValueModel<TranslateModel[]>;

    component.allEnemies = { words: [] } as GameStartInformation<
      WordKeyValueModel<TranslateModel[]>[]
    >;
    component.allEnemies.words.push({
      translates: [{ value: 'foo' } as TranslateModel],
    } as WordKeyValueModel<TranslateModel[]>);
    component.allEnemies.words.push({
      translates: [{ value: 'foo' } as TranslateModel],
    } as WordKeyValueModel<TranslateModel[]>);
    component.allEnemies.words.push({
      translates: [{ value: 'foo' } as TranslateModel],
    } as WordKeyValueModel<TranslateModel[]>);
    component.allEnemies.words.push({
      translates: [{ value: 'foo' } as TranslateModel],
    } as WordKeyValueModel<TranslateModel[]>);
    spyOn(component, 'setEnemyStyle');

    component.prepareAnswerOptions();

    expect(component.setEnemyStyle).toHaveBeenCalled();
  });

  describe('setEnemyStyle', () => {
    beforeEach(() => {
      component.enemies = [
        { valueToAsk: 'foo1' } as MarioEnemy,
        { valueToAsk: 'foo2' } as MarioEnemy,
        { valueToAsk: 'foo3' } as MarioEnemy,
        { valueToAsk: 'foo4' } as MarioEnemy,
      ];
    });

    it('should set random numbers for bottom', () => {
      component.setEnemyStyle();

      component.enemies.forEach((enemy) => {
        expect(parseInt(enemy.style.bottom, 0)).toBeGreaterThan(0);
      });
    });

    it('should call showWordInWaitingMode after 4 seconds', () => {
      jasmine.clock().uninstall();
      jasmine.clock().install();
      spyOn(component, 'showWordInWaitingMode');
      component.enemies = [];

      component.setEnemyStyle();
      jasmine.clock().tick(4000);

      expect(component.showWordInWaitingMode).toHaveBeenCalledWith(
        {} as MarioEnemy
      );
    });
  });

  describe('showWordInWaitingMode', () => {
    it('should set enemy status after 2 seconds', () => {
      const enemy = {
        status: MarioEnemyStatus.WaitingForStart,
        style: { width: '' },
      } as MarioEnemy;
      jasmine.clock().uninstall();
      jasmine.clock().install();

      component.showWordInWaitingMode(enemy);
      jasmine.clock().tick(1000);

      expect(enemy.status).toBe(MarioEnemyStatus.IsMoving);
    });

    it('should call showMovingEnemy after 2 seconds', () => {
      const enemy = {
        status: MarioEnemyStatus.WaitingForStart,
        style: { width: '' },
      } as MarioEnemy;
      jasmine.clock().uninstall();
      jasmine.clock().install();
      spyOn(component, 'showMovingEnemy');

      component.showWordInWaitingMode(enemy);
      jasmine.clock().tick(2000);

      expect(component.showMovingEnemy).toHaveBeenCalled();
    });
  });

  describe('showPointNotification', () => {
    let enemy: MarioEnemy;
    beforeEach(() => {
      enemy = {} as MarioEnemy;
      enemy.valueToAsk = 'foo';
      enemy.style = { right: '10%' } as ElementStyle;
    });
    it('should add earned score into valueToAsk  of enemy', () => {
      spyOn(component, 'animationOnWrongAnswer');

      component.showPointNotification(enemy);

      expect(enemy.valueToAsk).toBe('+ 9');
    });

    it('should divide score by 2 answered once wrong', () => {
      spyOn(component, 'animationOnWrongAnswer');
      component.currentEnemy = { wrongCount: 1 } as WordKeyValueModel<
        TranslateModel[]
      >;

      component.showPointNotification(enemy);

      expect(enemy.valueToAsk).toBe('+ 4.5');
    });

    it('should call animationOnCorrectAnswer', () => {
      spyOn(component, 'animationOnCorrectAnswer');

      component.showPointNotification(enemy);

      expect(component.animationOnCorrectAnswer).toHaveBeenCalledWith(enemy);
    });
  });

  it('should set status to finish after 2 seconds when animationOnWrongAnswer is being called', () => {
    jasmine.clock().uninstall();
    jasmine.clock().install();
    const enemy = {
      status: MarioEnemyStatus.IsMoving,
      style: { width: '' },
    } as MarioEnemy;

    component.animationOnWrongAnswer(enemy);
    jasmine.clock().tick(2000);

    expect(enemy.status).toBe(MarioEnemyStatus.Finished);
  });

  describe('showGuidBox', () => {
    beforeEach(() => {
      component.allEnemies = {
        words: [{} as WordKeyValueModel<TranslateModel[]>],
      } as GameStartInformation<WordKeyValueModel<TranslateModel[]>[]>;
    });
    it('should call animationOnWrongAnswer', () => {
      spyOn(component, 'animationOnWrongAnswer');

      component.showGuidBox({} as MarioEnemy);

      expect(component.animationOnWrongAnswer).toHaveBeenCalled();
    });

    it('should call stopMovingLeft', () => {
      spyOn(component, 'stopMovingLeft');

      component.showGuidBox({} as MarioEnemy);

      expect(component.stopMovingLeft).toHaveBeenCalled();
    });

    it('should call stopMovingRight', () => {
      spyOn(component, 'stopMovingRight');

      component.showGuidBox({} as MarioEnemy);

      expect(component.stopMovingRight).toHaveBeenCalled();
    });
  });

  describe('showMovingEnemy', () => {
    let enemy: MarioEnemy;
    beforeEach(() => {
      enemy = {} as MarioEnemy;
    });

    it('should stop interval if guid box is showing', () => {
      component.guidBoxShowing = true;
      spyOn(window, 'clearInterval');

      component.showMovingEnemy(enemy);

      expect(clearInterval).toHaveBeenCalled();
    });

    it('should increase right of mushroom by 1 percent', () => {
      spyOn(component, 'isCrashed');
      jasmine.clock().uninstall();
      jasmine.clock().install();
      enemy.style = {
        right: '10%',
      } as ElementStyle;

      component.showMovingEnemy(enemy);
      jasmine.clock().tick(55);

      expect(enemy.style.right).toBe('11%');
      jasmine.clock().uninstall();
    });

    it('should clear interval if objects are crashed', () => {
      spyOn(component, 'isCrashed').and.returnValue(true);
      spyOn(component, 'showGuidBox');
      jasmine.clock().uninstall();
      jasmine.clock().install();
      spyOn(window, 'clearInterval');

      component.showMovingEnemy(enemy);
      jasmine.clock().tick(55);

      expect(clearInterval).toHaveBeenCalled();
      jasmine.clock().uninstall();
    });

    it('should show point notification if hitting correct answer', () => {
      spyOn(component, 'isCrashed').and.returnValue(true);
      spyOn(component, 'showGuidBox');
      spyOn(component, 'showPointNotification');
      component.currentEnemy = {
        translates: [{ value: 'foo' } as TranslateModel],
      } as WordKeyValueModel<TranslateModel[]>;
      enemy.valueToAsk = 'foo';
      jasmine.clock().uninstall();
      jasmine.clock().install();
      spyOn(window, 'clearInterval');

      component.showMovingEnemy(enemy);
      jasmine.clock().tick(55);

      expect(component.showPointNotification).toHaveBeenCalled();
      jasmine.clock().uninstall();
    });

    it('should call prepareTheWord after 2 seconds if hitting correct answer', () => {
      spyOn(component, 'isCrashed').and.returnValue(true);
      spyOn(component, 'showGuidBox');
      spyOn(component, 'showPointNotification');
      spyOn(component, 'prepareTheWord');
      component.currentEnemy = {
        translates: [{ value: 'foo' } as TranslateModel],
      } as WordKeyValueModel<TranslateModel[]>;
      enemy.valueToAsk = 'foo';
      jasmine.clock().uninstall();
      jasmine.clock().install();
      spyOn(window, 'clearInterval');

      component.showMovingEnemy(enemy);
      jasmine.clock().tick(2055);

      expect(component.prepareTheWord).toHaveBeenCalled();
      jasmine.clock().uninstall();
    });

    it('should show guid box if correct enemy reach to the end of the edge', () => {
      spyOn(component, 'isCrashed').and.returnValue(false);
      spyOn(component, 'showGuidBox');
      component.currentEnemy = {
        translates: [{ value: 'foo' } as TranslateModel],
      } as WordKeyValueModel<TranslateModel[]>;
      enemy.valueToAsk = 'foo';
      enemy.style = { right: '150%' } as ElementStyle;
      jasmine.clock().uninstall();
      jasmine.clock().install();
      spyOn(window, 'clearInterval');

      component.showMovingEnemy(enemy);
      jasmine.clock().tick(50);

      expect(component.showGuidBox).toHaveBeenCalled();
      jasmine.clock().uninstall();
    });

    it('should call showNextEnemyWhenEnemyReachToEnd when incorrect mushroom reach to the end of the edge', () => {
      spyOn(component, 'isCrashed').and.returnValue(false);
      spyOn(component, 'showNextEnemyWhenEnemyReachToEnd');
      component.currentEnemy = {
        translates: [{ value: 'foo1' } as TranslateModel],
      } as WordKeyValueModel<TranslateModel[]>;
      enemy.valueToAsk = 'foo';
      enemy.style = { right: '150%' } as ElementStyle;
      jasmine.clock().uninstall();
      jasmine.clock().install();
      spyOn(window, 'clearInterval');

      component.showMovingEnemy(enemy);
      jasmine.clock().tick(50);

      expect(component.showNextEnemyWhenEnemyReachToEnd).toHaveBeenCalled();
      jasmine.clock().uninstall();
    });
  });

  describe('isCrashed', () => {
    beforeEach(() => {
      component.marioTemplate = {
        nativeElement: {
          offsetTop: '1',
          offsetHeight: '2',
          offsetLeft: '3',
          offsetBottom: '4',
        },
      };
    });
    it('should break if enemyTemplate is empty', () => {
      component.enemyTemplate = null;
      expect(component.isCrashed()).toBeUndefined();
    });

    it('should return true if object crashed', () => {
      expect(component.isCrashed()).toBeTruthy();
    });
  });

  describe('skipEnemy', () => {
    beforeEach(() => {
      component.enemies = [
        { valueToAsk: 'foo1' } as MarioEnemy,
        { valueToAsk: 'foo2' } as MarioEnemy,
        { valueToAsk: 'foo3' } as MarioEnemy,
        { valueToAsk: 'foo4' } as MarioEnemy,
      ];
    });

    it('should break if nothing is moving', () => {
      expect(component.skipEnemy()).toBeUndefined();
    });

    it('should show guid box if skip the incorrect mushroom', () => {
      component.enemies[0].status = MarioEnemyStatus.IsMoving;
      spyOn(component, 'showGuidBox');
      component.currentEnemy = {
        translates: [{ value: 'foo1' } as TranslateModel],
      } as WordKeyValueModel<TranslateModel[]>;

      component.skipEnemy();

      expect(component.showGuidBox).toHaveBeenCalled();
    });
    it('should show next mushroom if skip the correct mushroom', () => {
      component.enemies[0].status = MarioEnemyStatus.IsMoving;
      spyOn(component, 'showNextEnemyWhenEnemyReachToEnd');
      component.currentEnemy = {
        translates: [{ value: 'foo2' } as TranslateModel],
      } as WordKeyValueModel<TranslateModel[]>;

      component.skipEnemy();

      expect(component.showNextEnemyWhenEnemyReachToEnd).toHaveBeenCalled();
    });
  });

  it('should call showWordInWaitingMode with next index of enemy when calling showNextEnemyWhenEnemyReachToEnd', () => {
    component.enemies[0] = { valueToAsk: 'foo1' } as MarioEnemy;
    component.enemies[2] = { valueToAsk: 'foo2' } as MarioEnemy;
    spyOn(component, 'showWordInWaitingMode');
    const playingEnemy = component.enemies[0];

    component.showNextEnemyWhenEnemyReachToEnd(playingEnemy);

    expect(component.showWordInWaitingMode).toHaveBeenCalledWith(
      component.enemies[2]
    );
  });
});
