import { Component, OnInit } from '@angular/core';
import { Book } from '../../../../core/models/book.interface';
import { BasicInformationService } from '../../../../core/service/basic-information.service';
import { EGame } from '../../../../core/models/e-game';
import { GameHint } from '../../../../core/models/game-hint.interface';

@Component({
  selector: 'app-start-game-dialog',
  templateUrl: './start-game-dialog.component.html',
  styleUrls: ['./start-game-dialog.component.scss'],
})
export class StartGameDialogComponent implements OnInit {
  books: Book[];
  selectedBook: Book;

  constructor() {}

  ngOnInit(): void {
    this.books = [
      { id: 0, name: 'No book, just random', targetLanguage: 'nothing' },
      { id: 1, name: 'book 1', targetLanguage: 'something' },
      { id: 1, name: 'book 2', targetLanguage: 'something' },
      { id: 1, name: 'book 3', targetLanguage: 'something' },
    ];
    this.selectedBook = this.books[0];
  }
}
