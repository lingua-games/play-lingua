import { Component, OnInit } from '@angular/core';
import { GameHint } from '../../models/game-hint.interface';
import { EGame } from '../../models/e-game';
import { BasicInformationService } from '../../service/basic-information.service';

@Component({
  selector: 'app-game-hint',
  templateUrl: './game-hint.component.html',
  styleUrls: ['./game-hint.component.scss'],
})
export class GameHintComponent implements OnInit {
  hints: GameHint[] = [];

  constructor(private basicInformationService: BasicInformationService) {}

  ngOnInit(): void {
    this.getHints();
  }

  getHints(): void {
    this.hints = this.basicInformationService.gameHints(EGame.fallingStars);
  }
}
