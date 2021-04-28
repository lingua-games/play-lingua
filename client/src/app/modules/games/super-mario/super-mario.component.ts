import {
  Component,
  ElementRef,
  HostListener,
  OnInit,
  ViewChild,
} from '@angular/core';
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
import { GameNameEnum } from '../../../core/models/game-name.enum';
import { ElementStyle } from '../../../core/models/element-style.model';
import { ScoreStorageService } from '../../../core/service/score-storage.service';
import { InvitationForm } from '../../../core/models/invitation-form.interface';
import { ScoreStoreInterface } from '../../../core/models/score-store.interface';
import { SoundService } from '../../../core/service/sound.service';
import { GameActionEnum } from '../../../core/models/game-action.enum';

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
          top: '30%',
          fontSize: '2vw',
        }),
        animate('500ms', style({ opacity: 1 })),
        animate('1s', style({ top: '10%', fontSize: '1.8vw' })),
      ]),
      transition(':leave', [
        style({ opacity: 1 }),
        animate('600ms', style({ top: '-50%' })),
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
  @ViewChild('marioTemplate') marioTemplate?: ElementRef = {
    nativeElement: {} as ElementRef,
  } as ElementRef;
  @ViewChild('enemyTemplate') enemyTemplate?: ElementRef = {
    nativeElement: {} as ElementRef,
  } as ElementRef;

  feedbackForm?: InvitationForm;
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
  isGameFinished = false;
  enemyAnimateInterval?: number;
  isSoundOn = true;
  mushrooms: {
    question: string;
    success: string;
    wrong: string;
  } = {
    question: '',
    success: '',
    wrong: '',
  };

  constructor(
    private dialog: MatDialog,
    private basicInformationService: BasicInformationService,
    private scoreStorageService: ScoreStorageService,
    private soundService: SoundService
  ) {}

  @HostListener('window:resize', ['$event'])
  onResize(): void {
    this.mario.style.width = ((60 / window.innerWidth) * 100).toString() + '%';
  }

  @HostListener('window:blur', ['$event'])
  onBlur(): void {
    this.stopMovingRight();
    this.stopMovingLeft();
  }

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
      this.prepareTheWord();
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
      case 'KeyQ':
        this.skipEnemy();
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
      height: '6rem',
      width: ((60 / window.innerWidth) * 100).toString() + '%',
      left: '10%',
      transition: '10ms',
    } as ElementStyle);
    this.scoreStorageService.clearCatch();
    this.loadImages();
    this.soundService.loadSounds(GameNameEnum.supperMario);
    // Todo, uncomment
    this.showStartDialog();
  }

  loadImages(): void {
    this.basicInformationService
      .loadFile('/mario-jumping.png')
      .subscribe((res) => {
        this.mario.jumpBackground = `url(${window.URL.createObjectURL(res)})`;
      });

    this.basicInformationService
      .loadFile('/mario-movement.png')
      .subscribe((res) => {
        this.mario.movementBackground = `url(${window.URL.createObjectURL(
          res
        )})`;
      });

    this.basicInformationService
      .loadFile('/assets/mario/question-mushroom.png')
      .subscribe((res) => {
        this.mushrooms.question = `url(${window.URL.createObjectURL(res)})`;
      });

    this.basicInformationService
      .loadFile('/assets/mario/wrong-mushroom.png')
      .subscribe((res) => {
        this.mushrooms.wrong = `url(${window.URL.createObjectURL(res)})`;
      });

    this.basicInformationService
      .loadFile('/assets/mario/success-mushroom.png')
      .subscribe((res) => {
        this.mushrooms.success = `url(${window.URL.createObjectURL(res)})`;
      });
  }

  showStartDialog(): void {
    this.enemies = [];
    this.guidBoxShowing = false;
    this.dialog
      .open(StartGameDialogComponent, {
        data: {
          name: 'Super Mario',
          gameNameForRanking: 'super-mario',
          code: GameNameEnum.supperMario,
          hints: this.basicInformationService.gameHints(
            GameNameEnum.supperMario
          ),
        } as GameInformationInterface,
        disableClose: true,
        width: '60%',
        height: '62vh',
        maxHeight: '95vh',
      })
      .afterClosed()
      .subscribe((res: GameStartInformation<WordKeyValueModel<string[]>[]>) => {
        if (res && res.words && res.words.length) {
          this.allEnemies = JSON.parse(JSON.stringify(res));
          this.bookId = res.bookId;
          this.chapterId = res.chapterId;
          this.soundService.playActionSong(
            GameActionEnum.backGroundSond,
            this.isSoundOn
          );
          this.startGame();
        }
      });
  }

  startGame(): void {
    this.isSoundOn = true;
    this.prepareTheWord(this.allEnemies.words[0]);
  }

  showEndGameDialog(): void {
    this.stopSound(false);
    this.isGameFinished = true;
    const dialog = this.dialog.open(StartGameDialogComponent, {
      disableClose: true,
      width: '60%',
      height: '62vh',
      maxHeight: '95vh',
      autoFocus: false,
      data: {
        name: 'Super Mario',
        code: GameNameEnum.supperMario,
        gameNameForRanking: 'super-mario',
        hints: this.basicInformationService.gameHints(
          GameNameEnum.fallingStars
        ),
        isFeedback: !!this.feedbackForm,
        feedbackForm: this.feedbackForm,
        scoreStore: {
          gameName: 'super-mario',
          bookId: this.bookId,
          chapterId: this.chapterId,
          score: this.scoreStorageService.getCachedScores(),
        } as ScoreStoreInterface,
        isGameFinished: true,
      } as GameInformationInterface,
    });

    dialog
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

  prepareTheWord(enemy?: WordKeyValueModel<string[]>): void {
    if (this.guidBoxShowing) {
      this.soundService.playActionSong(
        GameActionEnum.backGroundSond,
        this.isSoundOn
      );
    }
    this.isGameFinished = false;
    this.guidBoxShowing = false;

    if (!enemy) {
      const indexOfCurrentEnemy = this.allEnemies.words.indexOf(
        this.currentEnemy
      );

      if (this.allEnemies.words[indexOfCurrentEnemy + 1]) {
        this.currentEnemy = {} as WordKeyValueModel<string[]>;
        // Just to fire ngIf in the template
        setTimeout(() => {
          this.currentEnemy = this.allEnemies.words[indexOfCurrentEnemy + 1];
        }, 1);
      } else {
        this.showEndGameDialog();
        return;
      }
    } else {
      this.currentEnemy = enemy;
    }
    setTimeout(() => {
      this.randomNumbers = this.generateRandomNumber();
      this.prepareAnswerOptions();
    }, 2);
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
    } as MarioEnemy;
    this.randomNumbers.splice(0, 1);

    this.randomNumbers.forEach((random) => {
      this.enemies[random] = {
        valueToAsk: this.allEnemies?.words[random || 0]?.values[0] || '',
        status: MarioEnemyStatus.WaitingForStart,
      } as MarioEnemy;
    });
    this.setEnemyStyle();
  }

  setEnemyStyle(): void {
    this.enemies.forEach((enemy) => {
      // Todo. remove below line
      // enemy.status = MarioEnemyStatus.IsMoving;
      const randomBottom =
        (
          Math.floor(Math.random() * (this.jumpHeight + Math.abs(1) + 1)) + 10
        ).toString() + '%';
      enemy.mushroomImage = 'question';
      enemy.style = {
        position: 'absolute',
        // random number between floor and max top of the Mario
        bottom: randomBottom,
        // Todo. below should be 1
        right: '1%',
        fontSize: '1vw',
      } as ElementStyle;
    });

    setTimeout(() => {
      this.showWordInWaitingMode(
        this.enemies.find(Boolean) || ({} as MarioEnemy)
      );
    }, 1000);
  }

  showWordInWaitingMode(enemy: MarioEnemy): void {
    if (enemy && enemy.style) {
      enemy.style.animation =
        'loading-mushroom-animation 200ms linear infinite';
      enemy.status = MarioEnemyStatus.Start;
      setTimeout(() => {
        enemy.style.animation = '';
        enemy.style.transition = '100ms';
        enemy.style.opacity = '1';
        enemy.style.fontSize = '.8vw';
        enemy.status = MarioEnemyStatus.IsMoving;
        // Todo, uncomment
        this.showMovingEnemy(enemy);
      }, 1000);
    }
  }

  showPointNotification(enemy: MarioEnemy): void {
    this.soundService.playActionSong(GameActionEnum.success, this.isSoundOn);
    if (enemy && enemy.style && enemy.style.right) {
      let earnedScore = (100 - parseInt(enemy.style.right, 0)) / 10;
      if (this.currentEnemy.wrongCount && this.currentEnemy.wrongCount > 0) {
        earnedScore = earnedScore / (this.currentEnemy.wrongCount + 1);
      }
      // To show only 2 decimal numbers
      earnedScore = parseFloat(earnedScore.toFixed(2));

      this.scoreStorageService.catchScores(earnedScore);
      enemy.valueToAsk = '+ ' + earnedScore.toString();
      this.animationOnCorrectAnswer(enemy);
    }
  }

  animationOnWrongAnswer(enemy: MarioEnemy): void {
    if (enemy) {
      enemy.mushroomImage = 'wrong';
      if (enemy.style) {
        enemy.style.opacity = '1';
        enemy.style.transition = '2s';
        enemy.style.opacity = '0';
      }
      setTimeout(() => {
        enemy.status = MarioEnemyStatus.Finished;
      }, 2000);
    }
  }

  animationOnCorrectAnswer(enemy: MarioEnemy): void {
    enemy.mushroomImage = 'success';
    enemy.style.transition = '2s';
    enemy.style.bottom =
      (parseInt(enemy.style.bottom, 0) + 20).toString() + '%';
    enemy.style.color = 'green';
  }

  showGuidBox(enemy: MarioEnemy): void {
    this.soundService.stopGameSong(GameActionEnum.backGroundSond);
    this.soundService.playActionSong(GameActionEnum.fail, this.isSoundOn);
    clearInterval(this.enemyAnimateInterval);
    this.animationOnWrongAnswer(enemy);
    this.stopMovingLeft();
    this.stopMovingRight();
    this.currentEnemy.wrongCount = this.currentEnemy.wrongCount
      ? this.currentEnemy.wrongCount + 1
      : 1;
    this.allEnemies.words.push(JSON.parse(JSON.stringify(this.currentEnemy)));
    this.guidBoxShowing = true;
  }

  stopSound(value: boolean): void {
    this.isSoundOn = value;
    if (value) {
      this.soundService.playActionSong(
        GameActionEnum.backGroundSond,
        this.isSoundOn
      );
    } else {
      this.soundService.stopGameSong(GameActionEnum.backGroundSond);
    }
  }

  showMovingEnemy(playingEnemy: MarioEnemy): void {
    if (this.guidBoxShowing) {
      clearInterval(this.enemyAnimateInterval);
      return;
    }
    this.enemyAnimateInterval = setInterval(() => {
      if (playingEnemy && playingEnemy.style) {
        playingEnemy.style.transition = '100ms';
        playingEnemy.style.right =
          (parseInt(playingEnemy?.style?.right || '', 0) + 1).toString() + '%';
      }

      if (this.isCrashed()) {
        clearInterval(this.enemyAnimateInterval);
        if (
          this.currentEnemy?.values?.find(
            (x: string) => x === playingEnemy?.valueToAsk
          )
        ) {
          this.showPointNotification(playingEnemy as MarioEnemy);
          setTimeout(() => {
            this.prepareTheWord();
          }, 2000);
        } else {
          this.showGuidBox(playingEnemy);
        }
        return;
      }
      if (parseInt(playingEnemy?.style?.right || '', 0) >= 105) {
        if (
          this.currentEnemy?.values?.find(
            (x: string) => x === playingEnemy?.valueToAsk
          )
        ) {
          this.showGuidBox(playingEnemy);
          return;
        }
        this.showNextEnemyWhenEnemyReachToEnd(playingEnemy);
      }
    }, 50);
  }

  // tslint:disable-next-line:cyclomatic-complexity
  isCrashed(): boolean | undefined {
    if (!this.enemyTemplate || !this.marioTemplate) {
      return;
    }
    this.marioTemplate.nativeElement.offsetBottom =
      (this.marioTemplate.nativeElement.offsetTop as string) +
      (this.marioTemplate.nativeElement.offsetHeight as string);
    this.marioTemplate.nativeElement.offsetRight =
      (this.marioTemplate.nativeElement.offsetLeft as string) +
      (this.marioTemplate.nativeElement.offsetWidth as string);
    this.enemyTemplate.nativeElement.offsetBottom =
      (this.enemyTemplate.nativeElement.offsetTop as string) +
      (this.enemyTemplate.nativeElement.offsetHeight as string);
    this.enemyTemplate.nativeElement.offsetRight =
      (this.enemyTemplate.nativeElement.offsetLeft as string) +
      (this.enemyTemplate.nativeElement.offsetWidth as string);

    return !(
      this.marioTemplate.nativeElement.offsetBottom <
        this.enemyTemplate.nativeElement.offsetTop ||
      this.marioTemplate.nativeElement.offsetTop >
        this.enemyTemplate.nativeElement.offsetBottom ||
      this.marioTemplate.nativeElement.offsetRight <
        this.enemyTemplate.nativeElement.offsetLeft ||
      this.marioTemplate.nativeElement.offsetLeft >
        this.enemyTemplate.nativeElement.offsetRight
    );
  }

  skipEnemy(): void {
    const movingElement = this.enemies.find(
      (x) => x?.status === MarioEnemyStatus.IsMoving
    );
    if (!movingElement) {
      return;
    }
    if (this.currentEnemy.values.find((x) => x === movingElement?.valueToAsk)) {
      this.showGuidBox(movingElement);
      return;
    }

    this.showNextEnemyWhenEnemyReachToEnd(movingElement);
  }

  showNextEnemyWhenEnemyReachToEnd(playingEnemy: MarioEnemy | undefined): void {
    if (playingEnemy) {
      clearInterval(this.enemyAnimateInterval);
      playingEnemy.status = MarioEnemyStatus.Finished;
      const currentIndex = this.enemies.indexOf(playingEnemy as MarioEnemy);
      let nextIndex = 0;

      this.enemies.forEach(({}, index: number) => {
        if (index > currentIndex && nextIndex === 0) {
          nextIndex = index;
        }
      });
      this.enemies.forEach(() => {
        if (!this.enemies[nextIndex]) {
          nextIndex++;
        }
      });
      this.showWordInWaitingMode(this.enemies[nextIndex]);
    }
  }

  stopMovingLeft(): void {
    this.mario.style.transition = 'left 0ms';
    this.stopMoving();
    clearInterval(this.movingLeftInterval);
    this.movingLeftInterval = undefined;
  }

  stopMovingRight(): void {
    this.mario.style.transition = 'left 0ms';
    this.stopMoving();
    clearInterval(this.movingRightInterval);
    this.movingRightInterval = undefined;
  }

  stopMoving(): void {
    this.mario.isMoving = false;
  }

  startMovingLeft(): void {
    clearInterval(this.movingRightInterval);
    if (!this.movingLeftInterval) {
      this.movingLeftInterval = +setInterval(() => {
        if (this.mario.isJumping) {
          this.mario.style.transition = 'left 30ms';
        }
        this.mario.moveLeft(1);
      }, 30);
    }
  }

  startMovingRight(): void {
    clearInterval(this.movingLeftInterval);
    if (!this.movingRightInterval) {
      this.movingRightInterval = +setInterval(() => {
        if (this.mario.isJumping) {
          this.mario.style.transition = 'left 30ms';
        }

        this.mario.moveRight(1);
      }, 30);
    }
  }

  jump(): void {
    if (!this.mario.isJumping && !this.isGameFinished) {
      this.soundService.playActionSong(GameActionEnum.jump, this.isSoundOn);
    }
    this.mario.jump(this.jumpHeight);
  }
}
