import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WordManagementComponent } from './word-management.component';
import { WordManagementRoutingModule } from './word-management-routing.module';
import { AddWordByUserComponent } from './add-word-by-user/add-word-by-user.component';
import { ListWordsByUserComponent } from './list-words-by-user/list-words-by-user.component';

@NgModule({
  declarations: [WordManagementComponent, AddWordByUserComponent, ListWordsByUserComponent],
  imports: [CommonModule, WordManagementRoutingModule],
})
export class WordManagementModule {}
