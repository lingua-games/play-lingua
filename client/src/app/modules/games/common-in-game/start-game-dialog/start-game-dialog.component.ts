import { Component, Inject, OnInit } from '@angular/core';
import { BookModel } from '../../../../core/models/book.model';
import { BookChapterService } from '../../../../core/service/book-chapter.service';
import { LanguageModel } from '../../../../core/models/language.model';
import { ChapterModel } from '../../../../core/models/chapter.model';
import { Router } from '@angular/router';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { GamesService } from '../../../../core/service/games.service';
import { WordKeyValueModel } from '../../../../core/models/word-key-value.model';
import { environment } from '../../../../../environments/environment';
import {
  NotificationService,
  Severity,
} from '../../../../core/service/notification.service';
import { GameStartInformation } from '../../../../core/models/game-start-information';
import { GameInformationInterface } from '../../../../core/models/game-information.interface';
import { LocalStorageHelper } from '../../../../core/models/local-storage.enum';
import { GetGameWordsRequestModel } from '../../../../core/models/get-game-words-request.model';
import { LocalStorageService } from '../../../../core/service/local-storage.service';

@Component({
  selector: 'app-start-game-dialog',
  templateUrl: './start-game-dialog.component.html',
  styleUrls: ['./start-game-dialog.component.scss'],
})
export class StartGameDialogComponent implements OnInit {
  books: BookModel[] = [];
  chapters: ChapterModel[] = [];
  isPreparing: boolean;

  form = {
    selectedBook: new BookModel(),
    selectedChapter: new ChapterModel(),
  };

  defaultLanguages: {
    defaultBaseLanguage: LanguageModel;
    defaultTargetLanguage: LanguageModel;
  } = JSON.parse(
    this.localStorageService.load(LocalStorageHelper.defaultLanguages)
  );

  constructor(
    private bookChapterService: BookChapterService,
    private router: Router,
    private dialogRef: MatDialogRef<StartGameDialogComponent>,
    private gamesService: GamesService,
    private notificationService: NotificationService,
    private localStorageService: LocalStorageService,
    @Inject(MAT_DIALOG_DATA) public data: GameInformationInterface
  ) {}

  ngOnInit(): void {
    this.getBooks();
    this.submit();
  }

  getBooks(): void {
    this.bookChapterService
      .getBooksBySourceAndTargetLanguageId(
        this.defaultLanguages.defaultBaseLanguage.id,
        this.defaultLanguages.defaultTargetLanguage.id
      )
      .subscribe(
        (res: BookModel[]) => {
          this.books.push({
            id: 0,
            name: 'No book, just random',
            targetLanguageId: 0,
            sourceLanguageId: 0,
          });
          this.books = this.books.concat(res);
          this.form.selectedBook = this.books[0];
        },
        () => {}
      );
  }

  getChapters(selectedBook: BookModel): void {
    this.chapters = [];
    this.bookChapterService
      .getChaptersByBookId(selectedBook.id)
      .subscribe((res: ChapterModel[]) => {
        this.chapters.push({
          id: 0,
          name: 'No chapter, just random',
        });
        this.chapters = this.chapters.concat(res);
        this.form.selectedChapter = this.chapters[0];
      });
  }

  backToMenu(): void {
    this.router.navigate(['../game-menu']).then();
    this.dialogRef.close();
  }

  submit(): void {
    this.isPreparing = true;
    const result: GameStartInformation<WordKeyValueModel<string[]>[]> = {
      bookId: this.form.selectedBook ? this.form.selectedBook.id : 0,
      chapterId: this.form.selectedChapter ? this.form.selectedChapter.id : 0,
      words: [],
    };

    this.gamesService
      .getGameWords({
        bookId: result.bookId,
        chapterId: result.chapterId,
        count: environment.startGameCount,
        defaultTargetLanguage: JSON.parse(
          this.localStorageService.load(LocalStorageHelper.defaultLanguages)
        ).defaultTargetLanguage.id,
        defaultBaseLanguage: JSON.parse(
          this.localStorageService.load(LocalStorageHelper.defaultLanguages)
        ).defaultBaseLanguage.id,
      } as GetGameWordsRequestModel)
      .subscribe(
        (res: WordKeyValueModel<string[]>[]) => {
          result.words = res;
          this.dialogRef.close(result);
        },
        () => {
          this.notificationService.showMessage(
            'Unexpected error',
            Severity.error
          );
          this.isPreparing = false;
        }
      );
  }
}
