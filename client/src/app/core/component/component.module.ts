import { NgModule } from '@angular/core';
import { GameHintComponent } from './game-hint/game-hint.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [GameHintComponent],
  imports: [CommonModule, FormsModule],
  exports: [GameHintComponent],
})
export class ComponentModule {}
