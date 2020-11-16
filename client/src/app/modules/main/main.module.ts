import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main.component';
import { MainRoutingModule } from './main-routing.module';
import { FallingStarsComponent } from './game/falling-stars/falling-stars.component';
import { FormsModule } from '@angular/forms';
import {
  FaIconLibrary,
  FontAwesomeModule,
} from '@fortawesome/angular-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { SuperMarioComponent } from './game/super-mario/super-mario.component';
import { MaterialModule } from '../common/material/material.module';

@NgModule({
  declarations: [MainComponent, FallingStarsComponent, SuperMarioComponent],
  imports: [
    CommonModule,
    MainRoutingModule,
    FormsModule,
    FontAwesomeModule,
    MaterialModule,
  ],
})
export class MainModule {
  constructor(private iconLibrary: FaIconLibrary) {
    iconLibrary.addIcons(faArrowLeft);
  }
}
