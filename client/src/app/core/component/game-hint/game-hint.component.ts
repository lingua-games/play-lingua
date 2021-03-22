import { Component, Input, OnInit } from '@angular/core';
import { GameHint } from '../../models/game-hint.interface';
import { EGame } from '../../models/e-game';
import { BasicInformationService } from '../../service/basic-information.service';

@Component({
  selector: 'app-game-hint',
  templateUrl: './game-hint.component.html',
  styleUrls: ['./game-hint.component.scss'],
})
export class GameHintComponent {
  @Input() hints: GameHint[] = [];
}
