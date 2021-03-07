import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditBookDialogComponent } from './add-edit-book.dialog.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';

describe('AddEditBook.DialogComponent', () => {
  let component: AddEditBookDialogComponent;
  let fixture: ComponentFixture<AddEditBookDialogComponent>;
  let mockMatDialogRef;

  beforeEach(async(() => {
    mockMatDialogRef = jasmine.createSpyObj(['close']);
    TestBed.configureTestingModule({
      declarations: [AddEditBookDialogComponent],
      providers: [
        {
          provide: MatDialogRef,
          useValue: mockMatDialogRef,
        },
        {
          provide: MAT_DIALOG_DATA,
          useValue: { id: 100 },
        },
      ],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditBookDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should copy data into component.book', () => {
    expect(component.book.id).toBe(100);
  });
});
