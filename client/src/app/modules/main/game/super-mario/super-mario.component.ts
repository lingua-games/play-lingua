import {Component, HostListener, OnInit} from '@angular/core';
import {MarioModel} from '../../../../core/models/Mario.model';
import {GamesService} from '../../../../core/service/games.service';
import {MarioEnemy, MarioEnemyStatus} from '../../../../core/models/mario-enemy.model';
import {animate, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-super-mario',
  templateUrl: './super-mario.component.html',
  styleUrls: ['./super-mario.component.scss'],
  animations: [
    trigger('move', [
      transition('void => true', [
        style({right: '-5%'}),
        animate(6000, style({right: '100%'}))
      ])
    ])
  ]
})
export class SuperMarioComponent implements OnInit {

  mario: MarioModel = new MarioModel();
  enemies: MarioEnemy[];
  movingRightInterval?: number;
  movingLeftInterval?: number;
  jumpHeight = 30;

  constructor(private gamesService: GamesService) {
  }

  @HostListener('document:keydown ', ['$event'])
  keyDownEvent(event: KeyboardEvent): void {
    switch (event.code) {
      case 'ArrowLeft':
        this.startMovingLeft();
        break;
      case 'ArrowRight':
        this.startMovingRight();
        break;
      case 'Space':
        this.jump();
        break;
    }
  }

  @HostListener('document:keyup', ['$event'])
  keyUpEvent(event: KeyboardEvent): void {
    switch (event.code) {
      case 'ArrowLeft':
        this.stopMovingLeft();
        break;
      case 'ArrowRight':
        this.stopMovingRight();
        break;
    }
  }

  ngOnInit(): void {
    this.mario.setStyle({
      border: '1px solid',
      position: 'absolute',
      top: '85%',
      width: '3%',
      height: '5%',
      left: '10%',
      transition: '100ms',
    });
    this.startGame();
  }


  startGame(): void {
    this.getWords();
  }

  getWords(): void {
    this.enemies = [];
    this.gamesService.getGameWords().subscribe((res: string[]) => {
      res.forEach(element => {
        console.log();
        this.enemies.push({
          text: element,
          status: MarioEnemyStatus.WaitingForStart,
          style: {
            position: 'absolute',
            bottom: Math.floor(Math.random() * (this.jumpHeight + Math.abs(1) + 1)) + 10 + '%',
            right: '0',
            border: 'solid 1px gray',
            borderRadius: '10%',
            padding: '5px'
          }
        });
      });
      this.enemies[0].status = MarioEnemyStatus.Start;
    }, () => {
    });
  }

  checkEnemyLife(enemy): boolean {
    if (enemy.status === 0) {
      return true;
    }
    console.log(enemy.style);
    // console.log(this.mario.style);
    return false;
  }

  nextEnemy(enemy: MarioEnemy, event: any): void {
    const indexOfEnemy = this.enemies.indexOf(enemy);
    if (this.enemies.length <= indexOfEnemy + 1) {
      enemy.status = MarioEnemyStatus.Finished;
      return;
    }
    enemy.status = MarioEnemyStatus.Finished;
    this.enemies[indexOfEnemy + 1].status = MarioEnemyStatus.Start;
  }

  stopMovingLeft(): void {
    clearInterval(this.movingLeftInterval);
    this.movingLeftInterval = null;
  }

  startMovingLeft(): void {
    if (!this.movingLeftInterval) {
      this.movingLeftInterval = setInterval(() => {
        this.mario.moveLeft(1);
      }, 30);
    }
  }

  stopMovingRight(): void {
    clearInterval(this.movingRightInterval);
    this.movingRightInterval = null;
  }

  startMovingRight(): void {
    if (!this.movingRightInterval) {
      this.movingRightInterval = setInterval(() => {
        this.mario.moveRight(1);
      }, 30);
    }
  }

  jump(): void {
    this.mario.jump(this.jumpHeight);
  }
}
