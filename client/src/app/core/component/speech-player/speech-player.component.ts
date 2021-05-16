import { Component, Input, OnInit } from '@angular/core';
import { SpeechStatus } from '../../models/word-key-value.model';

@Component({
  selector: 'app-speech-player',
  templateUrl: './speech-player.component.html',
  styleUrls: ['./speech-player.component.scss'],
})
export class SpeechPlayerComponent implements OnInit {
  @Input() code = '';
  @Input() status?: SpeechStatus;
  constructor() {}

  ngOnInit(): void {}

  playSound(): void {
    const audio = new Audio(`/assets/speeches/${this.code}.mp3`);
    audio.play().then();
  }
}
