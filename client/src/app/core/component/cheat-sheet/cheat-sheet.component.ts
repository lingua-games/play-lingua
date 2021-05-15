import { Component, Input, OnInit } from '@angular/core';
import { GameConfigModel } from '../../models/game-config-model';
import { BookModel } from '../../models/book.model';
import { ChapterModel } from '../../models/chapter.model';
import { environment } from '../../../../environments/environment';
import { LocalStorageHelper } from '../../models/local-storage.enum';
import { GetGameWordsRequestModel } from '../../models/get-game-words-request.model';
import { GamesService } from '../../service/games.service';
import { GameInformationInterface } from '../../models/game-information.interface';
import { LocalStorageService } from '../../service/local-storage.service';
import {
  TranslateModel,
  WordKeyValueModel,
} from '../../models/word-key-value.model';
import { ApiResult } from '../../models/api-result.model';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-cheat-sheet',
  templateUrl: './cheat-sheet.component.html',
  styleUrls: ['./cheat-sheet.component.scss'],
  animations: [
    trigger('fade', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('900ms', style({ opacity: 1 })),
      ]),
    ]),
  ],
})
export class CheatSheetComponent implements OnInit {
  @Input() form: GameConfigModel = {
    selectedBook: {} as BookModel,
    selectedChapter: {} as ChapterModel,
  };
  @Input() data: GameInformationInterface = {} as GameInformationInterface;

  words: ApiResult<WordKeyValueModel<TranslateModel[]>[]> = new ApiResult<
    WordKeyValueModel<TranslateModel[]>[]
  >();

  constructor(
    private gamesService: GamesService,
    private localStorageService: LocalStorageService
  ) {}

  ngOnInit(): void {
    this.getWords();
  }

  getWords(): void {
    this.words.setLoading(true);
    this.gamesService
      .getGameWords({
        bookId: this.form.selectedBook?.id,
        chapterId: this.form.selectedChapter.id,
        count:
          this.data.isFeedback && this.data.feedbackForm?.count
            ? this.data.feedbackForm.count
            : environment.startGameCount,
        defaultTargetLanguage: this.data.isFeedback
          ? this.data.feedbackForm.targetLanguage.id
          : JSON.parse(
              this.localStorageService.load(LocalStorageHelper.defaultLanguages)
            ).defaultTargetLanguage.id,
        defaultBaseLanguage: this.data.isFeedback
          ? this.data.feedbackForm.baseLanguage.id
          : JSON.parse(
              this.localStorageService.load(LocalStorageHelper.defaultLanguages)
            ).defaultBaseLanguage.id,
      } as GetGameWordsRequestModel)
      .subscribe(
        (res: WordKeyValueModel<TranslateModel[]>[]) => {
          if (res && res.length) {
            this.words.setData(res);
            this.words.setLoading(false);
          }
        },
        () => {
          // Todo, handle error
          this.words.setLoading(false);
        }
      );
  }
}
