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
import { InvitationService } from '../../../core/service/invitation.service';
import { UUID } from 'angular2-uuid';
import { environment } from '../../../../environments/environment.prod';
import { DomSanitizer } from '@angular/platform-browser';

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
    private invitationService: InvitationService,
    private sanitizer: DomSanitizer
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

    // this.form = {
    //   playerName: 'Arash Bahreini',
    //   email: 'vbhost@gmail.com',
    //   baseLanguage: { name: 'English', id: 1 },
    //   targetLanguage: { name: 'Dutch', id: 1 },
    //   game: 'Falling stars',
    //   gameObj: { name: 'something' },
    // } as InvitationForm;
    // this.preview();
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
    const template = `
<div style='
            background-color: #229954;
            border: 1px solid #E5E7E9;
            border-radius: 10px;
            padding: 20px;
            color: #E5E7E9;
            margin: 5vh 30%;
            width: 40%;
            font-size: 1vw'>
      <p>Dear ${this.form.playerName},</p>
      <hr>
      <p>
        This is Arash and I am happy to invite you to play my web based game <span style='font-style: italic'>"${this.form.gameObj.name}"</span>
        <a style='text-decoration: underline' href='${this.form.generatedLink}'>via this link</a>
        and I would be really grateful if you let me have your opinion for further improvements.
      </p>
      <p>
        In this game, the initial assumption is that you know ${this.form.baseLanguage.name} as your base language and you would like to
        practice ${this.form.targetLanguage.name} as your target language.
      </p>
      <p>
        Please send me your feedback by replying to this email or simply give me a call.
      </p>
      <p>
        Thanks in advance for your time and valuable feedback.
      </p>
      <p>
        The source code can be found on
        <a style='text-decoration: underline; color: #E5E7E9' href='https://github.com/lingua-games/play-lingua'>Github</a>
      </p>
      <hr>
      <p>
      Best regards, <br>Arash<br> +31645241080 <br>
      <a style='text-decoration: underline; color: #E5E7E9' href='https://github.com/arashbahreini'>Github</a>,
      <a style='text-decoration: underline; color: #E5E7E9' href='https://www.linkedin.com/in/arash-bahreini-100296139/'>Linkedin</a>,
      <a style='text-decoration: underline; color: #E5E7E9' href='https://stackoverflow.com/users/3773888/arash'>Stackoverflow</a>
</p>
</div>

      `;

    this.form.html = this.sanitizer.bypassSecurityTrustHtml(template);
    this.form.htmlText = template;
  }

  generateLink(): string {
    this.form.htmlText = '';
    this.form.generatedLink = '';
    this.form.uniqueKey = UUID.UUID();

    // Todo, change localhost to real domain
    return `${environment.productionUrl}/#/games/feedback/${this.form.gameObj.gameNameForRanking}/${this.form.uniqueKey}`;
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
