import { ElementStyle } from './element-style.model';
import { SpeechStatus, TranslateModel } from './word-key-value.model';

export interface FallingStarsWord {
  animating: boolean;
  key: string;
  style: ElementStyle;
  selectedAnswer: string;
  correctShowingAnswer: string;
  correctAnswers: TranslateModel[];
  speechCode: string;
  speechStatus: SpeechStatus;
  possibleAnswers: string[];
  keyIsPressing: boolean;
  wrongCount: number;
  isBlinking: boolean;
  isCurrentlyPlaying: boolean;
}
