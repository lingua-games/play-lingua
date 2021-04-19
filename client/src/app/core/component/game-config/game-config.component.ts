import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BookModel } from '../../models/book.model';
import { BookChapterService } from '../../service/book-chapter.service';
import { LanguageModel } from '../../models/language.model';
import { LocalStorageHelper } from '../../models/local-storage.enum';
import { LocalStorageService } from '../../service/local-storage.service';
import { ChapterModel } from '../../models/chapter.model';
import { GameConfigModel } from '../../models/game-config-model';
import { GameInformationInterface } from '../../models/game-information.interface';

@Component({
  selector: 'app-game-config',
  templateUrl: './game-config.component.html',
  styleUrls: ['./game-config.component.scss'],
})
export class GameConfigComponent implements OnInit {
  @Input() data: GameInformationInterface = {} as GameInformationInterface;
  @Input() isPreparing?: boolean;
  @Input() form: GameConfigModel = {
    selectedBook: {} as BookModel,
    selectedChapter: {} as ChapterModel,
  };

  @Output() submitEmitter = new EventEmitter();

  bookListLoading = false;
  chapters: ChapterModel[] = [];
  chapterListLoading = false;
  defaultLanguages?: {
    defaultBaseLanguage: LanguageModel;
    defaultTargetLanguage: LanguageModel;
  } = {
    defaultBaseLanguage: {} as LanguageModel,
    defaultTargetLanguage: {} as LanguageModel,
  };
  books: BookModel[] = [];

  constructor(
    private bookChapterService: BookChapterService,
    private localStorageService: LocalStorageService
  ) {}

  ngOnInit(): void {
    if (!this.data.isFeedback) {
      this.defaultLanguages = JSON.parse(
        this.localStorageService.load(LocalStorageHelper.defaultLanguages)
      );
      this.getBooks();
    }
  }

  getBooks(): void {
    if (!this.defaultLanguages) {
      return;
    }
    this.bookListLoading = true;
    this.bookChapterService
      .getBooksBySourceAndTargetLanguageId(
        this.defaultLanguages.defaultBaseLanguage.id,
        this.defaultLanguages.defaultTargetLanguage.id
      )
      .subscribe(
        (res: BookModel[]) => {
          this.bookListLoading = false;
          this.books.push({
            id: 0,
            name: 'No book, just random',
            targetLanguageId: 0,
            sourceLanguageId: 0,
          });
          this.books = this.books.concat(res);
          this.form.selectedBook = this.books[0];
        },
        () => {
          this.bookListLoading = false;
        }
      );
  }

  getChapters(selectedBook: BookModel): void {
    if (!selectedBook.id) {
      return;
    }
    this.chapterListLoading = true;
    this.chapters = [];
    this.bookChapterService.getChaptersByBookId(selectedBook.id).subscribe(
      (res: ChapterModel[]) => {
        this.chapterListLoading = false;
        this.chapters.push({
          id: 0,
          name: 'No chapter, just random',
        });
        this.chapters = this.chapters.concat(res);
        this.form.selectedChapter = this.chapters[0];
      },
      () => {
        this.chapterListLoading = false;
      }
    );
  }
}
