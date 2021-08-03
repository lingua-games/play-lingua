import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectDefaultLanguageDialogComponent } from './select-default-language-dialog.component';
import { NotificationService } from '../../service/notification.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatDialogRef } from '@angular/material/dialog';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { LocalStorageService } from '../../service/local-storage.service';
import { SelectedLanguageService } from '../../service/selected-language.service';
import { of, throwError } from 'rxjs';
import { LocalStorageHelper } from '../../models/local-storage.enum';
import { DefaultLanguageModel } from '../../models/set-default-language.model';
import { BasicInformationService } from '../../service/basic-information.service';
import { LanguageModel } from '../../models/language.model';

describe('SelectDefaultLanguageDialogComponent', () => {
  let component: SelectDefaultLanguageDialogComponent;
  let fixture: ComponentFixture<SelectDefaultLanguageDialogComponent>;
  let mockNotificationService;
  let mockMatDialogRef;
  let mockLocalStorageService;
  let mockLanguageService;
  let mockBasicInformationService;

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
      mockBasicInformationService = jasmine.createSpyObj(
        'basicInformationService',
        { getAllLanguages: of([{} as LanguageModel]) }
      );
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
          {
            provide: BasicInformationService,
            useValue: mockBasicInformationService,
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

  describe('getLanguages', () => {
    it('should call getLanguages at initial time', () => {
      spyOn(component, 'getLanguages');

      fixture.detectChanges();

      expect(component.getLanguages).toHaveBeenCalled();
    });

    it('should call languages.setData with service result', () => {
      spyOn(component.languages, 'setData');
      const expectedValue = [{ id: 111 } as LanguageModel];
      mockBasicInformationService.getAllLanguages.and.callFake(() => {
        return of(expectedValue);
      });

      component.getLanguages();

      expect(component.languages.setData).toHaveBeenCalledWith(expectedValue);
    });

    it('should set error when service throw error', () => {
      spyOn(component.languages, 'setError');
      mockBasicInformationService.getAllLanguages.and.callFake(() => {
        return throwError('I am error');
      });

      component.getLanguages();

      expect(component.languages.setError).toHaveBeenCalledWith(
        'Unable to load languages'
      );
    });
  });

  describe('submit', () => {
    it('should check defaultBaseLanguage on submit', () => {
      component.selectedItems = {
        defaultTargetLanguage: null,
      } as DefaultLanguageModel;

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
      } as DefaultLanguageModel;

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
      } as DefaultLanguageModel;

      component.submit();

      expect(component.languages.isLoading).toBe(true);
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

      expect(component.languages.isLoading).toBe(false);
    });

    it('should save selectedItems into localStorage if it is guest', () => {
      component.selectedItems = {
        defaultBaseLanguage: { name: 'something' },
        defaultTargetLanguage: { name: 'something' },
      } as DefaultLanguageModel;
      mockLocalStorageService.load.and.callFake(() => {
        return true;
      });

      component.submit();

      expect(mockLocalStorageService.save).toHaveBeenCalledWith(
        LocalStorageHelper.defaultLanguages,
        '{"defaultBaseLanguage":{"name":"something"},"defaultTargetLanguage":{"name":"something"}}'
      );
    });
  });
});
