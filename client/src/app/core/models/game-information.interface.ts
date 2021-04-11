import { GameHint } from './game-hint.interface';
import { GameNameEnum } from './game-name.enum';

export interface GameInformationInterface {
  name: string;
  code: GameNameEnum;
  hints: GameHint[];
}
