import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheatSheetComponent } from './cheat-sheet.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GamesService } from '../../service/games.service';
import { of } from 'rxjs';
import { LocalStorageService } from '../../service/local-storage.service';
import { WordKeyValueModel } from '../../models/word-key-value.model';

describe('CheatSheetComponent', () => {
  let component: CheatSheetComponent;
  let fixture: ComponentFixture<CheatSheetComponent>;
  let mockGamesService;
  let mockLocalStorageService;

  beforeEach(async () => {
    mockGamesService = jasmine.createSpyObj(['getGameWords']);
    mockLocalStorageService = jasmine.createSpyObj('localStorageService', {
      load: `{ "defaultBaseLanguage": {}, "defaultTargetLanguage": {} }`,
    });
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, BrowserAnimationsModule],
      declarations: [CheatSheetComponent],
      providers: [
        {
          provide: GamesService,
          useValue: mockGamesService,
        },
        {
          provide: GamesService,
          useValue: mockGamesService,
        },
        {
          provide: LocalStorageService,
          useValue: mockLocalStorageService,
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CheatSheetComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    spyOn(component, 'getWords');

    fixture.detectChanges();

    expect(component).toBeTruthy();
  });

  it('should call getWords in initial time', () => {
    spyOn(component, 'getWords');

    fixture.detectChanges();

    expect(component.getWords).toHaveBeenCalled();
  });

  it('should call getGameWords service when getWords method call', () => {
    mockGamesService.getGameWords.and.callFake(() => {
      return of([]);
    });
    spyOn(component.words, 'setLoading');

    component.getWords();

    expect(mockGamesService.getGameWords).toHaveBeenCalled();
  });

  it('should set data into words if api return value successfully', () => {
    mockGamesService.getGameWords.and.callFake(() => {
      return of([{ key: 'fake key' } as WordKeyValueModel<string[]>]);
    });
    spyOn(component.words, 'setLoading');
    spyOn(component.words, 'setData');

    component.getWords();

    expect(component.words.setData).toHaveBeenCalledWith([
      { key: 'fake key' } as WordKeyValueModel<string[]>,
    ]);
  });
});
