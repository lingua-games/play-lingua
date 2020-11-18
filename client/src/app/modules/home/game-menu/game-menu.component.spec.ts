import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GameMenuComponent } from './game-menu.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NotificationService } from '../../../core/service/notification.service';

describe('GameMenuComponent', () => {
  let component: GameMenuComponent;
  let fixture: ComponentFixture<GameMenuComponent>;
  let mockNotificationService;
  beforeEach(async(() => {
    mockNotificationService = jasmine.createSpyObj(['showMessage']);
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule],
      declarations: [GameMenuComponent],
      providers: [
        {
          provide: NotificationService,
          useValue: mockNotificationService,
        },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GameMenuComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    component.selectedLanguages = { bas: [1] } as any;
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });
});
