import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

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
import { GameConfigModel } from '../../../../core/models/game-config-model';

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
    component.submit({} as GameConfigModel);
    jasmine.clock().tick(2005);

    expect(mockMatDialogRef.close).toHaveBeenCalled();
    jasmine.clock().uninstall();
  });

  it('should show notification if getGameWords API fail', () => {
    mockGameService.getGameWords.and.callFake(() => {
      return throwError('I am error');
    });

    component.submit({} as GameConfigModel);

    expect(mockNotificationService.showMessage).toHaveBeenCalled();
  });
});
