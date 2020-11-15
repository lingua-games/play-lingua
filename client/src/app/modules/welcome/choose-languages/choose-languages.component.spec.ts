import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChooseLanguagesComponent } from './choose-languages.component';

describe('ChooseLanguagesComponent', () => {
  let component: ChooseLanguagesComponent;
  let fixture: ComponentFixture<ChooseLanguagesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChooseLanguagesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChooseLanguagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
