import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RankingComponent } from './ranking.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { ScoreStorageService } from '../../service/score-storage.service';
import { of, throwError } from 'rxjs';
import { RanksResultInterface } from '../../models/ranks-result.interface';
import { RouterTestingModule } from '@angular/router/testing';
import { MatDialog } from '@angular/material/dialog';
import { GameInformationInterface } from '../../models/game-information.interface';
import { ScoreStoreInterface } from '../../models/score-store.interface';
import { InvitationForm } from '../../models/invitation-form.interface';

describe('RankingComponent', () => {
  let component: RankingComponent;
  let fixture: ComponentFixture<RankingComponent>;
  let mockScoreStorageService;
  let mockMatDialogRef;

  beforeEach(async () => {
    mockMatDialogRef = jasmine.createSpyObj(['close']);
    mockScoreStorageService = jasmine.createSpyObj('scoreStorageService', {
      getTopRanks: of(),
      storeScore: of(),
    });
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      declarations: [RankingComponent],
      providers: [
        {
          provide: ScoreStorageService,
          useValue: mockScoreStorageService,
        },
        {
          provide: MatDialog,
          useValue: mockMatDialogRef,
        },
      ],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RankingComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should store ranks if game is finished on initial time', () => {
    component.data = { isGameFinished: true } as GameInformationInterface;
    spyOn(component, 'storeRanks');

    fixture.detectChanges();

    expect(component.storeRanks).toHaveBeenCalled();
  });

  it('should call getRanks on initial time', () => {
    spyOn(component, 'getRanks');

    fixture.detectChanges();

    expect(component.getRanks).toHaveBeenCalled();
  });

  it('should stop loading after calling storeScore', () => {
    mockScoreStorageService.storeScore.and.callFake(() => {
      return of([
        {
          email: 'email 1',
          score: 1,
          displayName: 'displayName 1',
        } as RanksResultInterface,
        {
          email: 'email 2',
          score: 2,
          displayName: 'displayName 2',
        } as RanksResultInterface,
      ]);
    });
    component.data = {
      feedbackForm: { uniqueKey: 'fake key' } as InvitationForm,
      scoreStore: {
        score: 1,
      } as ScoreStoreInterface,
    } as GameInformationInterface;

    component.storeRanks();

    expect(component.ranks.isLoading).toBeFalsy();
  });

  it('should stop loading if storeScore fail', () => {
    mockScoreStorageService.storeScore.and.callFake(() => {
      return throwError('error message');
    });
    component.data = {
      feedbackForm: { uniqueKey: 'fake key' } as InvitationForm,
      scoreStore: {
        score: 1,
      } as ScoreStoreInterface,
    } as GameInformationInterface;

    component.storeRanks();

    expect(component.ranks.isLoading).toBeFalsy();
  });

  it('should set Nobody played yet as error if there is no rank for this session', () => {
    mockScoreStorageService.getTopRanks.and.callFake(() => {
      return of([]);
    });

    component.getRanks();

    expect(component.ranks.errorMessage).toBe('Nobody played yet.');
  });

  it('should set and sort ranks into this.ranks when API fetch ranks', () => {
    const fakeResult = [
      {
        email: 'fake email',
        score: 20,
        displayName: 'fake display name',
      } as RanksResultInterface,
      {
        email: 'fake email',
        score: 10,
        displayName: 'fake display name',
      } as RanksResultInterface,
    ];
    mockScoreStorageService.getTopRanks.and.callFake(() => {
      return of(fakeResult);
    });
    jasmine.clock().uninstall();
    jasmine.clock().install();

    fixture.detectChanges();
    jasmine.clock().tick(1000);

    expect(component.ranks.data[0].score).toEqual(20);
    jasmine.clock().uninstall();
  });

  it('should set error if API fail', () => {
    mockScoreStorageService.getTopRanks.and.callFake(() => {
      return throwError('fake error');
    });

    fixture.detectChanges();

    expect(component.ranks.errorMessage).toEqual(
      'Unable to get ranks, please try again later'
    );
  });
});
