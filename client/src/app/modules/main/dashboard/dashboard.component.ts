import { BrowserModule } from '@angular/platform-browser';
import { GameMenu } from './../../../core/models/game.menu.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  gameMenus: GameMenu[] = [];
  constructor() {}

  ngOnInit(): void {
    this.gameMenus.push({
      name: 'Super Mario',
      image: './../../../../assets/images/GameMenu/super-mario.png',
      route: 'super-mario',
      isDesigned: true,
    });
    this.gameMenus.push({
      name: 'Falling Star',
      image: './../../../../assets/images/GameMenu/falling-star.png',
      route: 'falling-stars',
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
}
