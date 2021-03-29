import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { SuperMarioComponent } from './super-mario.component';
import { of } from 'rxjs';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Store } from '@ngrx/store';
import { GameStartInformation } from '../../../core/models/game-start-information';
import { WordKeyValueModel } from '../../../core/models/word-key-value.model';

describe('SuperMarioComponent', () => {
  let component: SuperMarioComponent;
  let fixture: ComponentFixture<SuperMarioComponent>;
  let mockServiceResultValue;
  let mockMatDialogRef;
  let mockStore;
  let mockMatDialog;
  beforeEach(
    waitForAsync(() => {
      mockStore = jasmine.createSpyObj(['select', 'dispatch']);
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

  describe('Key down events', () => {
    it('should startMovingLeft should be called on pressing arrow left', () => {
      const mockEvent = { code: 'ArrowLeft' } as KeyboardEvent;
      spyOn(component, 'startMovingLeft');

      component.keyDownEvent(mockEvent);

      expect(component.startMovingLeft).toHaveBeenCalled();
    });

    it('should startMovingRight should be called on pressing arrow right', () => {
      const mockEvent = { code: 'ArrowRight' } as KeyboardEvent;
      spyOn(component, 'startMovingRight');

      component.keyDownEvent(mockEvent);

      expect(component.startMovingRight).toHaveBeenCalled();
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
});
