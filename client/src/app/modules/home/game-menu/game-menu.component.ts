import { GameMenu } from '../../../core/models/game.menu.model';
import { Component, OnInit } from '@angular/core';
import { BasicInformationService } from '../../../core/service/basic-information.service';
import { WordService } from '../../../core/service/word.service';
import { ApiResult } from '../../../core/models/api-result.model';
import {
  NotificationService,
  Severity,
} from '../../../core/service/notification.service';
import { SecurityService } from '../../../core/service/security.service';
import { MatDialog } from '@angular/material/dialog';
import { SelectDefaultLanguageDialogComponent } from '../../../core/dialogs/select-default-language-dialog/select-default-language-dialog.component';
import { LocalStorageHelper } from '../../../core/models/local-storage.enum';
import { DefaultLanguageModel } from '../../../core/models/set-default-language.model';
import { LocalStorageService } from '../../../core/service/local-storage.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-game-menu',
  templateUrl: './game-menu.component.html',
  styleUrls: ['./game-menu.component.scss'],
})
export class GameMenuComponent implements OnInit {
  gameMenus: GameMenu[] = [];
  defaultSelectedLanguages: DefaultLanguageModel = {} as DefaultLanguageModel;
  loadingFullPage?: boolean;
  inquiryResult: ApiResult<boolean> = new ApiResult<boolean>();

  constructor(
    private basicInformationService: BasicInformationService,
    private wordService: WordService,
    private notificationService: NotificationService,
    public securityService: SecurityService,
    private dialog: MatDialog,
    private localStorageService: LocalStorageService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.getMenus();

    this.defaultSelectedLanguages = this.localStorageService.load(
      LocalStorageHelper.defaultLanguages
    )
      ? JSON.parse(
          this.localStorageService.load(LocalStorageHelper.defaultLanguages)
        )
      : '{}';

    if (
      !this.defaultSelectedLanguages ||
      !this.defaultSelectedLanguages.defaultBaseLanguage ||
      !this.defaultSelectedLanguages.defaultTargetLanguage
    ) {
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

    dialogRef.afterClosed().subscribe((res: DefaultLanguageModel) => {
      this.loadingFullPage = false;
      this.defaultSelectedLanguages = res;
      this.getSelectedLanguagesInformation();
    });
  }

  isLoggedIn(): boolean {
    return this.securityService.isLoggedIn();
  }

  isAdmin(): boolean {
    return this.securityService.isAdmin();
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
    this.gameMenus.forEach((gameMenu: GameMenu) => {
      this.loadImages(gameMenu);
    });
  }

  loadImages(gameMenu: GameMenu): void {
    gameMenu.isGifLoading = true;
    this.basicInformationService.loadFile(gameMenu.gifUrl).subscribe((res) => {
      gameMenu.isGifLoading = false;
      const objectURL = URL.createObjectURL(res);
      gameMenu.gifUrl = this.sanitizer.bypassSecurityTrustUrl(
        objectURL
      ) as string;
    });
  }
  setBackgroundImage(image: string): {} {
    return {
      background: `url("${image}") no-repeat center`,
      backgroundSize: '4vw',
    };
  }
}
