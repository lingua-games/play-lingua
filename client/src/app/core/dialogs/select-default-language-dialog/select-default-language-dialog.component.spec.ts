import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectDefaultLanguageDialogComponent } from './select-default-language-dialog.component';

describe('SelectDefaultLanguageDialogComponent', () => {
  let component: SelectDefaultLanguageDialogComponent;
  let fixture: ComponentFixture<SelectDefaultLanguageDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectDefaultLanguageDialogComponent ]
    })
    .compileComponents();
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
