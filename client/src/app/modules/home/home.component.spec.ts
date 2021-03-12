import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { RouterTestingModule } from '@angular/router/testing';
import { HomeComponent } from './home.component';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatDialog } from '@angular/material/dialog';
import { SecurityService } from '../../core/service/security.service';
import { of } from 'rxjs';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let mockSecurityService;
  let mockRouter;
  beforeEach(
    waitForAsync(() => {
      mockSecurityService = jasmine.createSpyObj(['isLoggedIn']);
      mockRouter = {
        url: '/non-pdp/phases/8',
        events: of(new NavigationStart(0, 'games/')),
        navigate: jasmine.createSpy('navigate'),
      };
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule, RouterTestingModule],
        declarations: [HomeComponent],
        providers: [
          {
            provide: Router,
            useValue: mockRouter,
          },
          {
            provide: MatDialog,
            useValue: {},
          },
          {
            provide: SecurityService,
            useValue: mockSecurityService,
          },
        ],
        schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    fixture.detectChanges();

    expect(component).toBeTruthy();
  });

  it('should check logged in when isLoggedIn hits', () => {
    mockSecurityService.isLoggedIn.and.callFake(() => {
      return true;
    });

    expect(component.isLoggedIn()).toBeTrue();
  });

  it('should set loading true if url is games/', () => {
    fixture.detectChanges();
    expect(component.isLoading).toBeTrue();
  });

  it('should set loading true if url is word-management', () => {
    mockRouter.events = of(new NavigationStart(0, 'word-management'));
    TestBed.overrideProvider(Router, {
      useValue: mockRouter,
    });

    fixture.detectChanges();

    expect(component.isLoading).toBeTrue();
  });

  it('should set style.transform to rotate(0deg)', () => {
    mockRouter.events = of(new NavigationStart(0, 'another route'));
    TestBed.overrideProvider(Router, {
      useValue: mockRouter,
    });

    fixture.detectChanges();

    expect(component.style['transform']).toBe('rotate(0deg)');
  });

  it('should finish animation if navigation is reach to the end', () => {
    mockRouter.events = of(new NavigationEnd(0, 'games/', 'games/'));
    TestBed.overrideProvider(Router, {
      useValue: mockRouter,
    });

    fixture.detectChanges();

    expect(component.isLoading).toBeFalse();
  });
});
