import { TestBed } from '@angular/core/testing';
import { NotificationService, Severity } from './notification.service';
import { MessageService } from 'primeng/api';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';

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
      ],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
    TestBed.configureTestingModule({});
    service = TestBed.inject(NotificationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call add() with bc when showMessage hits with bc', () => {
    service.showMessage('message', Severity.success, 'error', 'bc');

    expect(mockMessageService.add).toHaveBeenCalled();
  });

  it('should call add() with bc when showMessage hits with bc', () => {
    service.showMessage('message', Severity.success, 'error');

    expect(mockMessageService.add).toHaveBeenCalled();
  });
});
