import { Component, OnInit } from '@angular/core';
import { WordManagementService } from '../../../core/service/word-management.service';
import { ApiResult } from '../../../core/models/api-result.model';
import {
  WordOverviewsModel,
  WordOverviewsToShowModel,
} from '../../../core/models/word-overviews.model';
import { animate, style, transition, trigger } from '@angular/animations';
import { Router } from '@angular/router';
import { LocalStorageService } from '../../../core/service/local-storage.service';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-list-words-by-user',
  templateUrl: './list-words-by-user.component.html',
  styleUrls: ['./list-words-by-user.component.scss'],
  animations: [
    trigger('fade', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('900ms', style({ opacity: 1 })),
      ]),
    ]),
  ],
})
export class ListWordsByUserComponent implements OnInit {
  constructor(
    public wordManagementService: WordManagementService,
    public router: Router,
    public localStorageService: LocalStorageService
  ) {}

  step = 0;
  wordOverviews: ApiResult<WordOverviewsToShowModel[]> = new ApiResult<
    WordOverviewsToShowModel[]
  >();
  ngOnInit(): void {
    this.getWordSeries();
  }

  setStep(index: number): void {
    this.step = index;
  }

  nextStep(): void {
    this.step++;
  }

  prevStep(): void {
    this.step--;
  }

  getWordSeries(): void {
    this.wordOverviews.setLoading(true);
    this.wordManagementService.getWordOverviews().subscribe(
      (res: WordOverviewsModel[]) => {
        const resultToView: WordOverviewsToShowModel[] = [];
        if (res && res.length) {
          res.forEach((element: WordOverviewsModel) => {
            if (
              !resultToView.find(
                (x) =>
                  x.bookId === element.bookId &&
                  x.baseLanguageId === element.baseLanguageId &&
                  x.targetLanguageId === element.targetLanguageId
              )
            ) {
              resultToView.push({
                bookId: element.bookId,
                bookName: element.bookName,
                baseLanguageId: element.baseLanguageId,
                baseLanguageName: element.baseLanguageName,
                targetLanguageId: element.targetLanguageId,
                targetLanguageName: element.targetLanguageName,
                WordOverviewDetails: [],
                count: 0,
              } as WordOverviewsToShowModel);
            }
          });
        }

        if (resultToView && resultToView.length) {
          resultToView.forEach((element) => {
            let count = 0;
            res
              .filter(
                (x) =>
                  x.bookId === element.bookId &&
                  x.baseLanguageId === element.baseLanguageId &&
                  x.targetLanguageId === element.targetLanguageId
              )
              .forEach((selectedGroup: WordOverviewsModel) => {
                element.WordOverviewDetails.push(selectedGroup);
                count += selectedGroup.count;
              });
            element.count = count;
          });
        }

        this.wordOverviews.setData(resultToView);
        console.log(resultToView);
      },
      () => {
        // Todo, error handling here and maybe add refresh button etc
        this.wordOverviews.setError(
          'Failed to load overview, please try again'
        );
      }
    );
  }

  editPage(overview: WordOverviewsModel): void {
    const code = this.localStorageService.encryptData(
      {
        bookId: overview.bookId,
        chapterId: overview.chapterId,
        baseLanguageId: overview.baseLanguageId,
        targetLanguageId: overview.targetLanguageId,
      },
      environment.secretKeys.queryParameters
    );
    this.router.navigate(['/word-management/edit', code]).then();
  }
}
