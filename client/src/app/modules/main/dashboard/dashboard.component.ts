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
    });
    this.gameMenus.push({
      name: 'Falling Star',
      image: './../../../../assets/images/GameMenu/falling-star.png',
    });
    this.gameMenus.push({
      name: 'Game',
      image: './../../../../assets/images/GameMenu/game.jpg',
    });
    this.gameMenus.push({
      name: 'Game',
      image: './../../../../assets/images/GameMenu/game.jpg',
    });
    this.gameMenus.push({
      name: 'Game',
      image: './../../../../assets/images/GameMenu/game.jpg',
    });
    this.gameMenus.push({
      name: 'Game',
      image: './../../../../assets/images/GameMenu/game.jpg',
    });
  }
}
