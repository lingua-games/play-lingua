import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FallingStarsComponent } from './falling-stars.component';
import { FallingStarsRoutingModule } from './falling-stars-routing.module';
import { FormsModule } from '@angular/forms';
import { StartGameDialogComponent } from './start-game-dialog/start-game-dialog.component';
import { MaterialModule } from '../../common/material/material.module';
import { ComponentModule } from '../../../core/component/component.module';
import { StoreModule } from '@ngrx/store';
import { scoreNotificationReducer } from '../../../core/component/score-notification/state/score-notification.reducer';
import { FinishGameDialogComponent } from './finish-game-dialog/finish-game-dialog.component';
import { TopNavbarComponent } from '../../home/top-navbar/top-navbar.component';

@NgModule({
  declarations: [
    FallingStarsComponent,
    StartGameDialogComponent,
    FinishGameDialogComponent,
  ],
  imports: [
    CommonModule,
    FallingStarsRoutingModule,
    FormsModule,
    MaterialModule,
    ComponentModule,
    StoreModule.forFeature('notifications', scoreNotificationReducer),
  ],
})
export class FallingStarsModule {}
