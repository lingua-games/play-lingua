import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FallingStarsComponent } from './falling-stars.component';
import { FallingStarsRoutingModule } from './falling-stars-routing.module';
import { FormsModule } from '@angular/forms';
import { StartGameDialogComponent } from './start-game-dialog/start-game-dialog.component';
import { MaterialModule } from '../../common/material/material.module';
import { ComponentModule } from '../../../core/component/component.module';

@NgModule({
  declarations: [FallingStarsComponent, StartGameDialogComponent],
  imports: [
    CommonModule,
    FallingStarsRoutingModule,
    FormsModule,
    MaterialModule,
    ComponentModule,
  ],
})
export class FallingStarsModule {}
