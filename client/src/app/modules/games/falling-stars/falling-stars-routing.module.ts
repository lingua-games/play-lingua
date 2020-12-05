import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { FallingStarsComponent } from './falling-stars.component';

const routes: Routes = [
  {
    path: '',
    component: FallingStarsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FallingStarsRoutingModule {}
