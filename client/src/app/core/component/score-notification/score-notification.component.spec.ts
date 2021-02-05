import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScoreNotificationComponent } from './score-notification.component';

describe('ScoreNotificationComponent', () => {
  let component: ScoreNotificationComponent;
  let fixture: ComponentFixture<ScoreNotificationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScoreNotificationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScoreNotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
