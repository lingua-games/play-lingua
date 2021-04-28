import { Injectable } from '@angular/core';
import { GameNameEnum } from '../models/game-name.enum';
import { GameActionEnum } from '../models/game-action.enum';

@Injectable({
  providedIn: 'root',
})
export class SoundService {
  song = new Audio();
  actionSound = new Audio();
  constructor() {}

  playGameSong(game: GameNameEnum, isSoundOn: boolean): void {
    if (!isSoundOn) {
      return;
    }
    if (game === GameNameEnum.supperMario) {
      this.song = new Audio('../../../assets/mario/song.mp3');
      this.song.play();
      this.song.volume = 0.1;
    }
  }

  stopGameSong(): void {
    this.song.pause();
  }

  playActionSong(
    game: GameNameEnum,
    action: GameActionEnum,
    isSoundOn: boolean
  ): void {
    if (!isSoundOn) {
      return;
    }
    if (game === GameNameEnum.supperMario) {
      if (action === GameActionEnum.jump) {
        this.actionSound = new Audio('../../../assets/mario/jump.mp3');
        this.actionSound.play();
        this.actionSound.volume = 0.03;
      }

      if (action === GameActionEnum.success) {
        this.actionSound = new Audio('../../../assets/mario/success.mp3');
        this.actionSound.play();
        this.actionSound.volume = 0.1;
      }

      if (action === GameActionEnum.fail) {
        this.actionSound = new Audio('../../../assets/mario/death.mp3');
        this.actionSound.play();
        this.actionSound.volume = 0.1;
      }
    }
  }
}
