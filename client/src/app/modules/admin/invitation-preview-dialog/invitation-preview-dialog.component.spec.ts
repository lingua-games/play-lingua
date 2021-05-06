import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvitationPreviewDialogComponent } from './invitation-preview-dialog.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

describe('InvitationPreviewDialogComponent', () => {
  let component: InvitationPreviewDialogComponent;
  let fixture: ComponentFixture<InvitationPreviewDialogComponent>;
  let mockMatDialogRef;

  beforeEach(async () => {
    mockMatDialogRef = jasmine.createSpyObj(['close']);

    await TestBed.configureTestingModule({
      declarations: [InvitationPreviewDialogComponent],
      providers: [
        {
          provide: MatDialogRef,
          useValue: mockMatDialogRef,
        },
        {
          provide: MAT_DIALOG_DATA,
          useValue: {},
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InvitationPreviewDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
