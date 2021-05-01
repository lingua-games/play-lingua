import {
  Component,
  EventEmitter,
  HostListener,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { BookModel } from '../../models/book.model';
import { BookChapterService } from '../../service/book-chapter.service';
import { LanguageModel } from '../../models/language.model';
import { LocalStorageHelper } from '../../models/local-storage.enum';
import { LocalStorageService } from '../../service/local-storage.service';
import { ChapterModel } from '../../models/chapter.model';
import { GameConfigModel } from '../../models/game-config-model';
import { GameInformationInterface } from '../../models/game-information.interface';
import { GamesService } from '../../service/games.service';
import { GetGameWordsRequestModel } from '../../models/get-game-words-request.model';
import { ApiResult } from '../../models/api-result.model';

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

  @Output() goToHelp = new EventEmitter();
  @Output() submitEmitter = new EventEmitter();

  wordCount: ApiResult<number> = new ApiResult<number>();
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

  @HostListener('document:keydown ', ['$event'])
  keyDownEvent(event: KeyboardEvent): void {
    if (event.code === 'Enter' || event.code === 'NumpadEnter') {
      this.submitEmitter.emit(this.form);
    }
  }

  constructor(
    private bookChapterService: BookChapterService,
    private localStorageService: LocalStorageService,
    private gameService: GamesService
  ) {}

  ngOnInit(): void {
    this.getGameCountWords();
    if (!this.data.isFeedback) {
      this.defaultLanguages = JSON.parse(
        this.localStorageService.load(LocalStorageHelper.defaultLanguages)
      );
      this.getBooks();
      this.getGameCountWords();
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
            baseLanguageId: 0,
          });
          this.books = this.books.concat(res);
          this.form.selectedBook = this.books[0];
        },
        () => {
          this.bookListLoading = false;
        }
      );
  }

  getGameCountWords(): void {
    this.wordCount.setLoading(true);
    const serviceParameters = {} as GetGameWordsRequestModel;

    if (this.data.isFeedback) {
      serviceParameters.bookId = this.data.feedbackForm.book.id;
      serviceParameters.chapterId = this.data.feedbackForm.chapter.id;
      serviceParameters.defaultTargetLanguage = this.data.feedbackForm.targetLanguage.id;
      serviceParameters.defaultBaseLanguage = this.data.feedbackForm.baseLanguage.id;
    } else {
      if (this.form.selectedBook) {
        serviceParameters.bookId = this.form.selectedBook.id;
      }
      if (this.form.selectedChapter) {
        serviceParameters.chapterId = this.form.selectedChapter.id;
      }
      serviceParameters.defaultTargetLanguage = JSON.parse(
        this.localStorageService.load(LocalStorageHelper.defaultLanguages)
      ).defaultTargetLanguage.id;
      serviceParameters.defaultBaseLanguage = JSON.parse(
        this.localStorageService.load(LocalStorageHelper.defaultLanguages)
      ).defaultBaseLanguage.id;
    }

    this.gameService
      .getGameCountWords(serviceParameters)
      .subscribe((res: number) => {
        this.wordCount.setData(res);
      });
  }

  getChapters(selectedBook: BookModel): void {
    this.getGameCountWords();
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
