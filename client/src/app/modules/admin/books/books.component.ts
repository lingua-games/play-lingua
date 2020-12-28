import { Component, OnInit } from '@angular/core';
import { BasicInformationService } from '../../../core/service/basic-information.service';
import { MatDialog } from '@angular/material/dialog';
import { AddEditBookDialogComponent } from './add-edit-book.dialog/add-edit-book.dialog.component';
import { BookModel } from '../../../core/models/book.model';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss'],
})
export class BooksComponent implements OnInit {
  books: BookModel[] = [];

  constructor(
    private basicInformationService: BasicInformationService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getBooks();
  }

  getBooks(): void {
    this.basicInformationService.getBooks().subscribe(
      (res: BookModel[]) => {
        this.books = res;
      },
      (res: any) => {
        // Todo: handle error
      }
    );
  }

  openAddEditDialog(book?: BookModel): void {
    const dialogRef = this.dialog.open(AddEditBookDialogComponent, {
      data: book || null,
    });

    dialogRef.afterClosed().subscribe((res: BookModel) => {
      if (res) {
        if (res.id) {
          this.editBook(res);
        } else {
          this.addBook(res);
        }
      }
    });
  }

  addBook(book: BookModel): void {
    this.basicInformationService.addBook(book).subscribe(
      (res: BookModel) => {
        this.books.push(res);
      },
      (error: any) => {
        // Todo: handle error
      }
    );
  }

  editBook(book: BookModel): void {
    this.basicInformationService.editBook(book).subscribe(
      (res: BookModel) => {
        this.getBooks();
      },
      (error: any) => {
        // Todo: handle error
      }
    );
  }

  deleteBook(id: number): void {
    this.basicInformationService.deleteBook(id).subscribe(
      (res: BookModel) => {
        this.books.splice(this.books.indexOf(res));
      },
      (error: any) => {
        // Todo: handle error
      }
    );
  }
}
