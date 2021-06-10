import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DonateCryptoDialogComponent } from './donate-crypto-dialog.component';
import { MessageService } from 'primeng/api';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('DonateCryptoDialogComponent', () => {
  let component: DonateCryptoDialogComponent;
  let fixture: ComponentFixture<DonateCryptoDialogComponent>;
  let mockMessageService;

  beforeEach(async () => {
    mockMessageService = jasmine.createSpyObj(['add']);

    await TestBed.configureTestingModule({
      declarations: [DonateCryptoDialogComponent],
      providers: [
        {
          provide: MessageService,
          useValue: mockMessageService,
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
});
