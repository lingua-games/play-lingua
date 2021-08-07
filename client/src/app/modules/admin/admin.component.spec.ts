import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminComponent } from './admin.component';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { of } from 'rxjs';

describe('AdminComponent', () => {
  let component: AdminComponent;
  let fixture: ComponentFixture<AdminComponent>;
  let mockRouter;
  beforeEach(
    waitForAsync(() => {
      mockRouter = {
        url: '',
        events: of(),
        navigate: jasmine
          .createSpy('navigate')
          .and.returnValue(Promise.resolve()),
      };

      TestBed.configureTestingModule({
        declarations: [AdminComponent],
        providers: [
          {
            provide: Router,
            useValue: mockRouter,
          },
        ],
        schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    fixture.detectChanges();

    expect(component).toBeTruthy();
  });

  it('should navigate to /admin/view-invitations page if url is /admin', () => {
    mockRouter.url = '/admin';

    fixture.detectChanges();

    expect(mockRouter.navigate).toHaveBeenCalledWith([
      '/admin/view-invitations',
    ]);
  });

  it('should /admin to DOT and copy the value into currentMenu', () => {
    mockRouter.events = of(new NavigationEnd(0, '/admin/fake url', ''));

    fixture.detectChanges();

    expect(component.currentMenu).toBe('./fake url');
  });

  it('should set /admin into currentMenu if route is NOT NavigationEnd instance', () => {
    mockRouter.events = of(new NavigationStart(0, '/admin/fake url'));

    fixture.detectChanges();

    expect(component.currentMenu).toBe('');
  });
});
