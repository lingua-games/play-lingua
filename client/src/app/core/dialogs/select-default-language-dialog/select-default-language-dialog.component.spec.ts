import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectDefaultLanguageDialogComponent } from './select-default-language-dialog.component';
import { NotificationService } from '../../service/notification.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatDialogRef } from '@angular/material/dialog';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { LocalStorageService } from '../../service/local-storage.service';
import { SetDefaultLanguageModel } from '../../models/set-default-language.model';
import { SelectedLanguageService } from '../../service/selected-language.service';
import { of, throwError } from 'rxjs';
import { LocalStorageHelper } from '../../models/local-storage.enum';

describe('SelectDefaultLanguageDialogComponent', () => {
  let component: SelectDefaultLanguageDialogComponent;
  let fixture: ComponentFixture<SelectDefaultLanguageDialogComponent>;
  let mockNotificationService;
  let mockMatDialogRef;
  let mockLocalStorageService;
  let mockLanguageService;

  beforeEach(
    waitForAsync(() => {
      mockNotificationService = jasmine.createSpyObj(['showMessage']);
      mockMatDialogRef = jasmine.createSpyObj(['close']);
      mockLocalStorageService = jasmine.createSpyObj('localStorageService', [
        'load',
        'save',
      ]);
      mockLanguageService = jasmine.createSpyObj('languageService', [
        'setDefaultLanguage',
      ]);

      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [SelectDefaultLanguageDialogComponent],
        providers: [
          {
            provide: MatDialogRef,
            useValue: mockMatDialogRef,
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
            provide: SelectedLanguageService,
            useValue: mockLanguageService,
          },
        ],
        schemas: [NO_ERRORS_SCHEMA],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectDefaultLanguageDialogComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    mockLocalStorageService.load.and.callFake(() => {
      return `{}`;
    });

    fixture.detectChanges();

    expect(component).toBeTruthy();
  });

  it('should set base and target languages at initial time', () => {
    mockLocalStorageService.load.and.callFake(() => {
      return `{"base": [], "target": []}`;
    });

    fixture.detectChanges();

    expect(component.baseLanguages).toEqual([]);
    expect(component.targetLanguages).toEqual([]);
  });

  it('should check defaultBaseLanguage on submit', () => {
    component.selectedItems = {
      defaultTargetLanguage: null,
    } as SetDefaultLanguageModel;

    component.submit();

    expect(mockNotificationService.showMessage).toHaveBeenCalledWith(
      'Base language is empty',
      'error'
    );
  });

  it('should check defaultTargetLanguage on submit', () => {
    component.selectedItems = {
      defaultBaseLanguage: { name: 'something' },
      defaultTargetLanguage: null,
    } as SetDefaultLanguageModel;

    component.submit();

    expect(mockNotificationService.showMessage).toHaveBeenCalledWith(
      'Target language is empty',
      'error'
    );
  });

  it('should set loading to true if validations pass', () => {
    mockLanguageService.setDefaultLanguage.and.callFake(() => {
      return of({});
    });
    component.selectedItems = {
      defaultBaseLanguage: { name: 'something' },
      defaultTargetLanguage: { name: 'something' },
    } as SetDefaultLanguageModel;

    component.submit();

    expect(component.isLoading).toBe(true);
  });

  it('should save API data into localStorage', () => {
    mockLanguageService.setDefaultLanguage.and.callFake(() => {
      return of({});
    });
    const expectedValue = {
      defaultBaseLanguage: {
        name: 'something',
        id: 1,
        fullName: '',
        code: '',
        nativeName: '',
      },
      defaultTargetLanguage: {
        name: 'something',
        id: 1,
        fullName: '',
        code: '',
        nativeName: '',
      },
    };
    component.selectedItems = expectedValue;
    component.submit();

    expect(mockLocalStorageService.save).toHaveBeenCalledWith(
      LocalStorageHelper.defaultLanguages,
      JSON.stringify(expectedValue)
    );
  });

  it('should set loading to false on getting error in API', () => {
    const expectedValue = {
      defaultBaseLanguage: {
        name: 'something',
        id: 1,
        fullName: '',
        code: '',
        nativeName: '',
      },
      defaultTargetLanguage: {
        name: 'something',
        id: 1,
        fullName: '',
        code: '',
        nativeName: '',
      },
    };
    component.selectedItems = expectedValue;
    mockLanguageService.setDefaultLanguage.and.callFake(() => {
      return throwError(new Error('Fake error'));
    });

    component.submit();

    expect(component.isLoading).toBe(false);
  });
});
