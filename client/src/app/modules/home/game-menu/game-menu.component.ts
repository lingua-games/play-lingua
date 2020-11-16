import { GameMenu } from '../../../core/models/game.menu.model';
import { Component, OnInit } from '@angular/core';
import { BasicInformationService } from '../../../core/service/basic-information.service';
import { Router } from '@angular/router';
import { WordService } from '../../../core/service/word.service';
import { ApiResult } from '../../../core/models/api-result.model';
import { SelectedLanguageInquiryModel } from '../../../core/models/selected-language-inquiry.model';

@Component({
  selector: 'app-game-menu',
  templateUrl: './game-menu.component.html',
  styleUrls: ['./game-menu.component.scss'],
})
export class GameMenuComponent implements OnInit {
  gameMenus: GameMenu[] = [];
  selectedLanguages: { base: number[]; target: number[] };
  inquiryResult: ApiResult<any> = new ApiResult<any>();

  constructor(
    private router: Router,
    private basicInformationService: BasicInformationService,
    private wordService: WordService
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
    }
    this.getSelectedLanguagesInformation();
    this.getMenus();
  }

  getSelectedLanguagesInformation(): void {
    this.inquiryResult.setLoading(true);
    this.wordService
      .getSelectedLanguagesInformation(this.selectedLanguages)
      .subscribe(
        (res: SelectedLanguageInquiryModel) => {
          this.inquiryResult.setData(res);
        },
        (error: any) => {}
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
