import { NgModule } from '@angular/core';
import { GameHintComponent } from './game-hint/game-hint.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ExitGameComponent } from './exit-game/exit-game.component';

@NgModule({
  declarations: [GameHintComponent, ExitGameComponent],
  imports: [CommonModule, FormsModule],
  exports: [GameHintComponent, ExitGameComponent],
})
export class ComponentModule {}
