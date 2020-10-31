import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AdminComponent} from './admin.component';
import {AdminRoutingModule} from './admin-routing.module';
import { WordsComponent } from './words/words.component';
import { ChaptersComponent } from './chapters/chapters.component';
import { BooksComponent } from './books/books.component';


@NgModule({
  declarations: [AdminComponent, WordsComponent, ChaptersComponent, BooksComponent],
  imports: [
    CommonModule,
    AdminRoutingModule
  ]
})
export class AdminModule {
}
