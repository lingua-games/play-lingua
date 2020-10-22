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
    this.gameMenus.push({ name: 'Super Mario' });
    this.gameMenus.push({ name: 'Falling Star' });
    this.gameMenus.push({ name: 'Game' });
    this.gameMenus.push({ name: 'Game' });
    this.gameMenus.push({ name: 'Game' });
    this.gameMenus.push({ name: 'Game' });
  }
}
