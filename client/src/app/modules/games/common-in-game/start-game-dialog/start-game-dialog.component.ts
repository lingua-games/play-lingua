import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { GamesService } from '../../../../core/service/games.service';
import {
  TranslateModel,
  WordKeyValueModel,
} from '../../../../core/models/word-key-value.model';
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
import { BookModel } from '../../../../core/models/book.model';
import { ChapterModel } from '../../../../core/models/chapter.model';
import { InvitationService } from '../../../../core/service/invitation.service';
import { InvitationForm } from '../../../../core/models/invitation-form.interface';

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
  form: GameConfigModel = {
    selectedBook: {} as BookModel,
    selectedChapter: {} as ChapterModel,
  };
  isFeedbackLoading = false;

  constructor(
    private router: Router,
    private dialogRef: MatDialogRef<StartGameDialogComponent>,
    private gamesService: GamesService,
    private notificationService: NotificationService,
    private localStorageService: LocalStorageService,
    @Inject(MAT_DIALOG_DATA) public data: GameInformationInterface,
    private invitationService: InvitationService
  ) {}

  ngOnInit(): void {
    if (this.data.isGameFinished) {
      this.selectedOption = 'ranking';
    } else {
      this.selectedOption = 'start';
    }

    if (this.data.isFeedback) {
      this.isFeedbackLoading = true;
      this.getInvitationInformation();
    }
    // Todo, comment below
    // this.submit();
  }

  getInvitationInformation(): void {
    this.invitationService
      .getInvitation(this.data.feedbackForm.uniqueKey)
      .subscribe(
        (res: InvitationForm) => {
          this.data.feedbackForm = res;
          setTimeout(() => {
            this.isFeedbackLoading = false;
          }, 1000);
        },
        () => {
          // Todo, handle error
          this.notificationService.showMessage(
            'Failed to get information, please try again',
            Severity.error
          );
          this.isFeedbackLoading = false;
        }
      );
    this.invitationService.setAsOpen(this.data.feedbackForm).subscribe();
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

  submit(): void {
    this.isPreparing = true;
    let result: GameStartInformation<WordKeyValueModel<TranslateModel[]>[]>;

    if (this.data.isFeedback) {
      result = {
        bookId: this.data.feedbackForm.book.id,
        chapterId: this.data.feedbackForm.chapter.id,
        words: [],
      };
    } else {
      result = {
        bookId: this.form.selectedBook ? this.form.selectedBook.id : 0,
        chapterId: this.form.selectedChapter ? this.form.selectedChapter.id : 0,
        words: [],
      };
    }

    this.gamesService
      .getGameWords({
        bookId: result.bookId,
        chapterId: result.chapterId,
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
          if (res.length === 0) {
            this.notificationService.showMessage(
              'No word has added with this condition yet',
              Severity.error
            );
            this.isPreparing = false;
            return;
          }
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
