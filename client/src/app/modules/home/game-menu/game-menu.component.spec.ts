import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { GameMenuComponent } from './game-menu.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NotificationService } from '../../../core/service/notification.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { LocalStorageService } from '../../../core/service/local-storage.service';
import { SecurityService } from '../../../core/service/security.service';
import { LocalStorageHelper } from '../../../core/models/local-storage.enum';
import { of, throwError } from 'rxjs';
import { SetDefaultLanguageModel } from '../../../core/models/set-default-language.model';
import { WordService } from '../../../core/service/word.service';

describe('GameMenuComponent', () => {
  let component: GameMenuComponent;
  let fixture: ComponentFixture<GameMenuComponent>;
  let mockNotificationService;
  let mockMatDialog;
  let mockLocalStorageService;
  let mockRouter;
  let mockSecurityService;
  let mockWordService;
  beforeEach(
    waitForAsync(() => {
      mockNotificationService = jasmine.createSpyObj(['showMessage']);
      mockWordService = jasmine.createSpyObj([
        'getSelectedLanguagesInformation',
      ]);
      mockMatDialog = jasmine.createSpyObj('dialog', {
        open: {
          afterClosed: () => {
            return of();
          },
        },
      });
      mockLocalStorageService = jasmine.createSpyObj([
        'load',
        'delete',
        'save',
        'isAdmin',
      ]);
      mockSecurityService = jasmine.createSpyObj([
        'isGuest',
        'isLoggedIn',
        'isAdmin',
      ]);
      mockRouter = {
        navigate: jasmine
          .createSpy('navigate')
          .and.returnValue(Promise.resolve()),
      };

      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [GameMenuComponent],
        providers: [
          {
            provide: WordService,
            useValue: mockWordService,
          },
          {
            provide: SecurityService,
            useValue: mockSecurityService,
          },
          {
            provide: LocalStorageService,
            useValue: mockLocalStorageService,
          },
          {
            provide: MatDialog,
            useValue: mockMatDialog,
          },
          {
            provide: NotificationService,
            useValue: mockNotificationService,
          },
          {
            provide: Router,
            useValue: mockRouter,
          },
        ],
        schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(GameMenuComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    beforeEach(() => {
      spyOn(component, 'getSelectedLanguagesInformation');
    });

    it('should set value into selectedLanguages', () => {
      mockLocalStorageService.load.and.callFake(() => {
        return '{ "base": [], "target": [] }';
      });

      fixture.detectChanges();

      expect(component.selectedLanguages).toEqual({ base: [], target: [] });
    });

    it('should navigate to choose-language if no language is selected as default', () => {
      mockLocalStorageService.load.and.callFake(() => {
        return '{ "base": null, "target": null }';
      });

      fixture.detectChanges();

      expect(mockRouter.navigate).toHaveBeenCalledWith(['./choose-languages']);
    });

    it('should get menus', () => {
      mockLocalStorageService.load.and.callFake(() => {
        return '{ "base": [], "target": [] }';
      });
      spyOn(component, 'getMenus');

      fixture.detectChanges();

      expect(component.getMenus).toHaveBeenCalled();
    });

    it('should set language for guest', () => {
      mockSecurityService.isGuest.and.callFake(() => {
        return true;
      });
      mockLocalStorageService.load.and.callFake((e) => {
        if (e === LocalStorageHelper.selectedLanguages) {
          return '{ "base": [{"id":1}], "target": [{"id":1}] }';
        } else if (e === LocalStorageHelper.defaultLanguages) {
          return null;
        }
      });
      spyOn(component, 'openSelectDefaultLanguageDialog');

      fixture.detectChanges();

      expect(mockLocalStorageService.save).toHaveBeenCalledWith(
        LocalStorageHelper.defaultLanguages,
        '{"defaultBaseLanguage":{"id":1},"defaultTargetLanguage":{"id":1}}'
      );
    });
  });

  it('should navigate to choose-language page when navigateToChangeLanguage hits', () => {
    component.navigateToChangeLanguage();

    expect(mockRouter.navigate).toHaveBeenCalledWith(['../choose-languages']);
  });

  it('should open dialog when changeDefaultLanguages hits', () => {
    spyOn(component, 'openSelectDefaultLanguageDialog');

    component.changeDefaultLanguages();

    expect(component.openSelectDefaultLanguageDialog).toHaveBeenCalled();
  });

  it('should open dialog when openSelectDefaultLanguageDialog hits', () => {
    component.openSelectDefaultLanguageDialog();

    expect(mockMatDialog.open).toHaveBeenCalled();
  });

  it('should get selected language information once dialog close', () => {
    mockMatDialog.open.and.callFake(() => {
      return {
        afterClosed: () => of({} as SetDefaultLanguageModel),
      };
    });
    spyOn(component, 'getSelectedLanguagesInformation');

    component.openSelectDefaultLanguageDialog();

    expect(component.getSelectedLanguagesInformation).toHaveBeenCalled();
  });

  it('should set inquiry result after calling getSelectedLanguagesInformation API', () => {
    mockWordService.getSelectedLanguagesInformation.and.callFake(() => {
      return of(true);
    });

    component.getSelectedLanguagesInformation();

    expect(component.inquiryResult.data).toBeTrue();
  });

  it('should set error when is failing to getSelectedLanguagesInformation API', () => {
    mockWordService.getSelectedLanguagesInformation.and.callFake(() => {
      return throwError('some errors');
    });

    component.getSelectedLanguagesInformation();

    expect(component.inquiryResult.errorMessage).toBe('some errors');
  });

  it('should return background style when setBackgroundImage hits', () => {
    expect(component.setBackgroundImage('fake image')).toEqual({
      background: 'url("fake image") no-repeat center',
      backgroundSize: '4vw',
    });
  });
});
