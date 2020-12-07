import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddWordByUserComponent } from './add-word-by-user.component';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';

describe('AddWordByUserComponent', () => {
  let component: AddWordByUserComponent;
  let fixture: ComponentFixture<AddWordByUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AddWordByUserComponent],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddWordByUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
