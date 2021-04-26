import { ElementStyle } from './element-style.model';

export interface FallingStarsWord {
  animating: boolean;
  key: string;
  style: ElementStyle;
  selectedAnswer: string;
  correctShowingAnswer: string;
  correctAnswers: string[];
  possibleAnswers: string[];
  keyIsPressing: boolean;
  wrongCount: number;
  isBlinking: boolean;
}
