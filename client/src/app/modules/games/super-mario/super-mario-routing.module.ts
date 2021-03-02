import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { SuperMarioComponent } from './super-mario.component';
import { UserAndGuestAllowService } from '../../../core/service/guards/user-and-guest-allow.service';

const routes: Routes = [
  {
    path: '',
    component: SuperMarioComponent,
    canActivate: [UserAndGuestAllowService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SuperMarioRoutingModule {}
