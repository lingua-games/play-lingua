import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Book } from '../../../../core/models/book.interface';

@Component({
  selector: 'app-add-edit-book.dialog',
  templateUrl: './add-edit-book.dialog.component.html',
  styleUrls: ['./add-edit-book.dialog.component.scss'],
})
export class AddEditBookDialogComponent implements OnInit {
  book: Book = {} as Book;

  constructor(
    public dialogRef: MatDialogRef<AddEditBookDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Book
  ) {}

  ngOnInit(): void {
    if (this.data && this.data.id) {
      this.book = JSON.parse(JSON.stringify(this.data));
    }
  }
}
