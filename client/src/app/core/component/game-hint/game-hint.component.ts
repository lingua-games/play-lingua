import { Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-game-hint',
  templateUrl: './game-hint.component.html',
  styleUrls: ['./game-hint.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class GameHintComponent {
  @Input() hints?: string;
}
