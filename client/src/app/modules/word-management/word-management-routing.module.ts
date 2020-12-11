import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WordManagementComponent } from './word-management.component';

const routes: Routes = [
  {
    path: '',
    component: WordManagementComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WordManagementRoutingModule {}
