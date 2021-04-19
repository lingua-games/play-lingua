import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RankingComponent } from './ranking.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { ScoreStorageService } from '../../service/score-storage.service';
import { of, throwError } from 'rxjs';
import { RanksResultInterface } from '../../models/ranks-result.interface';
import { RouterTestingModule } from '@angular/router/testing';
import { MatDialog } from '@angular/material/dialog';

describe('RankingComponent', () => {
  let component: RankingComponent;
  let fixture: ComponentFixture<RankingComponent>;
  let mockScoreStorageService;
  let mockMatDialogRef;

  beforeEach(async () => {
    mockMatDialogRef = jasmine.createSpyObj(['close']);
    mockScoreStorageService = jasmine.createSpyObj('scoreStorageService', {
      getTopRanks: of(),
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

  it('should call getRanks on initial time', () => {
    spyOn(component, 'getRanks');

    fixture.detectChanges();

    expect(component.getRanks).toHaveBeenCalled();
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
