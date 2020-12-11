import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WordManagementComponent } from './word-management.component';
import { WordManagementRoutingModule } from './word-management-routing.module';

@NgModule({
  declarations: [WordManagementComponent],
  imports: [CommonModule, WordManagementRoutingModule],
})
export class WordManagementModule {}
