import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForgotPasswordComponent } from './forgot-password.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NotificationService } from '../../../core/service/notification.service';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';

describe('ForgotPasswordComponent', () => {
  let component: ForgotPasswordComponent;
  let fixture: ComponentFixture<ForgotPasswordComponent>;
  let mockNotificationService;

  mockNotificationService = jasmine.createSpyObj(['showMessage']);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [ForgotPasswordComponent],
      providers: [
        {
          provide: NotificationService,
          useValue: mockNotificationService,
        },
      ],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ForgotPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
