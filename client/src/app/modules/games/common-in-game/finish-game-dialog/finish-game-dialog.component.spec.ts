import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { FinishGameDialogComponent } from './finish-game-dialog.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { RouterTestingModule } from '@angular/router/testing';
import { ScoreStorageService } from '../../../../core/service/score-storage.service';
import { of, throwError } from 'rxjs';
import { SecurityService } from '../../../../core/service/security.service';
import { RanksResultInterface } from '../../../../core/models/ranks-result.interface';
import { ScoreStoreInterface } from '../../../../core/models/score-store.interface';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { FinishGameActionEnum } from '../../../../core/models/finish-game-action.enum';

describe('FinishGameDialogComponent', () => {
  let component: FinishGameDialogComponent;
  let fixture: ComponentFixture<FinishGameDialogComponent>;
  let mockScoreStorageService;
  let mockSecurityService;
  let mockDialogRef;
  beforeEach(
    waitForAsync(() => {
      mockScoreStorageService = jasmine.createSpyObj(['storeScore']);
      mockSecurityService = jasmine.createSpyObj('securityService', {
        setTotalScore: () => {},
        getTokenInformation: () => {
          return {};
        },
      });
      mockDialogRef = jasmine.createSpyObj('dialogRef', {
        close: (item: FinishGameActionEnum) => {},
      });
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule, RouterTestingModule],
        declarations: [FinishGameDialogComponent],
        providers: [
          {
            provide: MAT_DIALOG_DATA,
            useValue: {},
          },
          {
            provide: MatDialog,
            useValue: {},
          },
          {
            provide: MatDialogRef,
            useValue: mockDialogRef,
          },
          {
            provide: ScoreStorageService,
            useValue: mockScoreStorageService,
          },
          {
            provide: SecurityService,
            useValue: mockSecurityService,
          },
        ],
        schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(FinishGameDialogComponent);
    component = fixture.componentInstance;
    component.data = { score: 1 } as ScoreStoreInterface;
  });

  it('should create', () => {
    mockScoreStorageService.storeScore.and.callFake(() => {
      return of();
    });

    fixture.detectChanges();

    expect(component).toBeTruthy();
  });

  it('should call changeMode when ESC keyword pressed', () => {
    spyOn(component, 'changeMode');

    component.keyDownEvent({ code: 'Escape' } as KeyboardEvent);

    expect(component.changeMode).toHaveBeenCalled();
  });

  it('should call retry when Enter keyword pressed', () => {
    spyOn(component, 'retry');

    component.keyDownEvent({ code: 'Enter' } as KeyboardEvent);

    expect(component.retry).toHaveBeenCalled();
  });

  it('should call setTotalScore once get result from scoreStorageService', () => {
    mockScoreStorageService.storeScore.and.callFake(() => {
      return of([] as RanksResultInterface[]);
    });

    fixture.detectChanges();

    expect(mockSecurityService.setTotalScore).toHaveBeenCalled();
  });

  it('should stop loading when storeScore face error', () => {
    mockScoreStorageService.storeScore.and.callFake(() => {
      return throwError(new Error('Fake error'));
    });

    fixture.detectChanges();

    expect(component.isLoading).toBe(false);
  });

  it('should return current-user when it is the current user', () => {
    const rank = { email: 'fakeEmail' } as RanksResultInterface;
    component.ranks = [{ email: 'fakeEmail' } as RanksResultInterface];
    mockSecurityService.getTokenInformation.and.callFake(() => {
      return { email: 'fakeEmail' };
    });

    expect(component.getWinnerStyles(rank)).toBe('current-user rank-normal');
  });

  it('should return empty string if rank is null', () => {
    expect(component.getWinnerStyles(null)).toBe('');
  });

  it('should return rank-gold user standing in the first rank', () => {
    component.ranks = [
      { email: 'firstRank' } as RanksResultInterface,
      { email: 'secondRank' } as RanksResultInterface,
      { email: 'thirdRank' } as RanksResultInterface,
    ];
    const rank = component.ranks[0];

    expect(component.getWinnerStyles(rank)).toBe('rank-gold');
  });

  it('should return rank-silver user standing in the second rank', () => {
    component.ranks = [
      { email: 'firstRank' } as RanksResultInterface,
      { email: 'secondRank' } as RanksResultInterface,
      { email: 'thirdRank' } as RanksResultInterface,
    ];
    const rank = component.ranks[1];

    expect(component.getWinnerStyles(rank)).toBe('rank-silver');
  });

  it('should return rank-bronze user standing in the third rank', () => {
    component.ranks = [
      { email: 'firstRank' } as RanksResultInterface,
      { email: 'secondRank' } as RanksResultInterface,
      { email: 'thirdRank' } as RanksResultInterface,
    ];
    const rank = component.ranks[2];

    expect(component.getWinnerStyles(rank)).toBe('rank-bronze');
  });

  it('should return rank-normal user standing out of the first third ranks', () => {
    component.ranks = [
      { email: 'firstRank' } as RanksResultInterface,
      { email: 'secondRank' } as RanksResultInterface,
      { email: 'thirdRank' } as RanksResultInterface,
    ];

    expect(component.getWinnerStyles({} as RanksResultInterface)).toBe(
      'current-user rank-normal'
    );
  });

  it('should close dialog with changeMode when change mode hits', () => {
    component.changeMode();

    expect(mockDialogRef.close).toHaveBeenCalledWith(
      FinishGameActionEnum.changeMode
    );
  });

  it('should close dialog with retry when retry hits', () => {
    component.retry();

    expect(mockDialogRef.close).toHaveBeenCalledWith(
      FinishGameActionEnum.retry
    );
  });

  it('should return appropriate with in getRankWidth method', () => {
    component.ranks = [
      { email: 'firstRank' } as RanksResultInterface,
      { email: 'secondRank' } as RanksResultInterface,
      { email: 'thirdRank' } as RanksResultInterface,
    ];
    expect(component.getRankWidth(component.ranks[1])).toBe('41%');
  });
});
