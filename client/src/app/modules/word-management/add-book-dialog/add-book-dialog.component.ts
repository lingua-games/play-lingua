import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { LanguageModel } from '../../../core/models/language.model';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import {
  NotificationService,
  Severity,
} from '../../../core/service/notification.service';

@Component({
  selector: 'app-add-book-dialog',
  templateUrl: './add-book-dialog.component.html',
  styleUrls: ['./add-book-dialog.component.scss'],
})
export class AddBookDialogComponent implements OnInit {
  addBookForm = this.formBuilder.group({
    bookName: ['', Validators.required],
  });

  get bookName(): AbstractControl {
    return this.addBookForm.get('bookName');
  }

  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<AddBookDialogComponent>,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {}

  submitForm(): void {
    if (this.bookName.invalid) {
      this.notificationService.showMessage(
        'Book name field is empty',
        Severity.error
      );
    }

    if (this.addBookForm.invalid) {
      return;
    }

    this.dialogRef.close(this.addBookForm.value);
  }
}
