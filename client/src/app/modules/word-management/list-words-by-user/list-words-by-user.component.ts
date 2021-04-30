import { Component, OnInit } from '@angular/core';
import { WordManagementService } from '../../../core/service/word-management.service';
import { ApiResult } from '../../../core/models/api-result.model';
import { WordOverviewsModel } from '../../../core/models/word-overviews.model';
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

  wordOverviews: ApiResult<WordOverviewsModel[]> = new ApiResult<
    WordOverviewsModel[]
  >();
  ngOnInit(): void {
    this.getWordSeries();
  }

  getWordSeries(): void {
    this.wordOverviews.setLoading(true);
    this.wordManagementService.getWordOverviews().subscribe(
      (res: WordOverviewsModel[]) => {
        this.wordOverviews.setData(res);
      },
      () => {
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
