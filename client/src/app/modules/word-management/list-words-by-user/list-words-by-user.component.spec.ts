import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { ListWordsByUserComponent } from './list-words-by-user.component';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { WordOverviewsModel } from '../../../core/models/word-overviews.model';
import { of, throwError } from 'rxjs';
import { LocalStorageService } from '../../../core/service/local-storage.service';
import { environment } from '../../../../environments/environment';
import { Router } from '@angular/router';
import { WordManagementService } from '../../../core/service/word-management.service';

describe('ListWordsByUserComponent', () => {
  let component: ListWordsByUserComponent;
  let fixture: ComponentFixture<ListWordsByUserComponent>;
  let mockWordManagementService;
  let mockLocalStorageService;
  let mockRouter;

  beforeEach(
    waitForAsync(() => {
      mockWordManagementService = jasmine.createSpyObj(['getWordOverviews']);
      mockLocalStorageService = jasmine.createSpyObj(['encryptData']);
      mockRouter = {
        navigate: jasmine
          .createSpy('navigate')
          .and.returnValue(Promise.resolve()),
      };
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule, BrowserAnimationsModule],
        declarations: [ListWordsByUserComponent],
        providers: [
          {
            provide: WordManagementService,
            useValue: mockWordManagementService,
          },
          {
            provide: LocalStorageService,
            useValue: mockLocalStorageService,
          },
          {
            provide: Router,
            useValue: mockRouter,
          },
        ],
        schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(ListWordsByUserComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    mockWordManagementService.getWordOverviews.and.callFake(() => {
      return of([{ chapterId: 1 } as WordOverviewsModel]);
    });

    fixture.detectChanges();

    expect(component).toBeTruthy();
  });

  it('should call getWordSeries in onInit', () => {
    spyOn(component, 'getWordSeries');
    mockWordManagementService.getWordOverviews.and.callFake(() => {
      return of([{ chapterId: 1 } as WordOverviewsModel]);
    });

    fixture.detectChanges();

    expect(component.getWordSeries).toHaveBeenCalled();
  });

  it('should call getWordOverviews in getWordSeries method', () => {
    mockWordManagementService.getWordOverviews.and.callFake(() => {
      return of([{ chapterId: 1 } as WordOverviewsModel]);
    });

    component.getWordSeries();

    expect(mockWordManagementService.getWordOverviews).toHaveBeenCalled();
  });

  it('should show error if getWordOverview fail', () => {
    mockWordManagementService.getWordOverviews.and.callFake(() => {
      return throwError('I am error');
    });

    component.getWordSeries();

    expect(component.wordOverviews.errorMessage).toBe(
      'Failed to load overview, please try again'
    );
  });
  it('should call encrypt data once edit page call', () => {
    const overview = {
      bookId: 1,
      chapterId: 1,
      baseLanguageId: 1,
      targetLanguageId: 1,
    } as WordOverviewsModel;

    component.editPage(overview);

    expect(mockLocalStorageService.encryptData).toHaveBeenCalledWith(
      {
        bookId: overview.bookId,
        chapterId: overview.chapterId,
        baseLanguageId: overview.baseLanguageId,
        targetLanguageId: overview.targetLanguageId,
      },
      environment.secretKeys.queryParameters
    );
  });
});
