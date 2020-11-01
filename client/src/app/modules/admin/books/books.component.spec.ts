import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BooksComponent } from './books.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatDialog } from '@angular/material/dialog';

describe('BooksComponent', () => {
  let component: BooksComponent;
  let fixture: ComponentFixture<BooksComponent>;
  let mockMatDialog;

  beforeEach(async(() => {
    mockMatDialog = jasmine.createSpyObj(['open']);
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [BooksComponent],
      providers: [
        {
          provide: MatDialog,
          useValue: mockMatDialog,
        },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BooksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
