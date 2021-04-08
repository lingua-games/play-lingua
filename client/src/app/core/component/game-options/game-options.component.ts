import { Component, Input, Output, EventEmitter } from '@angular/core';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

@Component({
  selector: 'app-game-options',
  templateUrl: './game-options.component.html',
  styleUrls: ['./game-options.component.scss'],
  animations: [
    trigger('iconAnimation', [
      state('true', style({ transform: 'rotate(0deg)' })),
      state('false', style({ transform: 'rotate(360deg)' })),
      transition('1 => 0', animate('500ms')),
      transition('0 => 1', animate('500ms')),
    ]),
  ],
})
export class GameOptionsComponent {
  isDetailsShowing = false;

  @Input() hasSkip?: boolean;

  @Output() exit = new EventEmitter();
  @Output() skip = new EventEmitter();

  showDetails(): void {
    this.isDetailsShowing = true;
  }

  hideDetails(): void {
    this.isDetailsShowing = false;
  }
}
