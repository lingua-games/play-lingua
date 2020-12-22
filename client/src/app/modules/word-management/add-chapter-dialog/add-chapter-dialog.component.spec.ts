import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AddChapterDialogComponent } from './add-chapter-dialog.component';
import { FormBuilder } from '@angular/forms';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { NotificationService } from '../../../core/service/notification.service';
import { of } from 'rxjs';

describe('AddChapterDialogComponent', () => {
  let component: AddChapterDialogComponent;
  let fixture: ComponentFixture<AddChapterDialogComponent>;
  let mockFormBuilder;
  let mockMatDialogRef;
  let mockNotificationService;
  beforeEach(async(() => {
    mockFormBuilder = jasmine.createSpyObj('formBuilder', {
      group: {
        get: (value: string) => {
          return of('result');
        },
      },
    });
    mockMatDialogRef = jasmine.createSpyObj(['close']);
    mockNotificationService = jasmine.createSpyObj(['showMessage']);

    TestBed.configureTestingModule({
      declarations: [AddChapterDialogComponent],
      providers: [
        {
          provide: MatDialogRef,
          useValue: mockMatDialogRef,
        },
        {
          provide: NotificationService,
          useValue: mockNotificationService,
        },
        {
          provide: FormBuilder,
          useValue: mockFormBuilder,
        },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddChapterDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
