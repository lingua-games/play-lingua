import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-game-options',
  templateUrl: './exit-game.component.html',
  styleUrls: ['./exit-game.component.scss'],
})
export class ExitGameComponent {
  @Input() hasSkip?: boolean;

  @Output() exit = new EventEmitter();
  @Output() skip = new EventEmitter();
}
