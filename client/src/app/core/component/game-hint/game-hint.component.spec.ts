import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GameHintComponent } from './game-hint.component';

describe('GameHintComponent', () => {
  let component: GameHintComponent;
  let fixture: ComponentFixture<GameHintComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GameHintComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GameHintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
