import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBookDialogComponent } from './add-book-dialog.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MaterialModule } from '../../common/material/material.module';
import { MatDialogRef } from '@angular/material/dialog';
import { MessageService } from 'primeng/api';
import {
  NotificationService,
  Severity,
} from '../../../core/service/notification.service';

describe('AddBookDialogComponent', () => {
  let component: AddBookDialogComponent;
  let fixture: ComponentFixture<AddBookDialogComponent>;
  let mockMatDialogRef;
  let mockMessageService;
  let mockNotificationService;
  beforeEach(
    waitForAsync(() => {
      mockMessageService = jasmine.createSpyObj(['add']);
      mockMatDialogRef = jasmine.createSpyObj(['close']);
      mockNotificationService = jasmine.createSpyObj(['showMessage']);

      TestBed.configureTestingModule({
        imports: [MaterialModule],
        declarations: [AddBookDialogComponent],
        providers: [
          {
            provide: NotificationService,
            useValue: mockNotificationService,
          },
          {
            provide: MessageService,
            useValue: mockMessageService,
          },
          {
            provide: MatDialogRef,
            useValue: mockMatDialogRef,
          },
          FormBuilder,
        ],
        schemas: [NO_ERRORS_SCHEMA],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(AddBookDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show notification if chapterName is valid and submitForm hits', () => {
    component.bookName.setErrors([]);

    component.submitForm();

    expect(mockNotificationService.showMessage).toHaveBeenCalledWith(
      'Book name field is empty',
      Severity.error
    );
  });

  it('should close dialog if form controllers are valid and submitForm hits', () => {
    component.bookName.setValue('');
    component.addBookForm.setValue({
      bookName: 'fake chapter name',
    });

    component.submitForm();

    expect(mockMatDialogRef.close).toHaveBeenCalledWith(
      component.addBookForm.value
    );
  });
});
