import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { SuperMarioComponent } from './super-mario.component';

const routes: Routes = [
  {
    path: '',
    component: SuperMarioComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SuperMarioRoutingModule {}
