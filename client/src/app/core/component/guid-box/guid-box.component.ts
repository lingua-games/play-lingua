import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SpeechModel } from '../../models/speech.model';

@Component({
  selector: 'app-guid-box',
  templateUrl: './guid-box.component.html',
  styleUrls: ['./guid-box.component.scss'],
})
export class GuidBoxComponent implements OnInit {
  @Input() question = '';
  @Input() answer = '';
  @Input() answerSpeech = {} as SpeechModel;
  @Input() questionSpeech = {} as SpeechModel;
  @Output() Submit = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}
}
