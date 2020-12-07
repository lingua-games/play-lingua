import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrepareAddWordsComponent } from './prepare-add-words.component';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';

describe('PrepareAddWordsComponent', () => {
  let component: PrepareAddWordsComponent;
  let fixture: ComponentFixture<PrepareAddWordsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PrepareAddWordsComponent],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrepareAddWordsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
