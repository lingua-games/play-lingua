import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ProfileComponent } from './profile.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NotificationService } from '../../../core/service/notification.service';
import { RouterTestingModule } from '@angular/router/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SecurityService } from '../../../core/service/security.service';
import { SecurityTokenInterface } from '../../../core/models/security-token.interface';

describe('ProfileComponent', () => {
  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;
  let mockNotificationService;
  let mockSecurityService;
  beforeEach(async(() => {
    mockNotificationService = jasmine.createSpyObj(['showMessage']);
    mockSecurityService = jasmine.createSpyObj({
      getTokenInformation: {} as SecurityTokenInterface,
    });

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      declarations: [ProfileComponent],
      providers: [
        {
          provide: NotificationService,
          useValue: mockNotificationService,
        },
        {
          provide: MatDialog,
          useValue: {},
        },
        {
          provide: SecurityService,
          useValue: mockSecurityService,
        },
      ],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
