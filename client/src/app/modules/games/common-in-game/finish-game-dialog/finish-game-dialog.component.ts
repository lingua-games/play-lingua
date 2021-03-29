import { Component, HostListener, Inject, OnInit } from '@angular/core';
import { ScoreStoreInterface } from '../../../../core/models/score-store.interface';
import { ScoreStorageService } from '../../../../core/service/score-storage.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { RanksResultInterface } from '../../../../core/models/ranks-result.interface';
import { SecurityService } from '../../../../core/service/security.service';
import { FinishGameActionEnum } from '../../../../core/models/finish-game-action.enum';
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'app-finish-game-dialog',
  templateUrl: './finish-game-dialog.component.html',
  styleUrls: ['./finish-game-dialog.component.scss'],
})
export class FinishGameDialogComponent implements OnInit {
  isLoading?: boolean;
  ranks: RanksResultInterface[] = [];

  @HostListener('document:keydown ', ['$event'])
  keyDownEvent(event: KeyboardEvent): void {
    if (event.code === 'Escape') {
      this.changeMode();
    }
    if (event.code === 'Enter' || event.code === 'NumpadEnter') {
      this.retry();
    }
  }

  constructor(
    private scoreStorageService: ScoreStorageService,
    @Inject(MAT_DIALOG_DATA) public data: ScoreStoreInterface,
    private securityService: SecurityService,
    private dialogRef: MatDialogRef<FinishGameDialogComponent>
  ) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.ranks = [];
    this.scoreStorageService
      .storeScore({
        bookId: this.data.bookId,
        chapterId: this.data.chapterId,
        gameName: this.data.gameName,
        count: environment.recordCount,
      } as ScoreStoreInterface)
      .subscribe(
        (res: RanksResultInterface[]) => {
          this.securityService.setTotalScore(this.data.score.toString());
          this.ranks.push(...res);
          for (let i = 0; i < environment.recordCount; i++) {
            if (!this.ranks[i]) {
              this.ranks[i] = {
                displayName: '-',
                score: 0,
                email: '',
              };
            }
          }
          this.ranks.sort((a, b) => {
            return b.score - a.score;
          });
          this.isLoading = false;
        },
        () => {
          this.isLoading = false;
        }
      );
  }

  getWinnerStyles(rank: RanksResultInterface): string {
    let result = '';
    if (!rank) {
      return '';
    }

    if (rank.email === this.securityService?.getTokenInformation()?.email) {
      result = 'current-user ';
    }

    switch (this.ranks.indexOf(rank)) {
      case 0:
        return result + 'rank-gold';
      case 1:
        return result + 'rank-silver';
      case 2:
        return result + 'rank-bronze';
      default:
        return result + 'rank-normal';
    }
  }

  changeMode(): void {
    this.dialogRef.close(FinishGameActionEnum.changeMode);
  }

  retry(): void {
    this.dialogRef.close(FinishGameActionEnum.retry);
  }

  getRankWidth(rank: RanksResultInterface): string {
    return this.ranks.indexOf(rank) < 3 ? '41%' : '43%';
  }
}
