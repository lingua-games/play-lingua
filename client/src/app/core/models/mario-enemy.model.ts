import {ElementStyle} from './element-style.model';

export class MarioEnemy {
  text: string;
  style: ElementStyle;
  status: MarioEnemyStatus;
}

export enum MarioEnemyStatus {
  WaitingForStart = -1,
  Start = 0,
  IsMoving = 1,
  Finished = 2
}
