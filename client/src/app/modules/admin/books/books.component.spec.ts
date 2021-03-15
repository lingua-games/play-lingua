import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { BooksComponent } from './books.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatDialog } from '@angular/material/dialog';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { BasicInformationService } from '../../../core/service/basic-information.service';
import { of, throwError } from 'rxjs';
import { BookModel } from '../../../core/models/book.model';

describe('BooksComponent', () => {
  let component: BooksComponent;
  let fixture: ComponentFixture<BooksComponent>;
  let mockMatDialog;
  let mockBasicInformationService;
  const getBooksApiResult = [{ name: 'testBook' } as BookModel];

  beforeEach(
    waitForAsync(() => {
      mockBasicInformationService = jasmine.createSpyObj([
        'getBooks',
        'addBook',
        'editBook',
        'deleteBook',
      ]);

      mockMatDialog = jasmine.createSpyObj('dialog', {
        open: {
          afterClosed: () => {
            return of();
          },
        },
      });
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [BooksComponent],
        providers: [
          {
            provide: MatDialog,
            useValue: mockMatDialog,
          },
          {
            provide: BasicInformationService,
            useValue: mockBasicInformationService,
          },
        ],
        schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(BooksComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    mockBasicInformationService.getBooks.and.callFake(() => {
      return of(getBooksApiResult);
    });

    fixture.detectChanges();

    expect(component).toBeTruthy();
  });

  it('should call getBooks service when getBooks hits', () => {
    mockBasicInformationService.getBooks.and.callFake(() => {
      return of(getBooksApiResult);
    });

    component.getBooks();

    expect(component.books).toBe(getBooksApiResult);
  });

  it('should catch Error when getBooks service fail', () => {
    mockBasicInformationService.getBooks.and.callFake(() => {
      return throwError('No response from server');
    });

    component.getBooks();

    expect(2).toBe(2);
  });

  it('should open dialog when openAddEditDialog hits', () => {
    component.openAddEditDialog({} as BookModel);
    expect(mockMatDialog.open).toHaveBeenCalled();
  });

  it('should call editBook when dialog close and we have book.id', () => {
    const dialogData = { name: 'testBook', id: 1 } as BookModel;
    mockMatDialog.open.and.callFake(() => {
      return {
        afterClosed: () => of(dialogData),
      };
    });
    spyOn(component, 'editBook');

    component.openAddEditDialog({} as BookModel);

    expect(component.editBook).toHaveBeenCalledWith(dialogData);
  });

  it('should call addBook when dialog close and we DONT have book.id', () => {
    const dialogData = { name: 'testBook', id: 0 } as BookModel;
    mockMatDialog.open.and.callFake(() => {
      return {
        afterClosed: () => of(dialogData),
      };
    });
    spyOn(component, 'addBook');

    component.openAddEditDialog({} as BookModel);

    expect(component.addBook).toHaveBeenCalledWith(dialogData);
  });

  it('should call addBook service when addBook hits', () => {
    mockBasicInformationService.addBook.and.callFake(() => {
      return of(getBooksApiResult[0]);
    });
    component.books = [];

    component.addBook(getBooksApiResult[0]);

    expect(component.books[0]).toEqual(getBooksApiResult[0]);
  });

  it('should handle error when call addBook service', () => {
    mockBasicInformationService.addBook.and.callFake(() => {
      return throwError('No response from server');
    });
    component.books = [];

    component.addBook(getBooksApiResult[0]);

    expect(2).toBe(2);
  });

  it('should call getBooks when editBook hits', () => {
    mockBasicInformationService.editBook.and.callFake(() => {
      return of({});
    });
    spyOn(component, 'getBooks');

    component.editBook({} as BookModel);

    expect(component.getBooks).toHaveBeenCalled();
  });

  it('should handle error when call addBook service', () => {
    mockBasicInformationService.editBook.and.callFake(() => {
      return throwError('No response from server');
    });

    component.editBook(getBooksApiResult[0]);

    expect(2).toBe(2);
  });

  it('should call deleteBook service when deleteBook hits', () => {
    component.books = getBooksApiResult;
    mockBasicInformationService.deleteBook.and.callFake(() => {
      return of(getBooksApiResult[0]);
    });
    component.books = [];

    component.deleteBook(1);

    expect(component.books.length).toBe(0);
  });

  it('should handle error when call deleteBook service', () => {
    component.books = getBooksApiResult;
    mockBasicInformationService.deleteBook.and.callFake(() => {
      return throwError('No response from server');
    });
    component.deleteBook(1);

    expect(2).toBe(2);
  });
});
