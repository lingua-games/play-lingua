import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivateUserComponent } from './activate-user.component';
import { ActivatedRoute, convertToParamMap, Router } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MessageService } from 'primeng/api';
import { MatDialog } from '@angular/material/dialog';
import { of } from 'rxjs';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';

describe('ActivateUserComponent', () => {
  let component: ActivateUserComponent;
  let fixture: ComponentFixture<ActivateUserComponent>;
  let mockActivatedRoute;
  let mockMessageService;
  let mockRouter;

  beforeEach(async () => {
    mockActivatedRoute = {
      paramMap: of(convertToParamMap({})),
    };
    mockMessageService = jasmine.createSpyObj(['add']);
    mockRouter = {
      navigate: jasmine
        .createSpy('navigate')
        .and.returnValue(Promise.resolve()),
    };

    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [ActivateUserComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: mockActivatedRoute,
        },
        {
          provide: Router,
          useValue: mockRouter,
        },
        {
          provide: MessageService,
          useValue: mockMessageService,
        },
        {
          provide: MatDialog,
          useValue: {},
        },
      ],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivateUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
