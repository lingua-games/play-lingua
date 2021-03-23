import { Component, Input } from '@angular/core';
import { GameHint } from '../../models/game-hint.interface';

@Component({
  selector: 'app-game-hint',
  templateUrl: './game-hint.component.html',
  styleUrls: ['./game-hint.component.scss'],
})
export class GameHintComponent {
  @Input() hints: GameHint[] = [];
}
