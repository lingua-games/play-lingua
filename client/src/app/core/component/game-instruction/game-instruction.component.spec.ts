import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GameInstructionComponent } from './game-instruction.component';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { LocalStorageService } from '../../service/local-storage.service';
import { GameNameEnum } from '../../models/game-name.enum';
import { DomSanitizer } from '@angular/platform-browser';

describe('GameInstructionComponent', () => {
  let component: GameInstructionComponent;
  let fixture: ComponentFixture<GameInstructionComponent>;
  let mockLocalStorageService;
  let mockSanitizer;

  beforeEach(async () => {
    mockLocalStorageService = jasmine.createSpyObj(['load', 'save']);
    mockSanitizer = jasmine.createSpyObj('sanitizer', [
      'bypassSecurityTrustHtml',
    ]);

    await TestBed.configureTestingModule({
      declarations: [GameInstructionComponent],
      providers: [
        {
          provide: LocalStorageService,
          useValue: mockLocalStorageService,
        },
        {
          provide: DomSanitizer,
          useValue: mockSanitizer,
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

  it('should fill text into template if any game is selected', () => {
    component.gameName = 1;

    fixture.detectChanges();

    expect(component.textTemplate === '').toBeFalsy();
  });

  it('should set falling star style into template if its falling stars', () => {
    component.gameName = GameNameEnum.fallingStars;
    const template = `
  <div class='alert alert-info'>
    <ul>
      <li style='margin-bottom: 1rem'><a>Choose the correct translate for the falling word!</a></li>
      <li style='margin: 1rem 0'><a>Select correct answer using your mouse or numbers on your keyboard</a></li>
      <li style='margin: 1rem 0'><a>Wrongly answered questions, will show up again with less score</a></li>
      <li style='margin: 1rem 0'><strong>Tip: </strong><a>Be fast and boost your score!</a></li>
    </ul>
  </div>
        `;

    fixture.detectChanges();

    expect(mockSanitizer.bypassSecurityTrustHtml).toHaveBeenCalledWith(
      template
    );
  });
});
