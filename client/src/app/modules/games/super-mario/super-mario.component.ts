import { Component, HostListener, OnInit } from '@angular/core';
import { MarioModel } from '../../../core/models/mario.model';
import {
  MarioEnemy,
  MarioEnemyStatus,
} from '../../../core/models/mario-enemy.model';
import { animate, style, transition, trigger } from '@angular/animations';
import { WordKeyValueModel } from '../../../core/models/word-key-value.model';
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
  currentEnemy: MarioEnemy = new MarioEnemy();
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
          this.startGame(res.words);
        }
      });
  }

  startGame(words: WordKeyValueModel<string[]>[]): void {
    this.enemies = [];
    words.forEach((word) => {
      this.enemies.push({
        text: word,
        status: MarioEnemyStatus.WaitingForStart,
        style: {
          position: 'absolute',
          // random number between floor and max top of the Mario
          bottom:
            (
              Math.floor(Math.random() * (this.jumpHeight + Math.abs(1) + 1)) +
              10
            ).toString() + '%',
          left: '90%',
          border: 'solid 1px gray',
          borderRadius: '10px',
          padding: '.5rem',
          textAlign: 'center',
          color: '#283747',
          height: '4vh',
          fontSize: '1vw',
          width: '7%',
          backgroundColor: '#EAEDED',
          opacity: '.7',
        },
      });
    });
    this.prepareTheWord(this.enemies[0]);
  }

  prepareTheWord(enemy: MarioEnemy): void {
    this.currentEnemy = enemy;
    this.showWordInWaitingMode(enemy);
  }

  showWordInWaitingMode(enemy: MarioEnemy): void {
    enemy.status = MarioEnemyStatus.Start;
    setTimeout(() => {
      enemy.style.transition = '100ms';
      enemy.style.opacity = '1';
      enemy.style.fontSize = '.8vw';
      this.showMovingEnemy(enemy);
    }, 2000);
  }

  showPointNotification(enemy: MarioEnemy): void {
    // TODO: show earned point here
    if (this.enemies.indexOf(enemy) < this.enemies.length) {
      this.prepareTheWord(this.enemies[this.enemies.indexOf(enemy) + 1]);
    }
  }

  // The method does not have test yet because it is not finalized.
  showMovingEnemy(playingEnemy: MarioEnemy): void {
    playingEnemy.status = MarioEnemyStatus.Start;
    const animateInterval = setInterval(() => {
      playingEnemy.style.transition = '100ms';
      playingEnemy.style.left =
        (parseInt(playingEnemy.style.left, null) - 1).toString() + '%';

      // Managing left-right hit
      const enemyLeft = parseInt(playingEnemy.style.left, null);
      const enemyRight =
        parseInt(playingEnemy.style.left, null) +
        parseInt(playingEnemy.style.width, null);
      const marioLeft = parseInt(this.mario.style.left, null);
      const marioRight =
        parseInt(this.mario.style.left, null) +
        parseInt(this.mario.style.width, null);
      const enemyTop =
        parseInt(playingEnemy.style.bottom, null) +
        parseInt(playingEnemy.style.height, null);
      const enemyButton = parseInt(playingEnemy.style.bottom, null);
      const marioButton = parseInt(this.mario.style.bottom, null);
      const marioTop = marioButton + parseInt(this.mario.style.height, null);
      if (
        ((marioLeft > enemyLeft && marioLeft < enemyRight) ||
          (marioRight > enemyLeft && marioRight < enemyRight)) &&
        ((marioTop < enemyTop && marioTop > enemyButton) ||
          (marioButton < enemyTop && marioButton > enemyButton))
      ) {
        if (this.currentEnemy.text.key === playingEnemy.text.key) {
          this.showPointNotification(playingEnemy);
          clearInterval(animateInterval);
          playingEnemy.status = MarioEnemyStatus.Finished;
          return;
        }
        clearInterval(animateInterval);
        const index = this.enemies.indexOf(playingEnemy);
        if (index + 1 < this.enemies.length) {
          playingEnemy.status = MarioEnemyStatus.Finished;
          this.showWordInWaitingMode(this.enemies[index + 1]);
        }
      }
      if (parseInt(playingEnemy.style.left, null) <= -5) {
        if (this.enemies.indexOf(playingEnemy) >= this.enemies.length) {
          // TODO show guid box
        }

        clearInterval(animateInterval);
        const index = this.enemies.indexOf(playingEnemy);
        if (index + 1 < this.enemies.length) {
          playingEnemy.status = MarioEnemyStatus.Finished;
          this.showWordInWaitingMode(this.enemies[index + 1]);
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
