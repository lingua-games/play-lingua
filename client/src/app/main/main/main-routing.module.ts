import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {FallingStarsComponent} from '../game/falling-stars/falling-stars.component';
import {MainComponent} from './main.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: 'falling-stars',
        component: FallingStarsComponent
      }
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule {
}
