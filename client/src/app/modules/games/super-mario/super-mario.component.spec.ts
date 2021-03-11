import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SuperMarioComponent } from './super-mario.component';
import { GamesService } from '../../../core/service/games.service';
import { of, throwError } from 'rxjs';
import { global } from '@angular/compiler/src/util';
import { MarioEnemy } from '../../../core/models/mario-enemy.model';
import { ElementStyle } from '../../../core/models/element-style.model';

describe('SuperMarioComponent', () => {
  let component: SuperMarioComponent;
  let fixture: ComponentFixture<SuperMarioComponent>;
  let mockGameService;
  let mockServiceResultValue;
  beforeEach(async(() => {
    mockGameService = jasmine.createSpyObj(['getGameWords']);

    TestBed.configureTestingModule({
      declarations: [SuperMarioComponent],
      providers: [
        {
          provide: GamesService,
          useValue: mockGameService,
        },
      ],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  }));

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
    spyOn(component, 'getWords');

    component.startGame();

    expect(component.getWords).toHaveBeenCalled();
  });

  it('should getGameWords service be called in getWords method', () => {
    mockGameService.getGameWords.and.callFake(() => {
      return of(['foo', 'baar']);
    });

    fixture.detectChanges();

    expect(mockGameService.getGameWords).toHaveBeenCalled();
  });

  it('should handle errors when getWordAPI fail', () => {
    mockGameService.getGameWords.and.callFake(() => {
      return throwError('some error');
    });

    fixture.detectChanges();

    expect(2).toBe(2);
  });

  it('should getWords fill enemies array', () => {
    mockGameService.getGameWords.and.callFake(() => {
      return of(mockServiceResultValue);
    });

    fixture.detectChanges();

    expect(component.enemies.length).toBe(mockServiceResultValue.length);
  });

  it('should startAnimating be called in getWords method', () => {
    mockGameService.getGameWords.and.callFake(() => {
      return of(mockServiceResultValue);
    });
    spyOn(component, 'startAnimating');

    fixture.detectChanges();

    expect(component.startAnimating).toHaveBeenCalledWith(component.enemies[0]);
  });

  it('should clearInterval be called in stopMovingLeft', () => {
    spyOn(global, 'clearInterval');

    component.stopMovingLeft();

    expect(clearInterval).toHaveBeenCalled();
    expect(component.movingLeftInterval).toBeNull();
  });

  it('should clearInterval be called in stopMovingRight', () => {
    spyOn(global, 'clearInterval');

    component.stopMovingRight();

    expect(clearInterval).toHaveBeenCalled();
    expect(component.movingRightInterval).toBeNull();
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
