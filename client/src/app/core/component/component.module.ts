import { NgModule } from '@angular/core';
import { GameHintComponent } from './game-hint/game-hint.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ExitGameComponent } from './exit-game/exit-game.component';
import { TopNavbarComponent } from '../../modules/home/top-navbar/top-navbar.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [GameHintComponent, ExitGameComponent, TopNavbarComponent],
  imports: [CommonModule, FormsModule, RouterModule],
  exports: [GameHintComponent, ExitGameComponent, TopNavbarComponent],
})
export class ComponentModule {}
