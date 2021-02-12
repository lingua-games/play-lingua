import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScoreNotificationComponent } from './score-notification.component';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';

describe('ScoreNotificationComponent', () => {
  let component: ScoreNotificationComponent;
  let fixture: ComponentFixture<ScoreNotificationComponent>;
  let mockStore;

  beforeEach(async(() => {
    mockStore = jasmine.createSpyObj('store', {
      select: of({}),
    });
    TestBed.configureTestingModule({
      declarations: [ScoreNotificationComponent],
      providers: [
        {
          provide: Store,
          useValue: mockStore,
        },
      ],
    }).compileComponents();
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
