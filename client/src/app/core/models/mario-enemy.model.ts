import { ElementStyle } from './element-style.model';
import { WordKeyValueModel } from './word-key-value.model';

export class MarioEnemy {
  text?: WordKeyValueModel<string[]>;
  valueToAsk?: string;
  style: ElementStyle = {} as ElementStyle;
  mushroomImage?: string;
  status?: MarioEnemyStatus;
}

export enum MarioEnemyStatus {
  WaitingForStart = -1,
  Start = 0,
  IsMoving = 1,
  Finished = 2,
}
