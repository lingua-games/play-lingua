import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin.component';
import { WordsComponent } from './words/words.component';
import { ChaptersComponent } from './chapters/chapters.component';
import { BooksComponent } from './books/books.component';
import { SendInvitationComponent } from './send-invitation/send-invitation.component';
import { OnlyAdminAllowService } from '../../core/service/guards/only-admin-allow.service';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    canActivate: [OnlyAdminAllowService],
    children: [
      {
        path: 'send-invitation',
        component: SendInvitationComponent,
      },
      {
        path: 'words',
        component: WordsComponent,
      },
      {
        path: 'chapters',
        component: ChaptersComponent,
      },
      {
        path: 'books',
        component: BooksComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
