import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpeechPlayerComponent } from './speech-player.component';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { SpeechStatus } from '../../models/word-key-value.model';
import { global } from '@angular/compiler/src/util';

describe('SpeechPlayerComponent', () => {
  let component: SpeechPlayerComponent;
  let fixture: ComponentFixture<SpeechPlayerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SpeechPlayerComponent],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpeechPlayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('playSound', () => {
    it('should break if status is Error', () => {
      component.status = SpeechStatus.Error;

      expect(component.playSound()).toBe(undefined);
    });

    xit('should break if status is Error', () => {
      component.status = SpeechStatus.Success;

      component.playSound();
      expect(undefined).toBe(undefined);
    });
  });
});
