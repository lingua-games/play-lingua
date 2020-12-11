import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WordManagementComponent } from './word-management.component';
import { ListWordsByUserComponent } from './list-words-by-user/list-words-by-user.component';
import { AddWordByUserComponent } from './add-word-by-user/add-word-by-user.component';

const routes: Routes = [
  {
    path: '',
    component: WordManagementComponent,
    children: [
      {
        path: '',
        redirectTo: 'list',
        pathMatch: 'full',
      },
      {
        path: 'list',
        component: ListWordsByUserComponent,
      },
      {
        path: 'add',
        component: AddWordByUserComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WordManagementRoutingModule {}
