import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrepareAddWordsComponent } from './prepare-add-words.component';

describe('PrepareAddWordsComponent', () => {
  let component: PrepareAddWordsComponent;
  let fixture: ComponentFixture<PrepareAddWordsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrepareAddWordsComponent ]
    })
    .compileComponents();
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
