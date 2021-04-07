import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { GameOptionsComponent } from './game-options.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('GameOptionsComponent', () => {
  let component: GameOptionsComponent;
  let fixture: ComponentFixture<GameOptionsComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [BrowserAnimationsModule],
        declarations: [GameOptionsComponent],
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
});
