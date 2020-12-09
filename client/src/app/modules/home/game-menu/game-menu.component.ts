import { GameMenu } from '../../../core/models/game.menu.model';
import { Component, OnInit } from '@angular/core';
import { BasicInformationService } from '../../../core/service/basic-information.service';
import { Router } from '@angular/router';
import { WordService } from '../../../core/service/word.service';
import { ApiResult } from '../../../core/models/api-result.model';
import { SelectedLanguageInquiryModel } from '../../../core/models/selected-language-inquiry.model';
import {
  NotificationService,
  Severity,
} from '../../../core/service/notification.service';
import { LanguageModel } from '../../../core/models/language.model';
import { InquiryResultModel } from '../../../core/models/inquiry-result.model';
import { SecurityService } from '../../../core/service/security.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { SelectDefaultLanguageDialogComponent } from '../../../core/dialogs/select-default-language-dialog/select-default-language-dialog.component';

@Component({
  selector: 'app-game-menu',
  templateUrl: './game-menu.component.html',
  styleUrls: ['./game-menu.component.scss'],
})
export class GameMenuComponent implements OnInit {
  gameMenus: GameMenu[] = [];
  selectedLanguages: { base: LanguageModel[]; target: LanguageModel[] } = {
    base: [],
    target: [],
  };
  inquiryResult: ApiResult<InquiryResultModel> = new ApiResult<
    InquiryResultModel
  >();

  constructor(
    private router: Router,
    private basicInformationService: BasicInformationService,
    private wordService: WordService,
    private notificationService: NotificationService,
    private securityService: SecurityService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.selectedLanguages = JSON.parse(
      localStorage.getItem('lingua-selected-languages')
    );
    if (
      !this.selectedLanguages ||
      !this.selectedLanguages.base ||
      !this.selectedLanguages.target
    ) {
      localStorage.removeItem('lingua-selected-languages');
      this.router.navigate(['./choose-languages']);
      return;
    }
    this.getMenus();

    if (!localStorage.getItem('lingua-default-languages')) {
      this.inquiryResult.setLoading(true);
      this.openSelectDefaultLanguageDialog();
      return;
    }

    this.getSelectedLanguagesInformation();
  }

  openSelectDefaultLanguageDialog(): void {
    const dialogRef = this.dialog.open(SelectDefaultLanguageDialogComponent, {
      disableClose: true,
    });
  }

  getUsername(): string {
    const email = localStorage.getItem('lingua-email');
    return email ? `Welcome dear ${email}` : 'Welcome dear guest';
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('lingua-token');
  }

  navigateToEditLanguages(): void {
    this.router.navigate(['../choose-languages/edit']);
  }

  logout(): void {
    this.securityService.logout();
  }

  getSelectedLanguagesInformation(): void {
    this.inquiryResult.setLoading(true);
    this.wordService
      .getSelectedLanguagesInformation({
        base: this.selectedLanguages.base.map((x) => x.id),
        target: this.selectedLanguages.target.map((x) => x.id),
      })
      .subscribe(
        (res: SelectedLanguageInquiryModel) => {
          this.inquiryResult.setData(res);
        },
        (error: any) => {
          this.notificationService.showMessage(
            'Unable to get language information',
            Severity.error
          );
          this.inquiryResult.setError(error);
        }
      );
  }

  getMenus(): void {
    this.gameMenus = this.basicInformationService.getGameMenus();
  }

  setBackgroundImage(image: string): any {
    return {
      background: `url("${image}") no-repeat center`,
      backgroundSize: '4vw',
    };
  }
}
