import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { InvitationForm } from '../../../core/models/invitation-form.interface';

@Component({
  selector: 'app-invitation-preview-dialog',
  templateUrl: './invitation-preview-dialog.component.html',
  styleUrls: ['./invitation-preview-dialog.component.scss'],
})
export class InvitationPreviewDialogComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<InvitationPreviewDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: InvitationForm
  ) {}

  ngOnInit(): void {}
}
