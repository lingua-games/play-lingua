import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvitationPreviewDialogComponent } from './invitation-preview-dialog.component';

describe('InvitationPreviewDialogComponent', () => {
  let component: InvitationPreviewDialogComponent;
  let fixture: ComponentFixture<InvitationPreviewDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InvitationPreviewDialogComponent ]
    })
    .compileComponents();
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
