import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { GamesService } from 'src/app/core/service/games.service';
import { FallingStarsWord } from '../../../core/models/falling-stars-word.interface';
import { FallingStarsComponent } from './falling-stars.component';
import { MatDialog } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('FallingStarsComponent', () => {
  let component: FallingStarsComponent;
  let fixture: ComponentFixture<FallingStarsComponent>;
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
    mockMatDialog = jasmine.createSpyObj('dialog', {
      open: {
        afterClosed: () => {
          return of(sampleWords);
        },
      },
    });
    TestBed.configureTestingModule({
      imports: [BrowserAnimationsModule, HttpClientTestingModule],
      declarations: [FallingStarsComponent],
      providers: [
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

  it('should call showStartDialog in OnInit', () => {
    spyOn(component, 'showStartDialog');

    fixture.detectChanges();

    expect(component.showStartDialog).toHaveBeenCalled();
  });

  it('should set animating of first word to true on startGame method', () => {
    spyOn(component, 'setGameWords').withArgs(sampleWords);
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
