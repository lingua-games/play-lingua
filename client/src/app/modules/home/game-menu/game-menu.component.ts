import { GameMenu } from '../../../core/models/game.menu.model';
import { Component, OnInit } from '@angular/core';
import { BasicInformationService } from '../../../core/service/basic-information.service';
import { Router } from '@angular/router';
import { WordService } from '../../../core/service/word.service';
import { ApiResult } from '../../../core/models/api-result.model';
import {
  NotificationService,
  Severity,
} from '../../../core/service/notification.service';
import { LanguageModel } from '../../../core/models/language.model';
import { SecurityService } from '../../../core/service/security.service';
import { MatDialog } from '@angular/material/dialog';
import { SelectDefaultLanguageDialogComponent } from '../../../core/dialogs/select-default-language-dialog/select-default-language-dialog.component';
import { Store } from '@ngrx/store';
import { toggleNotification } from '../../../core/component/score-notification/state/score-notification.actions';
import { NotificationState } from '../../../core/component/score-notification/state/score-notification.reducer';
import { LocalStorageHelper } from '../../../core/models/local-storage.enum';
import { Local } from 'protractor/built/driverProviders';
import { SetDefaultLanguageModel } from '../../../core/models/set-default-language.model';
import { LocalStorageService } from '../../../core/service/local-storage.service';

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
  defaultSelectedLanguages: SetDefaultLanguageModel = {
    defaultBaseLanguage: new LanguageModel(),
    defaultTargetLanguage: new LanguageModel(),
  };
  loadingFullPage: boolean;
  inquiryResult: ApiResult<boolean> = new ApiResult<boolean>();

  constructor(
    private router: Router,
    private basicInformationService: BasicInformationService,
    private wordService: WordService,
    private notificationService: NotificationService,
    public securityService: SecurityService,
    private dialog: MatDialog,
    private localStorageService: LocalStorageService
  ) {}

  ngOnInit(): void {
    console.log(
      this.localStorageService.load(LocalStorageHelper.selectedLanguages)
    );
    this.selectedLanguages = JSON.parse(
      this.localStorageService.load(LocalStorageHelper.selectedLanguages)
        ? this.localStorageService.load(LocalStorageHelper.selectedLanguages)
        : '[]'
    );
    if (
      !this.selectedLanguages ||
      !this.selectedLanguages.base ||
      !this.selectedLanguages.target
    ) {
      this.localStorageService.delete(LocalStorageHelper.selectedLanguages);
      this.router.navigate(['./choose-languages']).then();
      return;
    }
    this.getMenus();

    if (
      this.securityService.isGuest() &&
      !this.localStorageService.load(LocalStorageHelper.defaultLanguages)
    ) {
      const valueToSave = {
        defaultBaseLanguage: this.selectedLanguages.base[0],
        defaultTargetLanguage: this.selectedLanguages.target[0],
      };
      this.localStorageService.save(
        LocalStorageHelper.defaultLanguages,
        JSON.stringify(valueToSave)
      );
    }
    if (!this.localStorageService.load(LocalStorageHelper.defaultLanguages)) {
      this.loadingFullPage = true;
      this.openSelectDefaultLanguageDialog();
      return;
    } else {
      this.defaultSelectedLanguages = JSON.parse(
        this.localStorageService.load(LocalStorageHelper.defaultLanguages)
      );
      this.getSelectedLanguagesInformation();
    }
  }

  navigateToChangeLanguage(): void {
    this.localStorageService.delete(LocalStorageHelper.defaultLanguages);
    this.localStorageService.delete(LocalStorageHelper.selectedLanguages);
    this.router.navigate(['../choose-languages']).then();
  }

  changeDefaultLanguages(): void {
    this.localStorageService.delete(LocalStorageHelper.defaultLanguages);
    this.openSelectDefaultLanguageDialog();
  }

  openSelectDefaultLanguageDialog(): void {
    const dialogRef = this.dialog.open(SelectDefaultLanguageDialogComponent, {
      disableClose: true,
      width: '50%',
      height: '50vh',
      panelClass: 'select-language-dialog',
    });

    dialogRef.afterClosed().subscribe((res: SetDefaultLanguageModel) => {
      this.loadingFullPage = false;
      this.defaultSelectedLanguages = res;
      this.getSelectedLanguagesInformation();
    });
  }

  isLoggedIn(): boolean {
    return this.securityService.isLoggedIn();
  }

  navigateToEditLanguages(): void {
    this.router.navigate(['../choose-languages/edit']).then();
  }

  logout(): void {
    this.securityService.logout();
  }

  getSelectedLanguagesInformation(): void {
    this.inquiryResult.setLoading(true);
    this.wordService
      .getSelectedLanguagesInformation({
        base: this.defaultSelectedLanguages.defaultBaseLanguage.id,
        target: this.defaultSelectedLanguages.defaultTargetLanguage.id,
      })
      .subscribe(
        (res: boolean) => {
          this.inquiryResult.setData(res);
        },
        (error: string) => {
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
