import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutUsComponent } from './about-us.component';
import { MatDialog } from '@angular/material/dialog';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Location } from '@angular/common';
import { DonateCryptoDialogComponent } from '../donate-crypto-dialog/donate-crypto-dialog.component';

describe('AboutUsComponent', () => {
  let component: AboutUsComponent;
  let fixture: ComponentFixture<AboutUsComponent>;
  let mockLocation;
  let mockDialog;

  beforeEach(async () => {
    mockLocation = jasmine.createSpyObj(['back']);
    mockDialog = jasmine.createSpyObj('dialog', ['open']);
    await TestBed.configureTestingModule({
      declarations: [AboutUsComponent],
      providers: [
        { provide: MatDialog, useValue: mockDialog },
        { provide: Location, useValue: mockLocation },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AboutUsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('openDonateDialog', () => {
    it('should open dialog', () => {
      component.openDonateDialog();

      expect(mockDialog.open).toHaveBeenCalledWith(
        DonateCryptoDialogComponent,
        {
          width: '30%',
        }
      );
    });
  });
  describe('back', () => {
    it('should call location.back()', () => {
      component.back();

      expect(mockLocation.back).toHaveBeenCalled();
    });
  });
  describe('openExternalUrl', () => {
    it('should call window.open', () => {
      const expectedUrl = 'fake url';
      spyOn(window, 'open');

      component.openExternalUrl(expectedUrl);

      expect(window.open).toHaveBeenCalledWith(expectedUrl, '_blank');
    });
  });
});
