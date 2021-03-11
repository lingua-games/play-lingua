import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { WordManagementComponent } from './word-management.component';
import { NavigationEnd, Router } from '@angular/router';
import { of } from 'rxjs';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';

describe('WordManagementComponent', () => {
  let component: WordManagementComponent;
  let fixture: ComponentFixture<WordManagementComponent>;
  let mockRouter;
  beforeEach(async(() => {
    mockRouter = {
      events: of(new NavigationEnd(0, 'fake url', 'fake url')),
    };
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        {
          provide: Router,
          useValue: mockRouter,
        },
      ],
      declarations: [WordManagementComponent],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
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

  it('should set url into currentRoute', () => {
    expect(component.currentRoute).toBe('fake url');
  });
});
