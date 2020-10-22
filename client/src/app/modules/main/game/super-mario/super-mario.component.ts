import { Component, HostListener, OnInit } from '@angular/core';
import { MarioModel } from '../../../../core/models/Mario.model';
import { GamesService } from '../../../../core/service/games.service';
import {
  MarioEnemy,
  MarioEnemyStatus,
} from '../../../../core/models/mario-enemy.model';
import { animate, style, transition, trigger } from '@angular/animations';
import { bubble } from 'ngx-bootstrap/chronos/duration/bubble';

@Component({
  selector: 'app-super-mario',
  templateUrl: './super-mario.component.html',
  styleUrls: ['./super-mario.component.scss'],
  animations: [
    trigger('move', [
      transition('void => true', [
        style({ right: '0' }),
        animate(6000, style({ right: '100%' })),
      ]),
    ]),
  ],
})
export class SuperMarioComponent implements OnInit {
  mario: MarioModel = new MarioModel();
  enemies: MarioEnemy[];
  movingRightInterval?: number;
  movingLeftInterval?: number;
  jumpHeight = 30;

  constructor(private gamesService: GamesService) {}

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
      bottom: '10%',
      width: '3%',
      height: '5%',
      left: '10%',
      transition: '10ms',
    });
    this.startGame();
  }

  startGame(): void {
    this.getWords();
  }

  getWords(): void {
    this.enemies = [];
    this.gamesService.getGameWords().subscribe(
      (res: string[]) => {
        res.forEach((element) => {
          this.enemies.push({
            text: element,
            status: MarioEnemyStatus.WaitingForStart,
            style: {
              position: 'absolute',
              // random number between floor and max top of the Mario
              bottom:
                Math.floor(
                  Math.random() * (this.jumpHeight + Math.abs(1) + 1)
                ) +
                10 +
                '%',
              left: '100%',
              border: 'solid 1px gray',
              borderRadius: '10%',
              padding: '5px',
              height: '5%',
            },
          });
        });
        this.startAnimating(this.enemies[0]);
      },
      () => {}
    );
  }

  startAnimating(enemy: MarioEnemy): void {
    enemy.status = MarioEnemyStatus.Start;
    const animateInterval = setInterval(() => {
      enemy.style.transition = '100ms';
      enemy.style.left = (
        parseInt(enemy.style.left, null) -
        1 +
        '%'
      ).toString();

      if (
        parseInt(enemy.style.left, null) <=
        parseInt(this.mario.style.left, null) +
          parseInt(this.mario.style.width, null)
      ) {
        if (
          // IMPORTANT: I calculated bottoms but did not
          // calculate the tops yet.
          parseInt(this.mario.style.bottom, null) >=
            parseInt(enemy.style.bottom, null) &&
          parseInt(this.mario.style.bottom, null) <=
            parseInt(enemy.style.bottom, null) +
              parseInt(enemy.style.height, null)
        ) {
          console.log('Hitted');
        }
      }
      if (parseInt(enemy.style.left, null) <= -5) {
        clearInterval(animateInterval);
        const index = this.enemies.indexOf(enemy);
        if (index + 1 < this.enemies.length) {
          enemy.status = MarioEnemyStatus.Finished;
          this.startAnimating(this.enemies[index + 1]);
        }
      }
    }, 400);
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
