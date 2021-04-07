import { NgModule } from '@angular/core';
import { GameHintComponent } from './game-hint/game-hint.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GameOptionsComponent } from './exit-game/game-options.component';
import { TopNavbarComponent } from '../../modules/home/top-navbar/top-navbar.component';
import { RouterModule } from '@angular/router';
import { StartGameDialogComponent } from '../../modules/games/common-in-game/start-game-dialog/start-game-dialog.component';
import { FinishGameDialogComponent } from '../../modules/games/common-in-game/finish-game-dialog/finish-game-dialog.component';
import { MaterialModule } from '../../modules/common/material/material.module';
import { PrimengModule } from '../../modules/common/primeng/primeng.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [
    GameHintComponent,
    GameOptionsComponent,
    TopNavbarComponent,
    StartGameDialogComponent,
    FinishGameDialogComponent,
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
