import { Component, OnInit } from '@angular/core';
import { BookModel } from '../../../../core/models/book.model';

@Component({
  selector: 'app-start-game-dialog',
  templateUrl: './start-game-dialog.component.html',
  styleUrls: ['./start-game-dialog.component.scss'],
})
export class StartGameDialogComponent implements OnInit {
  books: BookModel[];
  selectedBook: BookModel;

  constructor() {}

  ngOnInit(): void {
    this.books = [
      { id: 0, name: 'No book, just random', targetLanguageId: 1 },
      { id: 1, name: 'book 1', targetLanguageId: 2 },
      { id: 1, name: 'book 2', targetLanguageId: 4 },
      { id: 1, name: 'book 3', targetLanguageId: 5 },
    ];
    this.selectedBook = this.books[0];
  }
}
