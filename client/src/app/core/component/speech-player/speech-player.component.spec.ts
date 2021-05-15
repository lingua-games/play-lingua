import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpeechPlayerComponent } from './speech-player.component';

describe('SpeechPlayerComponent', () => {
  let component: SpeechPlayerComponent;
  let fixture: ComponentFixture<SpeechPlayerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpeechPlayerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpeechPlayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
