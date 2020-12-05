import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SuperMarioComponent } from './super-mario.component';
import { GamesService } from '../../../core/service/games.service';
import { of } from 'rxjs';
import { global } from '@angular/compiler/src/util';

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
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SuperMarioComponent);
    component = fixture.componentInstance;
    mockServiceResultValue = ['foo', 'bar'];
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Key down events', () => {
    it('startMovingLeft should be called on pressing arrow left', () => {
      const mockEvent = { code: 'ArrowLeft' } as KeyboardEvent;
      spyOn(component, 'startMovingLeft');

      component.keyDownEvent(mockEvent);

      expect(component.startMovingLeft).toHaveBeenCalled();
    });

    it('startMovingRight should be called on pressing arrow right', () => {
      const mockEvent = { code: 'ArrowRight' } as KeyboardEvent;
      spyOn(component, 'startMovingRight');

      component.keyDownEvent(mockEvent);

      expect(component.startMovingRight).toHaveBeenCalled();
    });

    it('jump should be called on pressing space key', () => {
      const mockEvent = { code: 'Space' } as KeyboardEvent;
      spyOn(component, 'jump');

      component.keyDownEvent(mockEvent);

      expect(component.jump).toHaveBeenCalled();
    });
  });

  describe('Key up events', () => {
    it('startMovingLeft should be called on pressing arrow left', () => {
      const mockEvent = { code: 'ArrowLeft' } as KeyboardEvent;
      spyOn(component, 'startMovingLeft');

      component.keyDownEvent(mockEvent);

      expect(component.startMovingLeft).toHaveBeenCalled();
    });

    it('startMovingRight should be called on pressing arrow right', () => {
      const mockEvent = { code: 'ArrowRight' } as KeyboardEvent;
      spyOn(component, 'startMovingRight');

      component.keyDownEvent(mockEvent);

      expect(component.startMovingRight).toHaveBeenCalled();
    });
  });

  it('getWords should be called in startGame method', () => {
    spyOn(component, 'getWords');

    component.startGame();

    expect(component.getWords).toHaveBeenCalled();
  });

  it('getGameWords service should be called in getWords method', () => {
    mockGameService.getGameWords.and.callFake(() => {
      return of(['foo', 'baar']);
    });

    fixture.detectChanges();

    expect(mockGameService.getGameWords).toHaveBeenCalled();
  });

  it('getWords should fill enemies array', () => {
    mockGameService.getGameWords.and.callFake(() => {
      return of(mockServiceResultValue);
    });

    fixture.detectChanges();

    expect(component.enemies.length).toBe(mockServiceResultValue.length);
  });

  it('startAnimating should be called in getWords method', () => {
    mockGameService.getGameWords.and.callFake(() => {
      return of(mockServiceResultValue);
    });
    spyOn(component, 'startAnimating');

    fixture.detectChanges();

    expect(component.startAnimating).toHaveBeenCalledWith(component.enemies[0]);
  });

  it('clearInterval should be called in stopMovingLeft', () => {
    spyOn(global, 'clearInterval');

    component.stopMovingLeft();

    expect(clearInterval).toHaveBeenCalled();
    expect(component.movingLeftInterval).toBeNull();
  });

  it('clearInterval should be called in stopMovingRight', () => {
    spyOn(global, 'clearInterval');

    component.stopMovingRight();

    expect(clearInterval).toHaveBeenCalled();
    expect(component.movingRightInterval).toBeNull();
  });

  it('startMovingLeft should call moveLeft after a period', () => {
    spyOn(component.mario, 'moveLeft');
    jasmine.clock().install();

    component.startMovingLeft();
    jasmine.clock().tick(100);

    expect(component.mario.moveLeft).toHaveBeenCalledWith(1);
    jasmine.clock().uninstall();
  });

  it('startMovingRight should call moveRight after a period', () => {
    spyOn(component.mario, 'moveRight');
    jasmine.clock().install();

    component.startMovingRight();
    jasmine.clock().tick(100);

    expect(component.mario.moveRight).toHaveBeenCalledWith(1);
    jasmine.clock().uninstall();
  });

  it('jump should call mario.jump method', () => {
    spyOn(component.mario, 'jump');
    component.jumpHeight = 10;

    component.jump();

    expect(component.mario.jump).toHaveBeenCalledWith(10);
  });
});
