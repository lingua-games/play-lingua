import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DonateCryptoDialogComponent } from './donate-crypto-dialog.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import {
  NotificationService,
  Severity,
} from '../../../core/service/notification.service';

describe('DonateCryptoDialogComponent', () => {
  let component: DonateCryptoDialogComponent;
  let fixture: ComponentFixture<DonateCryptoDialogComponent>;
  let mockNotificationService;

  beforeEach(async () => {
    mockNotificationService = jasmine.createSpyObj(['showMessage']);

    await TestBed.configureTestingModule({
      declarations: [DonateCryptoDialogComponent],
      providers: [
        {
          provide: NotificationService,
          useValue: mockNotificationService,
        },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DonateCryptoDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call showMessage with appropriate message', () => {
    component.copyWalletNumber();

    expect(mockNotificationService.showMessage).toHaveBeenCalledWith(
      'Copied',
      Severity.success
    );
  });
});
