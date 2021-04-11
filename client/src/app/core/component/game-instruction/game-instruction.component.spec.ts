import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameInstructionComponent } from './game-instruction.component';

describe('GameInstructionComponent', () => {
  let component: GameInstructionComponent;
  let fixture: ComponentFixture<GameInstructionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GameInstructionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GameInstructionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
