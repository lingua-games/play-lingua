import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { GameConfigModel } from '../../models/game-config-model';
import { BookModel } from '../../models/book.model';
import { ChapterModel } from '../../models/chapter.model';
import { ScoreStorageService } from '../../service/score-storage.service';
import { ScoreStoreInterface } from '../../models/score-store.interface';
import { environment } from '../../../../environments/environment';
import { GameInformationInterface } from '../../models/game-information.interface';
import { RanksResultInterface } from '../../models/ranks-result.interface';
import { ApiResult } from '../../models/api-result.model';
import { SecurityService } from '../../service/security.service';

@Component({
  selector: 'app-ranking',
  templateUrl: './ranking.component.html',
  styleUrls: ['./ranking.component.scss'],
})
export class RankingComponent implements OnInit {
  @Input() form: GameConfigModel = {
    selectedBook: {} as BookModel,
    selectedChapter: {} as ChapterModel,
  };
  @Input() data: GameInformationInterface = {} as GameInformationInterface;
  ranks: ApiResult<RanksResultInterface[]> = new ApiResult<
    RanksResultInterface[]
  >();
  @Output() goToStart = new EventEmitter();

  constructor(
    private scoreStorageService: ScoreStorageService,
    private securityService: SecurityService
  ) {}

  ngOnInit(): void {
    if (this.data.isGameFinished) {
      this.storeRanks();
    } else {
      this.getRanks();
    }
  }

  storeRanks(): void {
    this.ranks.setLoading(true);
    this.scoreStorageService
      .storeScore({
        isFeedback: this.data.isFeedback,
        email: this.data.isFeedback ? this.data.feedbackForm.email : '',
        bookId: this.data.isFeedback
          ? this.data.feedbackForm.book.id
          : this.data.scoreStore.bookId,
        chapterId: this.data.isFeedback
          ? this.data.feedbackForm.chapter.id
          : this.data.scoreStore.chapterId,
        gameName: this.data.isFeedback
          ? this.data.feedbackForm.game
          : this.data.scoreStore.gameName,
        count: environment.recordCount,
      } as ScoreStoreInterface)
      .subscribe(
        (res: RanksResultInterface[]) => {
          this.securityService.setTotalScore(
            this.data.scoreStore.score.toString()
          );
          this.ranks.setData(res);
          for (let i = 0; i < environment.recordCount; i++) {
            if (!this.ranks.data[i]) {
              this.ranks.data[i] = {
                displayName: '-',
                score: 0,
                email: '',
              };
            }
          }
          this.ranks.data.sort((a, b) => {
            return b.score - a.score;
          });
          this.ranks.setLoading(false);
        },
        () => {
          this.ranks.setLoading(false);
        }
      );
  }

  getRanks(): void {
    this.ranks.setLoading(true);
    this.scoreStorageService
      .getTopRanks({
        bookId: this.data.isFeedback
          ? this.data.feedbackForm.book.id
          : this.form.selectedBook.id || null,
        chapterId: this.data.isFeedback
          ? this.data.feedbackForm.chapter.id
          : this.form.selectedChapter.id || null,
        count:
          this.data.isFeedback && this.data.feedbackForm?.count
            ? this.data.feedbackForm.count
            : environment.rankCount,
        gameName: this.data.isFeedback
          ? this.data.feedbackForm.game
          : this.data.gameNameForRanking,
      } as ScoreStoreInterface)
      .subscribe(
        (res: RanksResultInterface[]) => {
          if (res.length === 0) {
            this.ranks.setError('Nobody played yet.');
            return;
          }
          setTimeout(() => {
            this.ranks.setData(res);
            this.ranks.data.sort((a, b) => {
              return b.score - a.score;
            });
          }, 1000);
        },
        () => {
          this.ranks.setError('Unable to get ranks, please try again later');
        }
      );
  }
}
