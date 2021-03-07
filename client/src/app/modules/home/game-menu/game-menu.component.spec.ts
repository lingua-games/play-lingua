import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GameMenuComponent } from './game-menu.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NotificationService } from '../../../core/service/notification.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

describe('GameMenuComponent', () => {
  let component: GameMenuComponent;
  let fixture: ComponentFixture<GameMenuComponent>;
  let mockNotificationService;
  let mockMatDialog;

  beforeEach(async(() => {
    mockNotificationService = jasmine.createSpyObj(['showMessage']);
    mockMatDialog = jasmine.createSpyObj(['open']);

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [GameMenuComponent],
      providers: [
        {
          provide: MatDialog,
          useValue: mockMatDialog,
        },
        {
          provide: NotificationService,
          useValue: mockNotificationService,
        },
        {
          provide: Router,
          useValue: {
            url: 'choose-languages',
            navigate: jasmine
              .createSpy('navigate')
              .and.returnValue(Promise.resolve()),
          },
        },
      ],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GameMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
