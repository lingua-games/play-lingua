import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { GamesService } from 'src/app/core/service/games.service';

import { FallingStarsComponent } from './falling-stars.component';

describe('FallingStarsComponent', () => {
  let component: FallingStarsComponent;
  let fixture: ComponentFixture<FallingStarsComponent>;
  let mockGamesService;
  let samepleWords;
  beforeEach(async(() => {
    samepleWords = ['Apple', 'Banana', 'Orange', 'Pineapple', 'Cherry'];
    mockGamesService = jasmine.createSpyObj(['getGameWords']);
    TestBed.configureTestingModule({
      declarations: [FallingStarsComponent],
      providers: [
        {
          provice: GamesService,
          useValue: mockGamesService,
        },
      ],
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
    mockGamesService.getGameWords.and.returnValue(of(samepleWords));
    spyOn(component, 'getRandomNumber');

    fixture.detectChanges();

    expect(component.scoreBoard.total).toBe(samepleWords.length);
    expect(component.scoreBoard.correct).toBe(0);
    expect(component.words.length).toBe(samepleWords.length);
    expect(component.getRandomNumber).toHaveBeenCalledTimes(
      samepleWords.length
    );
  });

  it('should return true if no word is animating in showReadyBox method', () => {
    component.words = [
      { animating: false, style: {}, typingWord: '', value: 'a' },
    ];

    fixture.detectChanges();

    expect(component.showReadyBox()).toBe(true);
  });

  it('should set animating of first word to true on startGame method', () => {
    component.words = [
      { animating: false, style: {}, typingWord: '', value: 'a' },
    ];

    component.startGame();

    expect(component.words[0].animating).toBe(true);
  });

  // unit tests has not finished
});
