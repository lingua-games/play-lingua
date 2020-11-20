import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterComponent } from './register.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NotificationService } from '../../../core/service/notification.service';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let mockNotificationService;
  beforeEach(async(() => {
    mockNotificationService = jasmine.createSpyObj(['showMessage']);

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [RegisterComponent],
      providers: [
        {
          provide: NotificationService,
          useValue: mockNotificationService,
        },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
