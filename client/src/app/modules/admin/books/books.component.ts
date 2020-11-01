import { Component, OnInit } from '@angular/core';
import { Book } from '../../../core/models/book.interface';
import { BasicInformationService } from '../../../core/service/basic-information.service';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss'],
})
export class BooksComponent implements OnInit {
  books: Book[] = [];

  constructor(private basicInformationService: BasicInformationService) {}

  ngOnInit(): void {
    this.books.push({ id: '1', name: 'test test' });
  }

  addBook(): void {
    this.basicInformationService
      .addBook({ id: '2', name: 'My first book' })
      .subscribe((res: any) => {
        console.log(res);
      });
  }
}
