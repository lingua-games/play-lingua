import { Component, OnInit } from '@angular/core';
import { LanguageModel } from '../../../core/models/language.model';
import {
  NotificationService,
  Severity,
} from '../../../core/service/notification.service';
import { BasicInformationService } from '../../../core/service/basic-information.service';
import { ApiResult } from '../../../core/models/api-result.model';
import { InvitationForm } from '../../../core/models/invitation-form.interface';
import { BookModel } from '../../../core/models/book.model';
import { BookChapterService } from '../../../core/service/book-chapter.service';
import { ChapterModel } from '../../../core/models/chapter.model';
import { GamesService } from '../../../core/service/games.service';
import { GameInformationInterface } from '../../../core/models/game-information.interface';
import { LocalStorageService } from '../../../core/service/local-storage.service';
import { secretKeys } from '../../../../environments/secret';
import { InvitationService } from '../../../core/service/invitation.service';

@Component({
  selector: 'app-send-invitation',
  templateUrl: './send-invitation.component.html',
  styleUrls: ['./send-invitation.component.scss'],
})
export class SendInvitationComponent implements OnInit {
  constructor(
    private basicInformationService: BasicInformationService,
    private notificationService: NotificationService,
    private bookChapterService: BookChapterService,
    private gameService: GamesService,
    private localStorageService: LocalStorageService,
    private invitationService: InvitationService
  ) {}

  allLanguages: ApiResult<LanguageModel[]> = new ApiResult<LanguageModel[]>();
  form = {} as InvitationForm;
  books: ApiResult<BookModel[]> = new ApiResult<BookModel[]>();
  chapters: ApiResult<ChapterModel[]> = new ApiResult<ChapterModel[]>();
  previewText = '';
  games: GameInformationInterface[] = [];
  isFormLoading = false;

  ngOnInit(): void {
    this.getLanguages();
    this.getGames();
  }

  getGames(): void {
    this.games = this.gameService.getGames();
  }

  getLanguages(): void {
    this.allLanguages.setLoading(true);
    this.basicInformationService.getAllLanguages().subscribe(
      (res: LanguageModel[]) => {
        this.allLanguages.setData(res);
      },
      () => {
        this.notificationService.showMessage(
          'Failed to load languages',
          Severity.error
        );
        this.allLanguages.setLoading(false);
      }
    );
  }

  getBooks(data: {
    targetLanguage: LanguageModel;
    baseLanguage: LanguageModel;
  }): void {
    if (!data.targetLanguage || !data.baseLanguage) {
      return;
    }
    this.books.setLoading(true);
    this.bookChapterService
      .getBooksByLanguage(
        this.form.targetLanguage.id,
        this.form.baseLanguage.id
      )
      .subscribe(
        (res: BookModel[]) => {
          this.books.setData(res);
          this.books.setLoading(false);
        },
        () => {
          this.books.setLoading(false);
        }
      );
  }

  getChapters(bookId: number): void {
    this.chapters.setLoading(true);
    this.bookChapterService.getChaptersByBookId(bookId).subscribe(
      (res: ChapterModel[]) => {
        this.chapters.setData(res);
        this.chapters.setLoading(false);
      },
      () => {
        this.chapters.setLoading(false);
      }
    );
  }

  isFormValid(): boolean {
    let result = true;
    if (!this.form.email) {
      this.notificationService.showMessage('Email is empty', Severity.error);
      result = false;
    }

    if (!this.form.baseLanguage) {
      this.notificationService.showMessage(
        'Base language is empty',
        Severity.error
      );
      result = false;
    }

    if (!this.form.targetLanguage) {
      this.notificationService.showMessage(
        'Target language is empty',
        Severity.error
      );
      result = false;
    }

    if (!this.form.gameObj) {
      this.notificationService.showMessage('Game is empty', Severity.error);
      result = false;
    }

    if (!this.form.playerName) {
      this.notificationService.showMessage(
        'Player name is empty',
        Severity.error
      );
      result = false;
    }

    return result;
  }

  preview(): void {
    if (!this.isFormValid()) {
      return;
    }

    this.form.generatedLink = this.generateLink();
    this.form.htmlText = `
      <h1>Hello, Im Arash and here I am inviting you to play my web-base game and give me feedback</h1>
      <h3>Dear <strong>${this.form.playerName}</strong>, thanks for joining to our feedback session</h3>
      <p>In this session you will play
        <strong>${this.form.gameObj.name}</strong> game.
        <strong>${this.form.gameObj.name}</strong> assums that you know
        <strong>${this.form.baseLanguage.name}</strong> very well and you want to learn
        <strong>${this.form.targetLanguage.name}</strong> language.
      </p>
      `;
    if (this.form.count && this.form.count > 0) {
      this.form.htmlText += `<p>
        In this session you will play only
        <strong>${this.form.count}</strong> words and you can
        <a href='${this.form.generatedLink}'>join via This Link</a>
      </p>`;
    } else {
      this.form.htmlText += `<p>You can <a href='${this.generateLink()}'>join via This Link</a></p>`;
    }
    this.form.htmlText += `
          <p>
        Please send back your comments, feedbacks and etc with <strong>replying</strong> this email or if you want to
        talk more about it, you can always give me a call through my phone number i.e <strong>+31-6-4524-1080</strong>
      </p>
      <p>
        PS, please remember that you are helping me a lot to progress my project. Thanks :-)
      </p>
    `;
  }

  generateLink(): string {
    const encryptedForm = this.localStorageService.encryptData(
      this.form,
      secretKeys.feedbackInvitationPrivateKey
    );
    return `http://localhost:4000/#/games/${this.form.gameObj.gameNameForRanking}/${encryptedForm}`;
  }

  submit(): void {
    // In this method a generated code by front-end would send to backend
    // and store in DB like this www.domain.com/game-name/code=GENERATED-CODE
    // In the target page, this generated code will decode by the key which is stored in
    // Environment
    if (!this.isFormValid()) {
      return;
    }

    this.isFormLoading = true;
    this.form.game = this.form.gameObj.gameNameForRanking;
    this.invitationService.send(this.form).subscribe(
      () => {
        this.notificationService.showMessage('successful', Severity.success);
        this.isFormLoading = false;
      },
      () => {
        this.notificationService.showMessage(
          'Failed to send invitation',
          Severity.error
        );
        this.isFormLoading = false;
      }
    );
  }
}
