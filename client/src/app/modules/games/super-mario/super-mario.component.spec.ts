import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

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
import { MarioEnemy } from '../../../core/models/mario-enemy.model';

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
});
