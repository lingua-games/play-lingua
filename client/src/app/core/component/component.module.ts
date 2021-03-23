import { NgModule } from '@angular/core';
import { GameHintComponent } from './game-hint/game-hint.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ExitGameComponent } from './exit-game/exit-game.component';
import { TopNavbarComponent } from '../../modules/home/top-navbar/top-navbar.component';
import { RouterModule } from '@angular/router';
import { StartGameDialogComponent } from '../../modules/games/common-in-game/start-game-dialog/start-game-dialog.component';
import { FinishGameDialogComponent } from '../../modules/games/common-in-game/finish-game-dialog/finish-game-dialog.component';

@NgModule({
  declarations: [
    GameHintComponent,
    ExitGameComponent,
    TopNavbarComponent,
    StartGameDialogComponent,
    FinishGameDialogComponent,
  ],
  imports: [CommonModule, FormsModule, RouterModule],
  exports: [
    GameHintComponent,
    ExitGameComponent,
    TopNavbarComponent,
    StartGameDialogComponent,
    FinishGameDialogComponent,
  ],
})
export class ComponentModule {}
