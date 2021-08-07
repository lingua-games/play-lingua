import { TestBed, ComponentFixture, waitForAsync } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatDialog } from '@angular/material/dialog';
import { SecurityService } from './core/service/security.service';
import { of, throwError } from 'rxjs';
import { UserModel } from './core/models/user.model';
import { UserService } from './core/service/user.service';
import { MessageService } from 'primeng/api';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DeviceDetectorService } from 'ngx-device-detector';
import { NavigationStart, Router } from '@angular/router';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;
  let mockSecurityService;
  let mockDeviceDetectorService;
  let mockUserService;
  let mockMessageService;
  let mockRouter;
  beforeEach(
    waitForAsync(() => {
      mockMessageService = jasmine.createSpyObj(['add']);
      mockSecurityService = jasmine.createSpyObj([
        'isLoggedIn',
        'initialTotalScore',
      ]);
      mockRouter = jasmine.createSpyObj(['events']);
      mockDeviceDetectorService = jasmine.createSpyObj(
        'deviceDetectorService',
        {
          isMobile: false,
          isTablet: false,
        }
      );
      mockUserService = jasmine.createSpyObj('userService', [
        'getUserInformation',
      ]);

      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule, BrowserAnimationsModule],
        declarations: [AppComponent],
        providers: [
          {
            provide: Router,
            useValue: mockRouter,
          },
          {
            provide: MatDialog,
            useValue: {},
          },
          {
            provide: MessageService,
            useValue: mockMessageService,
          },
          {
            provide: SecurityService,
            useValue: mockSecurityService,
          },
          {
            provide: DeviceDetectorService,
            useValue: mockDeviceDetectorService,
          },
          {
            provide: UserService,
            useValue: mockUserService,
          },
        ],
        schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    beforeEach(() => {
      mockSecurityService.isLoggedIn.and.callFake(() => {
        return { success: false };
      });
      mockRouter.events = of(new NavigationStart(0, 'games/'));
    });

    it('should create the app', () => {
      fixture.detectChanges();

      expect(component).toBeTruthy();
    });

    it('should get device information at Initial time ', () => {
      fixture.detectChanges();

      expect(mockDeviceDetectorService.isMobile).toHaveBeenCalled();
      expect(mockDeviceDetectorService.isTablet).toHaveBeenCalled();
    });

    it('should call getUserInformation if isLoggedIn', () => {
      mockSecurityService.isLoggedIn.and.callFake(() => {
        return { success: true };
      });
      spyOn(component, 'getUserInformation');

      fixture.detectChanges();

      expect(component.getUserInformation);
    });

    it('should set showAboutUs to false if in game', () => {
      fixture.detectChanges();

      expect(component.showAboutUs).toBeFalsy();
    });

    it('should set showAboutUs to true if NOT in game', () => {
      mockRouter.events = of(new NavigationStart(0, 'something-else/'));

      fixture.detectChanges();

      expect(component.showAboutUs).toBeTrue();
    });
  });

  it('should set loading for total score when calling getUserInformation', () => {
    mockUserService.getUserInformation.and.callFake(() => {
      return of({ totalScore: 1 });
    });

    component.getUserInformation();

    expect(mockSecurityService.initialTotalScore).toHaveBeenCalledWith(
      'loading'
    );
  });

  it('should set total score when calling getUserInformation service and get success result', () => {
    const value: UserModel = { totalScore: 1 } as UserModel;
    mockUserService.getUserInformation.and.callFake(() => {
      return of(value);
    });

    component.getUserInformation();

    expect(mockSecurityService.initialTotalScore).toHaveBeenCalledWith(
      value.totalScore.toString()
    );
  });

  it('should set 0 for total score when calling getUserInformation service and get error result', () => {
    mockUserService.getUserInformation.and.callFake(() => {
      return throwError('');
    });

    component.getUserInformation();

    expect(mockSecurityService.initialTotalScore).toHaveBeenCalledWith('0');
  });

  it('should call window.open with proper url when openExternalUrl method calls', () => {
    spyOn(window, 'open');

    component.openExternalUrl('fake url');

    expect(window.open).toHaveBeenCalledWith('fake url', '_blank');
  });
});
