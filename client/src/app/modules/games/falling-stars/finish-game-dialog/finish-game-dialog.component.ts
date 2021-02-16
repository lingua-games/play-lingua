import { Component, Inject, OnInit } from '@angular/core';
import { ScoreStoreInterface } from '../../../../core/models/score-store.interface';
import { ScoreStorageService } from '../../../../core/service/score-storage.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-finish-game-dialog',
  templateUrl: './finish-game-dialog.component.html',
  styleUrls: ['./finish-game-dialog.component.scss'],
})
export class FinishGameDialogComponent implements OnInit {
  constructor(
    private scoreStorageService: ScoreStorageService,
    @Inject(MAT_DIALOG_DATA) public data: ScoreStoreInterface
  ) {}

  ngOnInit(): void {
    this.scoreStorageService.storeScore({
      bookId: this.data.bookId,
      chapterId: this.data.chapterId,
      gameName: 'falling-stars',
    } as ScoreStoreInterface);
  }
}
