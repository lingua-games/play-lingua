import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { BookModel } from '../../../../core/models/book.model';

@Component({
  selector: 'app-add-edit-book.dialog',
  templateUrl: './add-edit-book.dialog.component.html',
  styleUrls: ['./add-edit-book.dialog.component.scss'],
})
export class AddEditBookDialogComponent implements OnInit {
  book: BookModel = {} as BookModel;

  constructor(
    public dialogRef: MatDialogRef<AddEditBookDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: BookModel
  ) {}

  ngOnInit(): void {
    if (this.data && this.data.id) {
      this.book = JSON.parse(JSON.stringify(this.data));
    }
  }
}
