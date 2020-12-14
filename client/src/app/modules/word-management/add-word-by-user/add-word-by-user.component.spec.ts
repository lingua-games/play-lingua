import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddWordByUserComponent } from './add-word-by-user.component';
import { NotificationService } from '../../../core/service/notification.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';

describe('AddWordByUserComponent', () => {
  let component: AddWordByUserComponent;
  let fixture: ComponentFixture<AddWordByUserComponent>;
  let mockNotificationService;

  beforeEach(async(() => {
    mockNotificationService = jasmine.createSpyObj(['showMessage']);

    TestBed.configureTestingModule({
      declarations: [AddWordByUserComponent],
      providers: [
        {
          provide: NotificationService,
          useValue: mockNotificationService,
        },
        FormBuilder,
      ],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddWordByUserComponent);
    component = fixture.componentInstance;

    localStorage.setItem(
      'lingua-selected-languages',
      `{ "base": [], "target": [] }`
    );

    fixture.detectChanges();
  });

  afterAll(() => {
    localStorage.clear();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
