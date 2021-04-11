import { NgModule } from '@angular/core';
import { GameHintComponent } from './game-hint/game-hint.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TopNavbarComponent } from '../../modules/home/top-navbar/top-navbar.component';
import { RouterModule } from '@angular/router';
import { StartGameDialogComponent } from '../../modules/games/common-in-game/start-game-dialog/start-game-dialog.component';
import { FinishGameDialogComponent } from '../../modules/games/common-in-game/finish-game-dialog/finish-game-dialog.component';
import { MaterialModule } from '../../modules/common/material/material.module';
import { PrimengModule } from '../../modules/common/primeng/primeng.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { GameOptionsComponent } from './game-options/game-options.component';
import { GameInstructionComponent } from './game-instruction/game-instruction.component';

@NgModule({
  declarations: [
    GameHintComponent,
    GameOptionsComponent,
    TopNavbarComponent,
    StartGameDialogComponent,
    FinishGameDialogComponent,
    GameInstructionComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    MaterialModule,
    PrimengModule,
    FontAwesomeModule,
  ],
  exports: [
    GameHintComponent,
    GameOptionsComponent,
    TopNavbarComponent,
    StartGameDialogComponent,
    FinishGameDialogComponent,
  ],
})
export class ComponentModule {}
