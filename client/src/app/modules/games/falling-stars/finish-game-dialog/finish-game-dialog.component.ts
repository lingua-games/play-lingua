import { Component, Inject, OnInit } from '@angular/core';
import { ScoreStoreInterface } from '../../../../core/models/score-store.interface';
import { ScoreStorageService } from '../../../../core/service/score-storage.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RanksResultInterface } from '../../../../core/models/ranks-result.interface';
import { SecurityService } from '../../../../core/service/security.service';

@Component({
  selector: 'app-finish-game-dialog',
  templateUrl: './finish-game-dialog.component.html',
  styleUrls: ['./finish-game-dialog.component.scss'],
})
export class FinishGameDialogComponent implements OnInit {
  isLoading: boolean;
  ranks: RanksResultInterface[];
  constructor(
    private scoreStorageService: ScoreStorageService,
    @Inject(MAT_DIALOG_DATA) public data: ScoreStoreInterface,
    private securityService: SecurityService
  ) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.ranks = [];
    this.scoreStorageService
      .storeScore({
        bookId: this.data.bookId,
        chapterId: this.data.chapterId,
        gameName: 'falling-stars',
      } as ScoreStoreInterface)
      .subscribe(
        (res: RanksResultInterface[]) => {
          this.ranks.push({
            score: this.scoreStorageService.getCachedScores(),
            name: this.securityService.getTokenInformation().email,
          });
          this.ranks.push(...res);
          this.ranks.sort((a, b) => {
            return b.score - a.score;
          });
          this.isLoading = false;
        },
        (error: any) => {
          this.isLoading = false;
        }
      );
  }

  getWinnerStyles(rank: RanksResultInterface): string {
    if (!rank) {
      return '';
    }

    switch (this.ranks.indexOf(rank)) {
      case 0:
        return 'rank-gold';
        break;
      case 1:
        return 'rank-silver';
        break;
      case 2:
        return 'rank-bronze';
        break;
      default:
        return 'rank-normal';
        break;
    }
  }
}
