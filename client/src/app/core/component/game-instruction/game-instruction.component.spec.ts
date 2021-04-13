import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GameInstructionComponent } from './game-instruction.component';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { LocalStorageService } from '../../service/local-storage.service';
import { LocalStorageHelper } from '../../models/local-storage.enum';

describe('GameInstructionComponent', () => {
  let component: GameInstructionComponent;
  let fixture: ComponentFixture<GameInstructionComponent>;
  let mockLocalStorageService;
  beforeEach(async () => {
    mockLocalStorageService = jasmine.createSpyObj(['load', 'save']);

    await TestBed.configureTestingModule({
      declarations: [GameInstructionComponent],
      providers: [
        {
          provide: LocalStorageService,
          useValue: mockLocalStorageService,
        },
      ],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GameInstructionComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should set showHelpForMario if it has not set yet on initial time', () => {
    mockLocalStorageService.load.and.callFake(() => {
      return false;
    });

    fixture.detectChanges();

    expect(mockLocalStorageService.save).toHaveBeenCalledWith(
      LocalStorageHelper.showHelpForMario,
      'true'
    );
  });

  it('should fill text into template if any game is selected', () => {
    component.gameName = 1;

    fixture.detectChanges();

    expect(component.textTemplate === '').toBeFalsy();
  });

  it('should save new status into localstorage when calling changeShowHelp', () => {
    component.changeShowHelp();

    expect(mockLocalStorageService.save).toHaveBeenCalled();
  });
});
