import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { GameOptionsComponent } from './game-options.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';

describe('GameOptionsComponent', () => {
  let component: GameOptionsComponent;
  let fixture: ComponentFixture<GameOptionsComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [BrowserAnimationsModule],
        declarations: [GameOptionsComponent],
        schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(GameOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show details on calling showDetails function', () => {
    component.isDetailsShowing = false;

    component.showDetails();

    expect(component.isDetailsShowing).toBeTruthy();
  });

  it('should hide details on calling hideDetails function', () => {
    component.isDetailsShowing = true;

    component.hideDetails();

    expect(component.isDetailsShowing).toBeFalse();
  });

  describe('soundTrigger', () => {
    it('should trigger this.soundOn', () => {
      component.soundOn = true;

      component.soundTrigger();

      expect(component.soundOn).toBeFalsy();
    });

    it('should call stopSound.emit', () => {
      component.soundOn = true;
      spyOn(component.stopSound, 'emit');

      component.soundTrigger();

      expect(component.stopSound.emit).toHaveBeenCalledWith(false);
    });
  });
});
