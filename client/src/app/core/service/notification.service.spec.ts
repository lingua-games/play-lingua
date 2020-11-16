import { TestBed } from '@angular/core/testing';
import { NotificationService } from './notification.service';
import { MessageService } from 'primeng/api';

describe('NotificationService', () => {
  let service: NotificationService;
  let mockMessageService;

  beforeEach(() => {
    mockMessageService = jasmine.createSpyObj(['add']);
    TestBed.configureTestingModule({
      providers: [
        {
          provide: MessageService,
          useValue: mockMessageService,
        },
        {
          provide: NotificationService,
          useValue: {},
        },
      ],
    }).compileComponents();
    TestBed.configureTestingModule({});
    service = TestBed.inject(NotificationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
