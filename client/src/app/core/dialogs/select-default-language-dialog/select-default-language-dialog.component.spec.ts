import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectDefaultLanguageDialogComponent } from './select-default-language-dialog.component';
import { NotificationService } from '../../service/notification.service';
import { Router } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatDialogRef } from '@angular/material/dialog';

describe('SelectDefaultLanguageDialogComponent', () => {
  let component: SelectDefaultLanguageDialogComponent;
  let fixture: ComponentFixture<SelectDefaultLanguageDialogComponent>;
  let mockNotificationService;
  let mockMatDialogRef;

  beforeEach(async(() => {
    mockNotificationService = jasmine.createSpyObj(['showMessage']);
    mockMatDialogRef = jasmine.createSpyObj(['close']);

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [SelectDefaultLanguageDialogComponent],
      providers: [
        {
          provide: MatDialogRef,
          useValue: mockMatDialogRef,
        },
        {
          provide: NotificationService,
          useValue: mockNotificationService,
        },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectDefaultLanguageDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
