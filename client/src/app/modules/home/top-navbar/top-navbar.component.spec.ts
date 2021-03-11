import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TopNavbarComponent } from './top-navbar.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MatDialog } from '@angular/material/dialog';
import { NotificationService } from '../../../core/service/notification.service';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { SecurityService } from '../../../core/service/security.service';
import { of } from 'rxjs';

describe('TopNavbarComponent', () => {
  let component: TopNavbarComponent;
  let fixture: ComponentFixture<TopNavbarComponent>;
  let mockSecurityService;
  beforeEach(async(() => {
    mockSecurityService = jasmine.createSpyObj('securityService', {
      isGuest: true,
      getTotalScore: () => {
        return of();
      },
      isLoggedIn: () => {},
      getTokenInformation: () => {},
      setTotalScore: () => {},
    });
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      declarations: [TopNavbarComponent],
      providers: [
        {
          provide: MatDialog,
          useValue: {},
        },
        {
          provide: NotificationService,
          useValue: {},
        },
        {
          provide: SecurityService,
          useValue: mockSecurityService,
        },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopNavbarComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should set total Score to - if user is guest', () => {
    mockSecurityService.isGuest.and.callFake(() => {
      return true;
    });

    fixture.detectChanges();

    expect(component.totalScore).toBe(' - ');
  });

  it('should round and set totalScore from service to components property', () => {
    mockSecurityService.getTotalScore.and.callFake(() => {
      return of(5);
    });
    mockSecurityService.isGuest.and.returnValue(false);

    fixture.detectChanges();

    expect(component.totalScore).toBe('5');
  });

  it('should round and set totalScore from service to components property', () => {
    mockSecurityService.getTotalScore.and.callFake(() => {
      return of('loading');
    });
    mockSecurityService.isGuest.and.returnValue(false);

    fixture.detectChanges();

    expect(component.totalScore).toBe('loading');
  });
});
