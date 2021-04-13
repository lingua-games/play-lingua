import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { GameConfigModel } from '../../models/game-config-model';
import { BookModel } from '../../models/book.model';
import { ChapterModel } from '../../models/chapter.model';
import { ScoreStorageService } from '../../service/score-storage.service';
import { ScoreStoreInterface } from '../../models/score-store.interface';
import { environment } from '../../../../environments/environment';
import { GameInformationInterface } from '../../models/game-information.interface';
import { RanksResultInterface } from '../../models/ranks-result.interface';
import { ResultModel } from '../../models/result-model';

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
  ranks: ResultModel<RanksResultInterface[]> = new ResultModel<
    RanksResultInterface[]
  >();
  @Output() goToStart = new EventEmitter();

  constructor(private scoreStorageService: ScoreStorageService) {}

  ngOnInit(): void {
    this.getRanks();
  }

  getRanks(): void {
    this.ranks.setLoading();
    this.scoreStorageService
      .getTopRanks({
        bookId: this.form.selectedBook.id || null,
        chapterId: this.form.selectedChapter.id || null,
        count: environment.rankCount,
        gameName: this.data.gameNameForRanking,
      } as ScoreStoreInterface)
      .subscribe(
        (res: RanksResultInterface[]) => {
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
