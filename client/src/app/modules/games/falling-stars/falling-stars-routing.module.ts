import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { FallingStarsComponent } from './falling-stars.component';
import { UserAndGuestAllowService } from '../../../core/service/guards/user-and-guest-allow.service';

const routes: Routes = [
  {
    path: '',
    component: FallingStarsComponent,
    canActivate: [UserAndGuestAllowService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FallingStarsRoutingModule {}
