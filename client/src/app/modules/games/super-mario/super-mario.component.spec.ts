import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SuperMarioComponent } from './super-mario.component';
import { of } from 'rxjs';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Store } from '@ngrx/store';
import { GameStartInformation } from '../../../core/models/game-start-information';
import { WordKeyValueModel } from '../../../core/models/word-key-value.model';
import { MarioModel } from '../../../core/models/mario.model';
import { ElementStyle } from '../../../core/models/element-style.model';
import { ScoreStorageService } from '../../../core/service/score-storage.service';
import { FinishGameActionEnum } from '../../../core/models/finish-game-action.enum';
import {
  MarioEnemy,
  MarioEnemyStatus,
} from '../../../core/models/mario-enemy.model';

describe('SuperMarioComponent', () => {
  let component: SuperMarioComponent;
  let fixture: ComponentFixture<SuperMarioComponent>;
  let mockServiceResultValue;
  let mockMatDialogRef;
  let mockStore;
  let mockMatDialog;
  let mockScoreStorageService;

  beforeEach(
    waitForAsync(() => {
      mockStore = jasmine.createSpyObj(['select', 'dispatch']);
      mockScoreStorageService = jasmine.createSpyObj([
        'clearCatch',
        'getCachedScores',
        'catchScores',
      ]);
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
            provide: ScoreStorageService,
            useValue: mockScoreStorageService,
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

  describe('ngOnInit', () => {
    it('should initial mario style', () => {
      spyOn(component.mario, 'setStyle');

      fixture.detectChanges();

      expect(component.mario.setStyle).toHaveBeenCalled();
    });

    it('should clear catch for scores', () => {
      fixture.detectChanges();

      expect(mockScoreStorageService.clearCatch).toHaveBeenCalled();
    });

    it('should call showStartDialog', () => {
      spyOn(component, 'showStartDialog');

      fixture.detectChanges();

      expect(component.showStartDialog).toHaveBeenCalled();
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
    } as GameStartInformation<WordKeyValueModel<string[]>[]>;

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
            words: [{ key: 'foo', values: ['foo', 'bar'] }],
          } as GameStartInformation<WordKeyValueModel<string[]>[]>),
      };
    });
    spyOn(component, 'startGame');

    component.showStartDialog();

    expect(component.startGame).toHaveBeenCalled();
  });

  it('should start new game if user wants to retry after finishing one game', () => {
    mockMatDialog.open.and.callFake(() => {
      return {
        afterClosed: () => of(FinishGameActionEnum.retry),
      };
    });
    spyOn(component, 'startGame');

    component.showEndGameDialog();

    expect(component.startGame).toHaveBeenCalled();
  });

  it('should show game menu if user wants to change settings after finishing one game', () => {
    mockMatDialog.open.and.callFake(() => {
      return {
        afterClosed: () => of(FinishGameActionEnum.changeMode),
      };
    });
    spyOn(component, 'showStartDialog');

    component.showEndGameDialog();

    expect(component.showStartDialog).toHaveBeenCalled();
  });

  describe('prepareTheWord', () => {
    beforeEach(() => {
      spyOn(component, 'generateRandomNumber').and.returnValue([1]);
      spyOn(component, 'prepareAnswerOptions');
      component.allEnemies = {
        words: [
          { key: 'foo1', values: ['foo1', 'bar1'], wrongCount: 0 },
          { key: 'foo2', values: ['foo2', 'bar2'], wrongCount: 0 },
        ],
        bookId: 1,
        chapterId: 1,
      };
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

  it('should return random numbers when calling generateRandomNumber', () => {
    component.allEnemies = { words: [] } as GameStartInformation<
      WordKeyValueModel<string[]>[]
    >;
    component.allEnemies.words.push({} as WordKeyValueModel<string[]>);
    component.allEnemies.words.push({} as WordKeyValueModel<string[]>);
    component.allEnemies.words.push({} as WordKeyValueModel<string[]>);
    component.allEnemies.words.push({} as WordKeyValueModel<string[]>);

    expect(component.generateRandomNumber().length).toBe(4);
  });

  it('should call setEnemyStyle when calling prepareAnswerOptions', () => {
    component.enemies = [];
    component.randomNumbers = [0, 1, 2, 3];
    component.currentEnemy = { values: ['foo'] } as WordKeyValueModel<string[]>;
    component.allEnemies = { words: [] } as GameStartInformation<
      WordKeyValueModel<string[]>[]
    >;
    component.allEnemies.words.push({ values: ['foo'] } as WordKeyValueModel<
      string[]
    >);
    component.allEnemies.words.push({ values: ['foo'] } as WordKeyValueModel<
      string[]
    >);
    component.allEnemies.words.push({ values: ['foo'] } as WordKeyValueModel<
      string[]
    >);
    component.allEnemies.words.push({ values: ['foo'] } as WordKeyValueModel<
      string[]
    >);
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
      jasmine.clock().tick(2000);

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
      component.currentEnemy = { wrongCount: 1 } as WordKeyValueModel<string[]>;

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
        words: [{} as WordKeyValueModel<string[]>],
      } as GameStartInformation<WordKeyValueModel<string[]>[]>;
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
        values: ['foo'],
      } as WordKeyValueModel<string[]>;
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
        values: ['foo'],
      } as WordKeyValueModel<string[]>;
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
        values: ['foo'],
      } as WordKeyValueModel<string[]>;
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
        values: ['foo1'],
      } as WordKeyValueModel<string[]>;
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
        values: ['foo1'],
      } as WordKeyValueModel<string[]>;

      component.skipEnemy();

      expect(component.showGuidBox).toHaveBeenCalled();
    });
    it('should show next mushroom if skip the correct mushroom', () => {
      component.enemies[0].status = MarioEnemyStatus.IsMoving;
      spyOn(component, 'showNextEnemyWhenEnemyReachToEnd');
      component.currentEnemy = {
        values: ['foo2'],
      } as WordKeyValueModel<string[]>;

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
