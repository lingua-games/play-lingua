import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListWordsByUserComponent } from './list-words-by-user.component';

describe('ListWordsByUserComponent', () => {
  let component: ListWordsByUserComponent;
  let fixture: ComponentFixture<ListWordsByUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListWordsByUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListWordsByUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
