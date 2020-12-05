import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FallingStarsComponent } from './falling-stars.component';
import { FallingStarsRoutingModule } from './falling-stars-routing.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [FallingStarsComponent],
  imports: [CommonModule, FallingStarsRoutingModule, FormsModule],
})
export class FallingStarsModule {}
