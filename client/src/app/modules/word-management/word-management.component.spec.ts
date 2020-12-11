import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WordManagementComponent } from './word-management.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('WordManagementComponent', () => {
  let component: WordManagementComponent;
  let fixture: ComponentFixture<WordManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [WordManagementComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WordManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
