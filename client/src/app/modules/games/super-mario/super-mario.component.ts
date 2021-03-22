import { Component, HostListener, OnInit } from '@angular/core';
import { MarioModel } from '../../../core/models/mario.model';
import { GamesService } from '../../../core/service/games.service';
import {
  MarioEnemy,
  MarioEnemyStatus,
} from '../../../core/models/mario-enemy.model';
import { animate, style, transition, trigger } from '@angular/animations';
import { WordKeyValueModel } from '../../../core/models/word-key-value.model';
import { GetGameWordsRequestModel } from '../../../core/models/get-game-words-request.model';
import { StartGameDialogComponent } from '../common-in-game/start-game-dialog/start-game-dialog.component';
import { GameInformationInterface } from '../../../core/models/game-information.interface';
import { GameStartInformation } from '../../../core/models/game-start-information';
import { MatDialog } from '@angular/material/dialog';
import { BasicInformationService } from '../../../core/service/basic-information.service';
import { EGame } from '../../../core/models/e-game';

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
  copyOfEnemies: MarioEnemy[];
  movingRightInterval?: number;
  movingLeftInterval?: number;
  jumpHeight = 30;
  guidBoxShowing: boolean;
  bookId: number;
  chapterId: number;

  constructor(
    private dialog: MatDialog,
    private basicInformationService: BasicInformationService
  ) {}

  @HostListener('document:keydown ', ['$event'])
  keyDownEvent(event: KeyboardEvent): void {
    console.log(event.code.toString() === ('ArrowLeft' || 'KeyA'));
    switch (event.code) {
      case 'ArrowLeft':
      case 'KeyA':
        this.startMovingLeft();
        break;
      case 'ArrowRight':
      case 'KeyD':
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
      case 'KeyA':
        this.stopMovingLeft();
        break;
      case 'ArrowRight':
      case 'KeyD':
        this.stopMovingRight();
        break;
    }
  }

  ngOnInit(): void {
    this.mario.setStyle({
      position: 'absolute',
      bottom: '10%',
      width: '3%',
      height: '10%',
      left: '10%',
      transition: '10ms',
    });
    this.showStartDialog();
  }

  showStartDialog(): void {
    this.enemies = [];
    this.guidBoxShowing = false;
    this.dialog
      .open(StartGameDialogComponent, {
        data: {
          name: 'Super mario',
          hints: this.basicInformationService.gameHints(EGame.supperMario),
        } as GameInformationInterface,
        disableClose: true,
        width: '30%',
      })
      .afterClosed()
      .subscribe((res: GameStartInformation<WordKeyValueModel<string[]>[]>) => {
        if (res && res.words && res.words.length) {
          this.copyOfEnemies = JSON.parse(JSON.stringify(res.words));
          this.bookId = res.bookId;
          this.chapterId = res.chapterId;
          this.startGame();
        }
      });
  }

  startGame(): void {
    this.enemies.forEach((enemy) => {
      enemy.status = MarioEnemyStatus.WaitingForStart;
      enemy.style = {
        position: 'absolute',
        // random number between floor and max top of the Mario
        bottom:
          (
            Math.floor(Math.random() * (this.jumpHeight + Math.abs(1) + 1)) + 10
          ).toString() + '%',
        left: '100%',
        border: 'solid 1px gray',
        borderRadius: '10%',
        padding: '5px',
        height: '5%',
        width: '5%',
        textAlign: 'center',
      };
    });
    this.startAnimating(this.enemies[0]);
  }

  // The method does not have test yet because it is not finalized.
  startAnimating(enemy: MarioEnemy): void {
    enemy.status = MarioEnemyStatus.Start;
    const animateInterval = setInterval(() => {
      enemy.style.transition = '100ms';
      enemy.style.left =
        (parseInt(enemy.style.left, null) - 1).toString() + '%';

      // Managing left-right hit
      const enemyLeft = parseInt(enemy.style.left, null);
      const enemyRight =
        parseInt(enemy.style.left, null) + parseInt(enemy.style.width, null);
      const marioLeft = parseInt(this.mario.style.left, null);
      const marioRight =
        parseInt(this.mario.style.left, null) +
        parseInt(this.mario.style.width, null);
      const enemyTop =
        parseInt(enemy.style.bottom, null) + parseInt(enemy.style.height, null);
      const enemyButton = parseInt(enemy.style.bottom, null);
      const marioButton = parseInt(this.mario.style.bottom, null);
      const marioTop = marioButton + parseInt(this.mario.style.height, null);
      if (
        ((marioLeft > enemyLeft && marioLeft < enemyRight) ||
          (marioRight > enemyLeft && marioRight < enemyRight)) &&
        ((marioTop < enemyTop && marioTop > enemyButton) ||
          (marioButton < enemyTop && marioButton > enemyButton))
      ) {
        clearInterval(animateInterval);
        const index = this.enemies.indexOf(enemy);
        if (index + 1 < this.enemies.length) {
          enemy.status = MarioEnemyStatus.Finished;
          this.startAnimating(this.enemies[index + 1]);
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
    }, 50);
  }

  stopMovingLeft(): void {
    this.stopMoving();
    clearInterval(this.movingLeftInterval);
    this.movingLeftInterval = null;
  }

  stopMovingRight(): void {
    this.stopMoving();
    clearInterval(this.movingRightInterval);
    this.movingRightInterval = null;
  }

  stopMoving(): void {
    this.mario.isMoving = false;
  }

  startMovingLeft(): void {
    if (!this.movingLeftInterval) {
      this.movingLeftInterval = +setInterval(() => {
        this.mario.moveLeft(1);
      }, 30);
    }
  }

  startMovingRight(): void {
    if (!this.movingRightInterval) {
      this.movingRightInterval = +setInterval(() => {
        this.mario.moveRight(1);
      }, 30);
    }
  }

  jump(): void {
    this.mario.jump(this.jumpHeight);
  }
}
