import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SuperMarioRoutingModule } from './super-mario-routing.module';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '../../common/material/material.module';
import { ComponentModule } from '../../../core/component/component.module';
import { SuperMarioComponent } from './super-mario.component';
import { StoreModule } from '@ngrx/store';
import { scoreNotificationReducer } from '../../../core/component/score-notification/state/score-notification.reducer';

@NgModule({
  declarations: [SuperMarioComponent],
  imports: [
    CommonModule,
    SuperMarioRoutingModule,
    FormsModule,
    MaterialModule,
    ComponentModule,
    StoreModule.forFeature('notifications', scoreNotificationReducer),
  ],
})
export class SuperMarioModule {}
