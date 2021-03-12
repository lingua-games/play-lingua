import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScoreNotificationComponent } from './score-notification.component';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { NotificationState } from './state/score-notification.reducer';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('ScoreNotificationComponent', () => {
  let component: ScoreNotificationComponent;
  let fixture: ComponentFixture<ScoreNotificationComponent>;
  let mockStore;

  beforeEach(
    waitForAsync(() => {
      mockStore = jasmine.createSpyObj('store', {
        select: of({}),
      });
      TestBed.configureTestingModule({
        imports: [BrowserAnimationsModule],
        declarations: [ScoreNotificationComponent],
        providers: [
          {
            provide: Store,
            useValue: mockStore,
          },
        ],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    jasmine.clock().uninstall();
    jasmine.clock().install();
    fixture = TestBed.createComponent(ScoreNotificationComponent);
    component = fixture.componentInstance;
  });

  afterEach(() => {
    jasmine.clock().uninstall();
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should set showNotification to true if notification subscribed well', () => {
    mockStore.select.and.callFake(() => {
      return of({ gameName: 'something' } as NotificationState);
    });
    component.showNotification = false;

    fixture.detectChanges();

    expect(component.showNotification).toBe(true);
  });

  it('should set showNotification to false after a timeout', () => {
    mockStore.select.and.callFake(() => {
      return of({ gameName: 'something' } as NotificationState);
    });
    component.showNotification = true;

    fixture.detectChanges();
    jasmine.clock().tick(1100);

    expect(component.showNotification).toBe(false);
  });
});
