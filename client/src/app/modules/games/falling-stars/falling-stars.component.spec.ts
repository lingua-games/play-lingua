import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { GamesService } from 'src/app/core/service/games.service';
import { FallingStarsWord } from '../../../core/models/falling-stars-word.interface';
import { FallingStarsComponent } from './falling-stars.component';
import { MatDialog } from '@angular/material/dialog';

describe('FallingStarsComponent', () => {
  let component: FallingStarsComponent;
  let fixture: ComponentFixture<FallingStarsComponent>;
  let mockGamesService;
  let mockMatDialog;

  let sampleWords;

  beforeEach(async(() => {
    sampleWords = [
      { key: 'Apple', value: ['appel'] },
      { key: 'Banana', value: ['banaan'] },
      { key: 'Orange', value: ['oranje'] },
      { key: 'Pineapple', value: ['ananas'] },
      { key: 'Cherry', value: ['kers'] },
    ];
    mockGamesService = jasmine.createSpyObj(['getGameWords']);
    mockMatDialog = jasmine.createSpyObj('dialog', {
      open: {
        afterClosed: () => {
          return of('result');
        },
      },
    });
    TestBed.configureTestingModule({
      declarations: [FallingStarsComponent],
      providers: [
        {
          provide: GamesService,
          useValue: mockGamesService,
        },
        {
          provide: MatDialog,
          useValue: mockMatDialog,
        },
      ],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FallingStarsComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call getGameWords in OnInit', () => {
    spyOn(component, 'getGameWords');

    fixture.detectChanges();

    expect(component.getGameWords).toHaveBeenCalled();
  });

  it('should set words correctly from the gameService', () => {
    mockGamesService.getGameWords.and.returnValue(of(sampleWords));
    spyOn(component, 'getRandomNumber');

    fixture.detectChanges();

    expect(component.scoreBoard.total).toBe(sampleWords.length);
    expect(component.scoreBoard.correct).toBe(0);
    expect(component.words.length).toBe(sampleWords.length);
    expect(component.getRandomNumber).toHaveBeenCalledTimes(sampleWords.length);
  });

  it('should return true if no word is animating in showReadyBox method', () => {
    component.words = [
      {
        animating: false,
        style: {},
        possibleAnswers: ['a'],
        correctAnswers: [],
        key: '',
        selectedAnswer: '',
      },
    ];
    mockGamesService.getGameWords.and.callFake(() => {
      return of();
    });

    fixture.detectChanges();

    expect(component.showReadyBox()).toBe(true);
  });

  it('should set animating of first word to true on startGame method', () => {
    component.words = [{ animating: false, style: {} } as FallingStarsWord];

    component.startGame();

    expect(component.words[0].animating).toBe(true);
  });

  it('should set word.animating to false on calling boxAnimationDone', () => {
    const mockValue = { animating: true } as FallingStarsWord;

    component.boxAnimationDone(mockValue);

    expect(mockValue.animating).toBe(false);
  });

  it('getRandomNumber should return number smaller than 95', () => {
    const expectedValue = component.getRandomNumber();

    expect(expectedValue).toBeLessThan(96);
  });

  it('checkSelectedAnswer should call boxAnimationDone with active word', () => {
    component.words = [
      {
        animating: true,
        style: {},
        correctAnswers: ['testValue'],
      } as FallingStarsWord,
    ];
    spyOn(component, 'boxAnimationDone');

    component.checkSelectedAnswer('testValue');

    expect(component.boxAnimationDone).toHaveBeenCalledWith(component.words[0]);
  });
});
