import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterComponent } from './register.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NotificationService } from '../../../core/service/notification.service';
import { RouterTestingModule } from '@angular/router/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let mockNotificationService;
  beforeEach(async(() => {
    mockNotificationService = jasmine.createSpyObj(['showMessage']);

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      declarations: [RegisterComponent],
      providers: [
        {
          provide: NotificationService,
          useValue: mockNotificationService,
        },
        {
          provide: MatDialog,
          useValue: { closeAll: () => {} },
        },
      ],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
