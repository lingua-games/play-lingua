import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WordManagementComponent } from './word-management.component';
import { WordManagementRoutingModule } from './word-management-routing.module';
import { AddWordByUserComponent } from './add-word-by-user/add-word-by-user.component';
import { ListWordsByUserComponent } from './list-words-by-user/list-words-by-user.component';
import { PrimengModule } from '../common/primeng/primeng.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DirectiveModule } from '../../core/directives/directive.module';
import { AddBookDialogComponent } from './add-book-dialog/add-book-dialog.component';
import { MaterialModule } from '../common/material/material.module';
import { AddChapterDialogComponent } from './add-chapter-dialog/add-chapter-dialog.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [
    WordManagementComponent,
    AddWordByUserComponent,
    ListWordsByUserComponent,
    AddBookDialogComponent,
    AddChapterDialogComponent,
  ],
  imports: [
    CommonModule,
    WordManagementRoutingModule,
    PrimengModule,
    FormsModule,
    ReactiveFormsModule,
    DirectiveModule,
    MaterialModule,
    FontAwesomeModule,
  ],
})
export class WordManagementModule {}
