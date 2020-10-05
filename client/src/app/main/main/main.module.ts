import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MainComponent} from './main.component';
import {MainRoutingModule} from './main-routing.module';
import {FallingStarsComponent} from '../game/falling-stars/falling-stars.component';
import {FormsModule} from '@angular/forms';

@NgModule({
  declarations: [MainComponent, FallingStarsComponent],
  imports: [
    CommonModule,
    MainRoutingModule,
    FormsModule
  ]
})
export class MainModule {
}
