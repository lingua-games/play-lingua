import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { StartGameDialogComponent } from './start-game-dialog.component';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NotificationService } from '../../../../core/service/notification.service';
import { LocalStorageService } from '../../../../core/service/local-storage.service';
import { of, throwError } from 'rxjs';
import { GamesService } from '../../../../core/service/games.service';
import { Router } from '@angular/router';
import { WordKeyValueModel } from '../../../../core/models/word-key-value.model';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GameNameEnum } from '../../../../core/models/game-name.enum';
import { GameInformationInterface } from '../../../../core/models/game-information.interface';

describe('StartGameDialogComponent', () => {
  let component: StartGameDialogComponent;
  let fixture: ComponentFixture<StartGameDialogComponent>;
  let mockMatDialogRef;
  let mockNotificationService;
  let mockLocalStorageService;
  let mockGameService;
  beforeEach(
    waitForAsync(() => {
      mockNotificationService = jasmine.createSpyObj(['showMessage']);
      mockMatDialogRef = jasmine.createSpyObj(['close']);
      mockLocalStorageService = jasmine.createSpyObj('localStorageService', {
        load: `{ "defaultBaseLanguage": {}, "defaultTargetLanguage": {} }`,
      });

      mockGameService = jasmine.createSpyObj(['getGameWords']);
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule, BrowserAnimationsModule],
        declarations: [StartGameDialogComponent],
        providers: [
          {
            provide: Router,
            useValue: {
              navigate: jasmine
                .createSpy('navigate')
                .and.returnValue(Promise.resolve()),
            },
          },
          {
            provide: MatDialogRef,
            useValue: mockMatDialogRef,
          },
          {
            provide: MAT_DIALOG_DATA,
            useValue: { '': '' },
          },
          {
            provide: NotificationService,
            useValue: mockNotificationService,
          },
          {
            provide: LocalStorageService,
            useValue: mockLocalStorageService,
          },
          {
            provide: GamesService,
            useValue: mockGameService,
          },
        ],
        schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(StartGameDialogComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    fixture.detectChanges();

    expect(component).toBeTruthy();
  });

  it('should call dialog close when backToMenu hits', () => {
    component.backToMenu();

    expect(mockMatDialogRef.close).toHaveBeenCalled();
  });

  it('should call dialog.close once getGameWords service hits', () => {
    mockGameService.getGameWords.and.callFake(() => {
      return of([{}] as WordKeyValueModel<string[]>[]);
    });

    jasmine.clock().uninstall();
    jasmine.clock().install();
    component.submit();
    jasmine.clock().tick(2005);

    expect(mockMatDialogRef.close).toHaveBeenCalled();
    jasmine.clock().uninstall();
  });

  it('should show notification if getGameWords API fail', () => {
    mockGameService.getGameWords.and.callFake(() => {
      return throwError('I am error');
    });

    component.submit();

    expect(mockNotificationService.showMessage).toHaveBeenCalled();
  });

  it('should set selectedOption to start if showHelp if OFF for Mario', () => {
    mockLocalStorageService.load.and.callFake(() => {
      return true;
    });
    component.data = {
      code: GameNameEnum.supperMario,
    } as GameInformationInterface;

    fixture.detectChanges();

    expect(component.selectedOption).toBe('start');
  });

  it('should set selectedOption to help if showHelp if ON for Mario', () => {
    mockLocalStorageService.load.and.callFake(() => {
      return false;
    });
    component.data = {
      code: GameNameEnum.supperMario,
    } as GameInformationInterface;

    fixture.detectChanges();

    expect(component.selectedOption).toBe('help');
  });

  it('should set selectedOption to help if showHelp if OFF for Falling stars', () => {
    mockLocalStorageService.load.and.callFake(() => {
      return true;
    });
    component.data = {
      code: GameNameEnum.fallingStars,
    } as GameInformationInterface;

    fixture.detectChanges();

    expect(component.selectedOption).toBe('start');
  });

  it('should set selectedOption to help if showHelp if ON for Falling stars', () => {
    mockLocalStorageService.load.and.callFake(() => {
      return false;
    });
    component.data = {
      code: GameNameEnum.fallingStars,
    } as GameInformationInterface;

    fixture.detectChanges();

    expect(component.selectedOption).toBe('help');
  });

  it('should set selectedOption with 100ms timeOut when calling showSection', () => {
    jasmine.clock().uninstall();
    jasmine.clock().install();

    component.showSection('foo');
    jasmine.clock().tick(100);

    expect(component.selectedOption).toBe('foo');
    jasmine.clock().uninstall();
  });

  it('should set hoveredOption to the overed item on showHover', () => {
    component.selectedOption = 'foo option';
    expect(component.showHover('foo option')).toBeUndefined();

    component.showHover('foo option 1');
    expect(component.hoveredOption).toBe('foo option 1');
  });
});
