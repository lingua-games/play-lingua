import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChooseLanguagesComponent } from './choose-languages.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MessageService } from 'primeng/api';
import { NotificationService } from '../../../core/service/notification.service';
import { RouterTestingModule } from '@angular/router/testing';

describe('ChooseLanguagesComponent', () => {
  let component: ChooseLanguagesComponent;
  let fixture: ComponentFixture<ChooseLanguagesComponent>;
  let mockNotificationService;
  beforeEach(async(() => {
    mockNotificationService = jasmine.createSpyObj(['showMessage']);
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      declarations: [ChooseLanguagesComponent],
      providers: [
        {
          provide: NotificationService,
          useValue: mockNotificationService,
        },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChooseLanguagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
