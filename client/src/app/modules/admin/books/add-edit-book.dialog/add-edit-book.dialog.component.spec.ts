import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditBookDialogComponent } from './add-edit-book.dialog.component';

describe('AddEditBook.DialogComponent', () => {
  let component: AddEditBookDialogComponent;
  let fixture: ComponentFixture<AddEditBookDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AddEditBookDialogComponent],
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
});
