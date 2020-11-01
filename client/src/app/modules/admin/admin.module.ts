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

@NgModule({
  declarations: [
    AdminComponent,
    WordsComponent,
    ChaptersComponent,
    BooksComponent,
    AddEditBookDialogComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    AdminRoutingModule,
    FontAwesomeModule,
    MaterialModule,
  ],
})
export class AdminModule {}
