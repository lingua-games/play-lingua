import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GreetingComponent } from './greeting.component';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { SecurityService } from '../../../core/service/security.service';
import { Router } from '@angular/router';
import { LocalStorageService } from '../../../core/service/local-storage.service';
import { LocalStorageHelper } from '../../../core/models/local-storage.enum';

describe('GreetingComponent', () => {
  let component: GreetingComponent;
  let fixture: ComponentFixture<GreetingComponent>;
  let mockSecurityService;
  let mockRouter;
  let mockLocalStorageService;
  beforeEach(async(() => {
    mockSecurityService = jasmine.createSpyObj(['isLoggedIn']);
    mockLocalStorageService = jasmine.createSpyObj(['save', 'delete']);
    mockRouter = {
      navigate: jasmine
        .createSpy('navigate')
        .and.returnValue(Promise.resolve()),
    };
    TestBed.configureTestingModule({
      imports: [],
      declarations: [GreetingComponent],
      providers: [
        {
          provide: LocalStorageService,
          useValue: mockLocalStorageService,
        },
        {
          provide: SecurityService,
          useValue: mockSecurityService,
        },
        {
          provide: Router,
          useValue: mockRouter,
        },
      ],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GreetingComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should navigate if user is logged in', () => {
    mockSecurityService.isLoggedIn.and.callFake(() => {
      return true;
    });

    fixture.detectChanges();

    expect(mockRouter.navigate).toHaveBeenCalledWith(['game-menu']);
  });

  describe('playGuest', () => {
    it('should save is guest to true', () => {
      component.playGuest();
      expect(mockLocalStorageService.save).toHaveBeenCalledWith(
        LocalStorageHelper.isGuest,
        'true'
      );
    });

    it('should delete selectedLanguages', () => {
      component.playGuest();
      expect(mockLocalStorageService.delete).toHaveBeenCalledWith(
        LocalStorageHelper.selectedLanguages
      );
    });

    it('should delete defaultLanguages', () => {
      component.playGuest();
      expect(mockLocalStorageService.delete).toHaveBeenCalledWith(
        LocalStorageHelper.defaultLanguages
      );
    });

    it('should navigate to choose-language page', () => {
      component.playGuest();
      expect(mockRouter.navigate).toHaveBeenCalledWith(['choose-languages']);
    });
  });
});
