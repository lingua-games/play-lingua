import {
  async,
  ComponentFixture,
  getTestBed,
  TestBed,
} from '@angular/core/testing';

import { ChooseLanguagesComponent } from './choose-languages.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import {
  NotificationService,
  Severity,
} from '../../../core/service/notification.service';
import { RouterTestingModule } from '@angular/router/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { LocalStorageService } from '../../../core/service/local-storage.service';
import { Location } from '@angular/common';
import { BasicInformationService } from '../../../core/service/basic-information.service';
import { of, throwError } from 'rxjs';
import { LanguageModel } from '../../../core/models/language.model';
import { ValidationModel } from '../../../core/models/validation.model';
import { SecurityService } from '../../../core/service/security.service';
import { SelectedLanguageService } from '../../../core/service/selected-language.service';
import { LocalStorageHelper } from '../../../core/models/local-storage.enum';

describe('ChooseLanguagesComponent', () => {
  let component: ChooseLanguagesComponent;
  let fixture: ComponentFixture<ChooseLanguagesComponent>;
  let mockNotificationService;
  let mockLocalStorageService;
  let mockRouter;
  let mockLocation;
  let mockBasicInformationService;
  let mockActivatedRoute;
  let mockActivatedRouteWithGet;
  let mockSecurityService;
  let mockSelectedLanguageService;
  beforeEach(async(() => {
    mockSelectedLanguageService = jasmine.createSpyObj(['add']);
    mockSecurityService = jasmine.createSpyObj(['isLoggedIn']);
    mockActivatedRoute = {
      snapshot: {
        paramMap: {
          get: () => {},
        },
      },
    };

    mockActivatedRouteWithGet = {
      snapshot: {
        paramMap: {
          get: () => {
            return 'edit';
          },
        },
      },
    };
    mockBasicInformationService = jasmine.createSpyObj(['getAllLanguages']);
    mockLocation = jasmine.createSpyObj(['back']);
    mockLocalStorageService = jasmine.createSpyObj(['load', 'delete', 'save']);
    mockRouter = {
      navigate: jasmine
        .createSpy('navigate')
        .and.returnValue(Promise.resolve()),
    };
    mockNotificationService = jasmine.createSpyObj(['showMessage']);
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      declarations: [ChooseLanguagesComponent],
      providers: [
        {
          provide: SecurityService,
          useValue: mockSecurityService,
        },
        {
          provide: BasicInformationService,
          useValue: mockBasicInformationService,
        },
        {
          provide: SelectedLanguageService,
          useValue: mockSelectedLanguageService,
        },
        {
          provide: Location,
          useValue: mockLocation,
        },
        {
          provide: Router,
          useValue: mockRouter,
        },
        {
          provide: LocalStorageService,
          useValue: mockLocalStorageService,
        },
        {
          provide: ActivatedRoute,
          useValue: mockActivatedRoute,
        },
        {
          provide: NotificationService,
          useValue: mockNotificationService,
        },
        {
          provide: MatDialog,
          useValue: {},
        },
      ],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
    });
  }));

  describe('ngOnInit', () => {
    beforeEach(() => {
      fixture = TestBed.createComponent(ChooseLanguagesComponent);
      component = fixture.componentInstance;
    });

    it('should create', () => {
      mockBasicInformationService.getAllLanguages.and.callFake(() => {
        return of([{ code: 'a' } as LanguageModel] as LanguageModel[]);
      });

      fixture.detectChanges();
      expect(component).toBeTruthy();
    });

    it('should navigate to game-menu if user already selected language', () => {
      mockLocalStorageService.load.and.callFake(() => {
        return true;
      });

      fixture.detectChanges();

      expect(mockRouter.navigate).toHaveBeenCalledWith(['./game-menu']);
    });
  });

  describe('back', () => {
    beforeEach(() => {
      fixture = TestBed.createComponent(ChooseLanguagesComponent);
      component = fixture.componentInstance;
    });

    it('should navigate back when clicking on back button', () => {
      component.back();
      expect(mockLocation.back).toHaveBeenCalled();
    });
  });

  describe('saveToLocalStorage', () => {
    beforeEach(() => {
      fixture = TestBed.createComponent(ChooseLanguagesComponent);
      component = fixture.componentInstance;
    });

    it('should save list into localStorage if user is logged in', () => {
      component.baseLanguages = [{ code: 'fakeCode' } as LanguageModel];
      component.targetLanguages = [{ code: 'fakeCode' } as LanguageModel];
      mockSecurityService.isLoggedIn.and.callFake(() => {
        return true;
      });

      component.saveToLocalStorage();

      expect(mockLocalStorageService.save).toHaveBeenCalledWith(
        LocalStorageHelper.selectedLanguages,
        '{"base":[{}],"target":[{}]}'
      );
    });

    it('should save items into local storage if user is guest', () => {
      component.baseLanguages = [{ code: 'fakeCode' } as LanguageModel];
      component.targetLanguages = [{ code: 'fakeCode' } as LanguageModel];
      mockSecurityService.isLoggedIn.and.callFake(() => {
        return false;
      });

      component.saveToLocalStorage();

      expect(mockLocalStorageService.save).toHaveBeenCalledWith(
        LocalStorageHelper.selectedLanguages,
        '{"base":[[{"code":"fakeCode"}]],"target":[[{"code":"fakeCode"}]]}'
      );
    });
  });

  describe('saveToBackend', () => {
    beforeEach(() => {
      fixture = TestBed.createComponent(ChooseLanguagesComponent);
      component = fixture.componentInstance;
    });

    it('should save to localStorage if API success', () => {
      mockSelectedLanguageService.add.and.callFake(() => {
        return of({ name: 'something' });
      });
      spyOn(component, 'saveToLocalStorage');

      component.saveToBackend();

      expect(component.saveToLocalStorage).toHaveBeenCalled();
    });

    it('should handle errors if API fail', () => {
      mockSelectedLanguageService.add.and.callFake(() => {
        return throwError('some errors');
      });

      component.saveToBackend();

      expect(component.allLanguages.isLoading).toBeFalse();
    });
  });

  describe('submit', () => {
    beforeEach(() => {
      fixture = TestBed.createComponent(ChooseLanguagesComponent);
      component = fixture.componentInstance;
    });

    it('should show message is baseLanguages is empty', () => {
      component.baseLanguages = [];

      component.submit();

      expect(component.formValidation[0]).toEqual({
        isValid: false,
        message: 'Base language cannot be empty',
        field: 'baseLanguages',
      });
    });

    it('should show message is targetLanguages is empty', () => {
      component.baseLanguages = [];

      component.submit();

      expect(component.formValidation[1]).toEqual({
        isValid: false,
        message: 'Target language cannot be empty',
        field: 'targetLanguages',
      });
    });

    it('should show message is targetLanguages has more than 5 items', () => {
      component.targetLanguages = [
        {} as LanguageModel,
        {} as LanguageModel,
        {} as LanguageModel,
        {} as LanguageModel,
        {} as LanguageModel,
        {} as LanguageModel,
      ];

      component.submit();

      expect(component.formValidation[1]).toEqual({
        isValid: false,
        message: 'Target language should be less than 5',
        field: 'targetLanguages',
      });
    });

    it('should show message is baseLanguages has more than 5 items', () => {
      component.baseLanguages = [
        {} as LanguageModel,
        {} as LanguageModel,
        {} as LanguageModel,
        {} as LanguageModel,
        {} as LanguageModel,
        {} as LanguageModel,
      ];

      component.submit();

      expect(component.formValidation[1]).toEqual({
        isValid: false,
        message: 'Base language should be less than 5',
        field: 'baseLanguages',
      });
    });

    it('should call saveToBackend if all the validations pass and user is loggedIn', () => {
      component.baseLanguages = [{} as LanguageModel];
      component.targetLanguages = [{} as LanguageModel];
      spyOn(component, 'saveToBackend');
      mockSecurityService.isLoggedIn.and.callFake(() => {
        return true;
      });

      component.submit();

      expect(component.saveToBackend).toHaveBeenCalled();
    });

    it('should save to localStorage if user is guest', () => {
      component.baseLanguages = [{} as LanguageModel];
      component.targetLanguages = [{} as LanguageModel];
      spyOn(component, 'saveToLocalStorage');
      mockSecurityService.isLoggedIn.and.callFake(() => {
        return false;
      });

      component.submit();

      expect(component.saveToLocalStorage).toHaveBeenCalled();
    });
  });

  describe('checkFormValidation', () => {
    beforeEach(() => {
      fixture = TestBed.createComponent(ChooseLanguagesComponent);
      component = fixture.componentInstance;
    });

    it('should return message if formValidation match a field name', () => {
      component.formValidation = [{ field: 'fake field' } as ValidationModel];

      expect(component.checkFormValidation('fake field')).toBe(
        'field-not-valid'
      );
    });
  });

  describe('fillDataInModels', () => {
    beforeEach(() => {
      fixture = TestBed.createComponent(ChooseLanguagesComponent);
      component = fixture.componentInstance;
    });

    it('should fill targetLanguages and baseLanguages', () => {
      component.allLanguages.setData([
        { id: 1 } as LanguageModel,
        { id: 2 } as LanguageModel,
        { id: 3 } as LanguageModel,
        { id: 4 } as LanguageModel,
      ]);
      mockLocalStorageService.load.and.callFake(() => {
        return '{ "base": [{ "id": 1 }, { "id": 2 }], "target": [{ "id": 3 }, { "id": 4 }] }';
      });

      component.fillDataInModels();

      expect(component.baseLanguages).toEqual([
        { id: 1 } as LanguageModel,
        { id: 2 } as LanguageModel,
      ]);
      expect(component.targetLanguages).toEqual([
        { id: 3 } as LanguageModel,
        { id: 4 } as LanguageModel,
      ]);
    });
  });

  describe('getLanguages', () => {
    it('should set fill allLanguages with API result', () => {
      mockBasicInformationService.getAllLanguages.and.callFake(() => {
        return of([{ code: 'a' } as LanguageModel] as LanguageModel[]);
      });
      TestBed.compileComponents();
      fixture = TestBed.createComponent(ChooseLanguagesComponent);
      component = fixture.componentInstance;

      component.getLanguages();

      expect(component.allLanguages.data[0].code).toBe('a');
    });

    it('should call fillDataInModels if API success', () => {
      TestBed.overrideProvider(ActivatedRoute, {
        useValue: mockActivatedRouteWithGet,
      });
      mockBasicInformationService.getAllLanguages.and.callFake(() => {
        return of([{ code: 'a' } as LanguageModel] as LanguageModel[]);
      });
      TestBed.compileComponents();
      fixture = TestBed.createComponent(ChooseLanguagesComponent);
      component = fixture.componentInstance;
      spyOn(component, 'fillDataInModels');

      component.getLanguages();

      expect(component.fillDataInModels).toHaveBeenCalled();
    });

    it('should handle error when API fail', () => {
      TestBed.overrideProvider(ActivatedRoute, {
        useValue: mockActivatedRouteWithGet,
      });
      mockBasicInformationService.getAllLanguages.and.callFake(() => {
        return throwError('some errors');
      });
      TestBed.compileComponents();
      fixture = TestBed.createComponent(ChooseLanguagesComponent);
      component = fixture.componentInstance;
      spyOn(component, 'fillDataInModels');

      component.getLanguages();

      expect(mockNotificationService.showMessage).toHaveBeenCalledWith(
        'Failed to load languages',
        Severity.error
      );
      expect(component.allLanguages.isLoading).toBeFalse();
    });
  });
});
