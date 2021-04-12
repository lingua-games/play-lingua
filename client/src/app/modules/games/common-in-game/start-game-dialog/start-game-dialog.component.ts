import { Component, Inject, OnInit } from '@angular/core';
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
import { animate, style, transition, trigger } from '@angular/animations';
import { GameConfigModel } from '../../../../core/models/game-config-model';
import { GameNameEnum } from '../../../../core/models/game-name.enum';

@Component({
  selector: 'app-start-game-dialog',
  templateUrl: './start-game-dialog.component.html',
  styleUrls: ['./start-game-dialog.component.scss'],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('100ms', style({ opacity: 1 })),
      ]),
      transition(':leave', [
        style({ opacity: 1 }),
        animate('100ms', style({ opacity: 0 })),
      ]),
    ]),
  ],
})
export class StartGameDialogComponent implements OnInit {
  hoveredOption = '';
  selectedOption = '';
  isPreparing?: boolean;

  constructor(
    private router: Router,
    private dialogRef: MatDialogRef<StartGameDialogComponent>,
    private gamesService: GamesService,
    private notificationService: NotificationService,
    private localStorageService: LocalStorageService,
    @Inject(MAT_DIALOG_DATA) public data: GameInformationInterface
  ) {}

  ngOnInit(): void {
    if (this.data.code === GameNameEnum.supperMario) {
      if (
        JSON.parse(
          this.localStorageService.load(LocalStorageHelper.showHelpForMario)
        )
      ) {
        this.selectedOption = 'start';
      } else {
        this.selectedOption = 'help';
      }
    }

    if (this.data.code === GameNameEnum.fallingStars) {
      if (
        JSON.parse(
          this.localStorageService.load(
            LocalStorageHelper.showHelpForFallingStars
          )
        )
      ) {
        this.selectedOption = 'start';
      } else {
        this.selectedOption = 'help';
      }
    }
  }

  showSection(item: string): void {
    this.selectedOption = '';
    setTimeout(() => {
      this.selectedOption = item;
    }, 100);
  }

  showHover(item: string): void {
    if (item === this.selectedOption) {
      return;
    }
    this.hoveredOption = item;
  }

  backToMenu(): void {
    this.router.navigate(['../game-menu']).then();
    this.dialogRef.close();
  }

  submit(form: GameConfigModel): void {
    this.isPreparing = true;
    const result: GameStartInformation<WordKeyValueModel<string[]>[]> = {
      bookId: form.selectedBook ? form.selectedBook.id : 0,
      chapterId: form.selectedChapter ? form.selectedChapter.id : 0,
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
          setTimeout(() => {
            result.words = res;
            this.dialogRef.close(result);
          }, 2000);
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
