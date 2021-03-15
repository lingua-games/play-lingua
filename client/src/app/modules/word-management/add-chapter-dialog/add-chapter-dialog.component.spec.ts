import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { AddChapterDialogComponent } from './add-chapter-dialog.component';
import { FormBuilder } from '@angular/forms';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import {
  NotificationService,
  Severity,
} from '../../../core/service/notification.service';

describe('AddChapterDialogComponent', () => {
  let component: AddChapterDialogComponent;
  let fixture: ComponentFixture<AddChapterDialogComponent>;
  let mockMatDialogRef;
  let mockNotificationService;
  beforeEach(
    waitForAsync(() => {
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
          FormBuilder,
        ],
        schemas: [NO_ERRORS_SCHEMA],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(AddChapterDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show notification if chapterName is valid and submitForm hits', () => {
    component.chapterName.setErrors([]);

    component.submitForm();

    expect(mockNotificationService.showMessage).toHaveBeenCalledWith(
      'Chapter name is empty',
      Severity.error
    );
  });

  it('should close dialog if form controllers are valid and submitForm hits', () => {
    component.chapterName.setValue('');
    component.addChapterForm.setValue({
      chapterName: 'fake chapter name',
    });

    component.submitForm();

    expect(mockMatDialogRef.close).toHaveBeenCalledWith(
      component.addChapterForm.value
    );
  });
});
