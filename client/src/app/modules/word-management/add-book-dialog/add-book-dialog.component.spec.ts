import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBookDialogComponent } from './add-book-dialog.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MaterialModule } from '../../common/material/material.module';
import { MatDialogRef } from '@angular/material/dialog';
import { MessageService } from 'primeng/api';
import { of } from 'rxjs';

describe('AddBookDialogComponent', () => {
  let component: AddBookDialogComponent;
  let fixture: ComponentFixture<AddBookDialogComponent>;
  let mockFormBuilder;
  let mockMatDialogRef;
  let mockMessageService;
  beforeEach(async(() => {
    mockMessageService = jasmine.createSpyObj(['add']);
    mockMatDialogRef = jasmine.createSpyObj(['close']);
    mockFormBuilder = jasmine.createSpyObj('formBuilder', {
      group: {
        get: (value: string) => {
          return of('result');
        },
      },
    });
    TestBed.configureTestingModule({
      imports: [MaterialModule],
      declarations: [AddBookDialogComponent],
      providers: [
        {
          provide: MessageService,
          useValue: mockMessageService,
        },
        {
          provide: FormBuilder,
          useValue: mockFormBuilder,
        },
        {
          provide: MatDialogRef,
          useValue: mockMatDialogRef,
        },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddBookDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
