import { BrowserModule } from '@angular/platform-browser';
import { GameMenu } from '../../../core/models/game.menu.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-game-menu',
  templateUrl: './game-menu.component.html',
  styleUrls: ['./game-menu.component.scss'],
})
export class GameMenuComponent implements OnInit {
  gameMenus: GameMenu[] = [];

  constructor() {}

  ngOnInit(): void {
    this.gameMenus.push({
      name: 'Super Mario',
      image: './../../../../assets/images/GameMenu/super-mario.png',
      route: 'super-mario',
      id: 'super-mario',
      isDesigned: true,
    });
    this.gameMenus.push({
      name: 'Falling Stars',
      image: './../../../../assets/images/GameMenu/falling-star.png',
      route: 'falling-stars',
      id: 'falling-stars',
      isDesigned: true,
    });
    this.gameMenus.push({
      name: 'Game',
      image: './../../../../assets/images/GameMenu/game.jpg',
      isDesigned: false,
    });
    this.gameMenus.push({
      name: 'Game',
      image: './../../../../assets/images/GameMenu/game.jpg',
      isDesigned: false,
    });
  }

  setBackgroundImage(image: string): any {
    return {
      background: `url("${image}") no-repeat center`,
      backgroundSize: '4vw',
    };
  }
}
