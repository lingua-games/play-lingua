import { Component, Input, OnInit } from '@angular/core';
import { GameNameEnum } from '../../models/game-name.enum';

@Component({
  selector: 'app-game-instruction',
  templateUrl: './game-instruction.component.html',
  styleUrls: ['./game-instruction.component.scss'],
})
export class GameInstructionComponent implements OnInit {
  @Input() gameName: GameNameEnum = -1;
  constructor() {}

  ngOnInit(): void {}
}
