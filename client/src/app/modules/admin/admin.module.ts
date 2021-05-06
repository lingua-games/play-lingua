import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { AdminRoutingModule } from './admin-routing.module';
import { WordsComponent } from './words/words.component';
import { ChaptersComponent } from './chapters/chapters.component';
import { BooksComponent } from './books/books.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AddEditBookDialogComponent } from './books/add-edit-book.dialog/add-edit-book.dialog.component';
import { MaterialModule } from '../common/material/material.module';
import { FormsModule } from '@angular/forms';
import { SendInvitationComponent } from './send-invitation/send-invitation.component';
import { PrimengModule } from '../common/primeng/primeng.module';
import { ViewInvitationsComponent } from './view-invitations/view-invitations.component';
import { InvitationPreviewDialogComponent } from './invitation-preview-dialog/invitation-preview-dialog.component';

@NgModule({
  declarations: [
    AdminComponent,
    WordsComponent,
    ChaptersComponent,
    BooksComponent,
    AddEditBookDialogComponent,
    SendInvitationComponent,
    ViewInvitationsComponent,
    InvitationPreviewDialogComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    AdminRoutingModule,
    FontAwesomeModule,
    MaterialModule,
    PrimengModule,
  ],
  entryComponents: [InvitationPreviewDialogComponent],
})
export class AdminModule {}
