import { Injectable } from '@angular/core';
import { GameNameEnum } from '../models/game-name.enum';
import { GameActionEnum } from '../models/game-action.enum';

@Injectable({
  providedIn: 'root',
})
export class SoundService {
  // tslint:disable-next-line:no-any
  songs: any[] = [];
  constructor() {}

  loadSounds(game: GameNameEnum): void {
    if (game === GameNameEnum.supperMario) {
      this.songs[GameActionEnum.backGroundSond] = new Audio(
        '../../../assets/mario/song.mp3'
      );
      this.songs[GameActionEnum.success] = new Audio(
        '../../../assets/mario/success.mp3'
      );
      this.songs[GameActionEnum.fail] = new Audio(
        '../../../assets/mario/death.mp3'
      );
      this.songs[GameActionEnum.jump] = new Audio(
        '../../../assets/mario/jump.mp3'
      );
    }
  }

  stopGameSong(action: GameActionEnum): void {
    this.songs[action].pause();
  }

  playActionSong(action: GameActionEnum, isSoundOn: boolean): void {
    if (!isSoundOn) {
      return;
    }
    this.songs[action].play();
    if (action === GameActionEnum.backGroundSond) {
      this.songs[action].loop = true;
    }
    this.songs[action].volume = 0.03;
  }
}
