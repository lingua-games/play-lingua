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
import { ElementStyle } from '../../../core/models/element-style.model';

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
    trigger('questionFade', [
      transition(':enter', [
        style({
          opacity: 0,
          marginTop: '40vh',
          fontSize: '2vw',
          padding: '2rem',
        }),
        animate('500ms', style({ opacity: 1 })),
        animate(
          '1s 2s',
          style({ marginTop: '10vh', fontSize: '1vw', padding: '1rem 3rem' })
        ),
      ]),
      transition(':leave', [
        style({ opacity: 1 }),
        animate('100ms', style({ opacity: 0 })),
      ]),
    ]),
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('500ms', style({ opacity: 1 })),
      ]),
      transition(':leave', [
        style({ opacity: 1 }),
        animate('100ms', style({ opacity: 0 })),
      ]),
    ]),
  ],
})
export class SuperMarioComponent implements OnInit {
  mario: MarioModel = new MarioModel();
  enemies: MarioEnemy[] = [];
  currentEnemy: WordKeyValueModel<string[]> = {} as WordKeyValueModel<string[]>;
  allEnemies: GameStartInformation<
    WordKeyValueModel<string[]>[]
  > = {} as GameStartInformation<WordKeyValueModel<string[]>[]>;
  randomNumbers: number[] = [];
  movingRightInterval?: number;
  movingLeftInterval?: number;
  jumpHeight = 30;
  guidBoxShowing?: boolean;
  bookId?: number;
  chapterId?: number;

  constructor(
    private dialog: MatDialog,
    private basicInformationService: BasicInformationService
  ) {}

  @HostListener('document:keydown ', ['$event'])
  keyDownEvent(event: KeyboardEvent): void {
    if (event.code === 'Escape') {
      this.showStartDialog();
      return;
    }

    if (
      (event.code === 'Enter' || event.code === 'NumpadEnter') &&
      this.guidBoxShowing
    ) {
      // this.playNextStar();
      return;
    }

    if (this.guidBoxShowing) {
      return;
    }
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
    if (this.guidBoxShowing) {
      return;
    }
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
          this.allEnemies = JSON.parse(JSON.stringify(res));
          this.bookId = res.bookId;
          this.chapterId = res.chapterId;
          this.startGame();
        }
      });
  }

  startGame(): void {
    this.prepareTheWord(this.allEnemies.words[0]);
  }

  prepareTheWord(enemy?: WordKeyValueModel<string[]>): void {
    this.guidBoxShowing = false;
    if (!enemy) {
      const index = this.allEnemies.words.indexOf(this.currentEnemy);
      if (this.allEnemies.words[index + 1]) {
        this.currentEnemy = {} as WordKeyValueModel<string[]>;
        this.currentEnemy = this.allEnemies.words[index + 1];
      } else {
        // TODO. should finish the game
      }
    } else {
      this.currentEnemy = enemy;
    }
    this.randomNumbers = this.generateRandomNumber();
    this.prepareAnswerOptions();
  }

  generateRandomNumber(): number[] {
    const result: number[] = [];
    while (result.length < 4) {
      const r = Math.floor(Math.random() * this.allEnemies.words.length);
      if (
        result.indexOf(r) === -1 &&
        this.allEnemies.words.indexOf(this.currentEnemy) !== r
      ) {
        result.push(r);
      }
    }
    return result;
  }

  prepareAnswerOptions(): void {
    this.enemies = [];
    // Placing correct answer into a random position
    this.enemies[this.randomNumbers[0]] = {
      valueToAsk: this.currentEnemy.values[0],
      status: MarioEnemyStatus.WaitingForStart,
    };
    this.randomNumbers.splice(0, 1);

    this.randomNumbers.forEach((random) => {
      this.enemies[random] = {
        valueToAsk: this.allEnemies?.words[random || 0]?.values[0] || '',
        status: MarioEnemyStatus.WaitingForStart,
      };
    });
    this.setEnemyStyle();
  }

  setEnemyStyle(): void {
    this.enemies.forEach((enemy) => {
      enemy.style = {
        position: 'absolute',
        // random number between floor and max top of the Mario
        bottom:
          (
            Math.floor(Math.random() * (this.jumpHeight + Math.abs(1) + 1)) + 10
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
      };
    });

    setTimeout(() => {
      this.showWordInWaitingMode(this.enemies.find(Boolean));
    }, 4000);
  }

  showWordInWaitingMode(enemy?: MarioEnemy): void {
    (enemy || ({} as MarioEnemy)).status = MarioEnemyStatus.Start;
    setTimeout(() => {
      (enemy?.style || ({} as ElementStyle)).transition = '100ms';
      (enemy?.style || ({} as ElementStyle)).opacity = '1';
      (enemy?.style || ({} as ElementStyle)).fontSize = '.8vw';
      this.showMovingEnemy(enemy);
    }, 2000);
  }

  showPointNotification(enemy: MarioEnemy): void {
    // TODO: show earned point here
    if (this.enemies.indexOf(enemy) < this.enemies.length) {
      // this.prepareTheWord(this.enemies[this.enemies.indexOf(enemy) + 1]);
    }
  }

  showGuidBox(): void {
    this.guidBoxShowing = true;
  }

  // The method does not have test yet because it is not finalized.
  showMovingEnemy(playingEnemy?: MarioEnemy): void {
    (playingEnemy || ({} as MarioEnemy)).status = MarioEnemyStatus.Start;
    const animateInterval = setInterval(() => {
      (playingEnemy?.style || ({} as ElementStyle)).transition = '100ms';
      (playingEnemy?.style || ({} as ElementStyle)).left =
        (parseInt(playingEnemy?.style?.left || '', 0) - 1).toString() + '%';

      // Managing left-right hit
      const enemyLeft = parseInt(playingEnemy?.style?.left || '', 0);
      const enemyRight =
        parseInt(playingEnemy?.style?.left || '', 0) +
        parseInt(playingEnemy?.style?.width || '', 0);
      const marioLeft = parseInt(this.mario?.style?.left || '', 0);
      const marioRight =
        parseInt(this.mario?.style?.left || '', 0) +
        parseInt(this.mario?.style?.width || '', 0);
      const enemyTop =
        parseInt(playingEnemy?.style?.bottom || '', 0) +
        parseInt(playingEnemy?.style?.height || '', 0);
      const enemyButton = parseInt(playingEnemy?.style?.bottom || '', 0);
      const marioButton = parseInt(this.mario?.style?.bottom || '', 0);
      const marioTop =
        marioButton + parseInt(this.mario?.style?.height || '', 0);
      if (
        ((marioLeft > enemyLeft && marioLeft < enemyRight) ||
          (marioRight > enemyLeft && marioRight < enemyRight)) &&
        ((marioTop < enemyTop && marioTop > enemyButton) ||
          (marioButton < enemyTop && marioButton > enemyButton))
      ) {
        if (
          this.currentEnemy?.values?.find(
            (x: string) => x === playingEnemy?.valueToAsk
          )
        ) {
          this.showPointNotification(playingEnemy as MarioEnemy);
        } else {
          this.showGuidBox();
        }
        clearInterval(animateInterval);
        (playingEnemy || ({} as MarioEnemy)).status = MarioEnemyStatus.Finished;
        return;
      }
      if (parseInt(playingEnemy?.style?.left || '', 0) <= -5) {
        if (
          this.currentEnemy?.values?.find(
            (x: string) => x === playingEnemy?.valueToAsk
          )
        ) {
          this.showGuidBox();
          clearInterval(animateInterval);
          (playingEnemy || ({} as MarioEnemy)).status =
            MarioEnemyStatus.Finished;
          return;
        }

        clearInterval(animateInterval);
        (playingEnemy || ({} as MarioEnemy)).status = MarioEnemyStatus.Finished;
        let nextIndex = this.enemies.indexOf(playingEnemy as MarioEnemy) + 1;
        this.enemies.forEach(() => {
          if (!this.enemies[nextIndex]) {
            nextIndex++;
          }
        });
        this.showWordInWaitingMode(this.enemies[nextIndex]);
      }
    }, 50);
  }

  stopMovingLeft(): void {
    this.stopMoving();
    clearInterval(this.movingLeftInterval);
    this.movingLeftInterval = undefined;
  }

  stopMovingRight(): void {
    this.stopMoving();
    clearInterval(this.movingRightInterval);
    this.movingRightInterval = undefined;
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
