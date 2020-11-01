import { Component, OnInit } from '@angular/core';
import { Book } from '../../../core/models/book.interface';
import { BasicInformationService } from '../../../core/service/basic-information.service';
import { analyticsPackageSafelist } from '@angular/cli/models/analytics';
import { MatDialog } from '@angular/material/dialog';
import { AddEditBookDialogComponent } from './add-edit-book.dialog/add-edit-book.dialog.component';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss'],
})
export class BooksComponent implements OnInit {
  books: Book[] = [];

  constructor(
    private basicInformationService: BasicInformationService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getBooks();
  }

  getBooks(): void {
    this.basicInformationService.getBooks().subscribe(
      (res: Book[]) => {
        this.books = res;
      },
      (res: any) => {
        // Todo: handle error
      }
    );
  }

  openAddEditDialog(book?: Book): void {
    const dialogRef = this.dialog.open(AddEditBookDialogComponent, {
      data: book || null,
    });

    dialogRef.afterClosed().subscribe((res: Book) => {
      if (res) {
        if (res.id) {
          this.editBook(res);
        } else {
          this.addBook(res);
        }
      }
    });
  }

  addBook(book: Book): void {
    this.basicInformationService.addBook(book).subscribe(
      (res: Book) => {
        this.books.push(res);
      },
      (error: any) => {
        // Todo: handle error
      }
    );
  }

  editBook(book: Book): void {
    this.basicInformationService.editBook(book).subscribe(
      (res: Book) => {
        this.getBooks();
      },
      (error: any) => {
        // Todo: handle error
      }
    );
  }

  deleteBook(id: number): void {
    this.basicInformationService.deleteBook(id).subscribe(
      (res: Book) => {
        this.books.splice(this.books.indexOf(res));
      },
      (error: any) => {
        // Todo: handle error
      }
    );
  }
}
