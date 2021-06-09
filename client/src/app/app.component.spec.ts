import { TestBed, ComponentFixture, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
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

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;
  let mockSecurityService;
  let mockUserService;
  let mockMessageService;
  beforeEach(
    waitForAsync(() => {
      mockMessageService = jasmine.createSpyObj(['add']);
      mockSecurityService = jasmine.createSpyObj([
        'isLoggedIn',
        'initialTotalScore',
      ]);

      mockUserService = jasmine.createSpyObj('userService', [
        'getUserInformation',
      ]);

      TestBed.configureTestingModule({
        imports: [
          RouterTestingModule,
          HttpClientTestingModule,
          BrowserAnimationsModule,
        ],
        declarations: [AppComponent],
        providers: [
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

  it('should create the app', () => {
    mockSecurityService.isLoggedIn.and.callFake(() => {
      return { success: false };
    });
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should call getUserInformation if isLoggedIn', () => {
    mockSecurityService.isLoggedIn.and.callFake(() => {
      return { success: true };
    });
    spyOn(component, 'getUserInformation');

    fixture.detectChanges();

    expect(component.getUserInformation).toHaveBeenCalled();
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
});
