import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { LanguageModel } from '../../../core/models/language.model';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import {
  NotificationService,
  Severity,
} from '../../../core/service/notification.service';

@Component({
  selector: 'app-add-chapter-dialog',
  templateUrl: './add-chapter-dialog.component.html',
  styleUrls: ['./add-chapter-dialog.component.scss'],
})
export class AddChapterDialogComponent implements OnInit {
  addChapterForm = this.formBuilder.group({
    chapterName: ['', Validators.required],
  });

  get chapterName(): AbstractControl {
    return this.addChapterForm.get('chapterName');
  }

  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<AddChapterDialogComponent>,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {}

  submitForm(): void {
    if (this.chapterName.invalid) {
      this.notificationService.showMessage(
        'Chapter name is empty',
        Severity.error
      );
    }

    if (this.addChapterForm.invalid) {
      return;
    }

    this.dialogRef.close(this.addChapterForm.value);
  }
}