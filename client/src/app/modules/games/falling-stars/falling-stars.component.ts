import { Component, HostListener, OnInit } from '@angular/core';
import { animate, style, transition, trigger } from '@angular/animations';
import { FallingStarsWord } from '../../../core/models/falling-stars-word.interface';
import { GamesService } from '../../../core/service/games.service';
import { MatDialog } from '@angular/material/dialog';
import { StartGameDialogComponent } from './start-game-dialog/start-game-dialog.component';
import { WordKeyValueModel } from '../../../core/models/word-key-value.model';
import { Store } from '@ngrx/store';
import { NotificationState } from '../../../core/component/score-notification/state/score-notification.reducer';
import { toggleNotification } from '../../../core/component/score-notification/state/score-notification.actions';
import { ScoreStorageService } from '../../../core/service/score-storage.service';
import { ScoreStoreInterface } from '../../../core/models/score-store.interface';
import { GameStartInformation } from '../../../core/models/game-start-information';
import { FinishGameDialogComponent } from './finish-game-dialog/finish-game-dialog.component';
import { FinishGameActionEnum } from '../../../core/models/finish-game-action.enum';

const secondsForTraver = 5000;
const bufferBeforeStart = 1000;
@Component({
  selector: 'app-falling-stars',
  templateUrl: './falling-stars.component.html',
  styleUrls: ['./falling-stars.component.scss'],
  animations: [
    trigger('fade', [
      transition('void => true', [
        style({ opacity: '0', top: '-20%' }),
        animate(bufferBeforeStart, style({ opacity: '1', top: '-20%' })),
        animate(secondsForTraver, style({ top: '100%' })),
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
export class FallingStarsComponent implements OnInit {
  words: FallingStarsWord[] = [];
  copyOfWords: FallingStarsWord[] = [];
  currentWord: FallingStarsWord = new FallingStarsWord();
  guidBoxShowing: boolean;
  pressedNumber: number;
  startTime: number;
  bookId: number;
  chapterId: number;
  @HostListener('document:keyup ', ['$event'])
  keyUpEvent(event: KeyboardEvent): void {
    this.pressedNumber = 0;
    if (!this.words || !this.words.length) {
      return;
    }
    if (
      (event.code === 'Enter' || event.code === 'NumpadEnter') &&
      this.guidBoxShowing
    ) {
      this.playNextStar();
      return;
    }

    if (this.guidBoxShowing || !this.words.find((x) => x.animating)) {
      return;
    }

    if (event.code === 'Digit1' || event.code === 'Numpad1') {
      this.checkSelectedAnswer(this.getAnswers()[0]);
    }

    if (event.code === 'Digit2' || event.code === 'Numpad2') {
      this.checkSelectedAnswer(this.getAnswers()[1]);
    }

    if (event.code === 'Digit3' || event.code === 'Numpad3') {
      this.checkSelectedAnswer(this.getAnswers()[2]);
    }

    if (event.code === 'Digit4' || event.code === 'Numpad4') {
      this.checkSelectedAnswer(this.getAnswers()[3]);
    }
  }

  @HostListener('document:keydown ', ['$event'])
  keyDownEvent(event: KeyboardEvent): void {
    if (event.code === 'Digit1' || event.code === 'Numpad1') {
      this.pressedNumber = 1;
    }

    if (event.code === 'Digit2' || event.code === 'Numpad2') {
      this.pressedNumber = 2;
    }

    if (event.code === 'Digit3' || event.code === 'Numpad3') {
      this.pressedNumber = 3;
    }

    if (event.code === 'Digit4' || event.code === 'Numpad4') {
      this.pressedNumber = 4;
    }

    if (event.code === 'Escape') {
      if (this.words.length) {
        this.showStartDialog();
      }
    }
  }

  constructor(
    private gamesService: GamesService,
    private dialog: MatDialog,
    private store: Store<any>,
    private scoreStorageService: ScoreStorageService
  ) {}

  ngOnInit(): void {
    this.showStartDialog();
    // this.showEndGameDialog();
  }

  showEndGameDialog(): void {
    const dialog = this.dialog.open(FinishGameDialogComponent, {
      disableClose: true,
      width: '30%',
      autoFocus: false,
      data: {
        bookId: this.bookId,
        chapterId: this.chapterId,
        gameName: 'falling-stars',
        score: this.scoreStorageService.getCachedScores(),
      } as ScoreStoreInterface,
    });

    dialog.afterClosed().subscribe((res: FinishGameActionEnum) => {
      if (res) {
        if (res === FinishGameActionEnum.retry) {
          this.setGameWords(this.copyOfWords);
          this.startGame();
        } else if (res === FinishGameActionEnum.changeMode) {
          this.showStartDialog();
        }
      }
    });
  }

  showStartDialog(): void {
    this.words = [];
    this.guidBoxShowing = false;
    this.dialog
      .open(StartGameDialogComponent, {
        disableClose: true,
        width: '30%',
      })
      .afterClosed()
      .subscribe((res: GameStartInformation<WordKeyValueModel<string[]>[]>) => {
        if (res && res.words && res.words.length) {
          this.copyOfWords = JSON.parse(JSON.stringify(res.words));
          this.bookId = res.bookId;
          this.chapterId = res.chapterId;
          this.setGameWords(res.words);
          this.startGame();
        }
      });
  }

  setGameWords(res): void {
    this.words = [];
    res.forEach((element: WordKeyValueModel<string[]>) => {
      this.words.push({
        key: element.key,
        correctAnswers: element.values,
        style: { left: `${this.getRandomNumber()}%` },
        selectedAnswer: '',
        correctShowingAnswer: '',
        animating: false,
        possibleAnswers: this.generateRandomOptions(element, res),
        keyIsPressing: false,
      });
    });
  }

  getAnswers(): string[] {
    return this.words
      .filter((x) => x.animating)
      .map((y) => y.possibleAnswers)[0];
  }

  generateRandomOptions(
    targetWord: WordKeyValueModel<string[]>,
    allWords: WordKeyValueModel<string[]>[]
  ): string[] {
    const result: string[] = [];
    const copyOfAllWords: WordKeyValueModel<string[]>[] = JSON.parse(
      JSON.stringify(allWords.filter((x) => x.key !== targetWord.key))
    );

    if (!targetWord || !targetWord.values || !targetWord.key) {
      return;
    }
    // Filling the correct option
    const answerPlace = Math.round(Math.random() * (3 - 0));
    const answersLength = targetWord.values.length;
    if (answersLength === 1) {
      result[answerPlace] = targetWord.values[0];
    } else {
      // if the word has more than 1 answers, get one randomly
      result[answerPlace] =
        targetWord.values[Math.round(Math.random() * (answersLength - 1))];
    }

    // Filling the rest of options
    for (let i = 0; i < 4; i++) {
      if (!result[i]) {
        const randomIndex = Math.round(
          Math.random() * (copyOfAllWords.length - 1)
        );
        result[i] = copyOfAllWords[randomIndex].values[0];
        copyOfAllWords.splice(randomIndex, 1);
      }
    }

    return result;
  }

  showReadyBox(): boolean {
    return !this.words.find((x) => x.animating);
  }

  startGame(): void {
    this.startTime = Date.now();
    if (this.words[0]) {
      this.words[0].animating = true;
    }
  }

  boxAnimationDone(
    word: FallingStarsWord,
    isCalledFromView: boolean = false
  ): void {
    this.currentWord = word;
    if (!this.getAnswers()) {
      return;
    }
    this.currentWord.correctShowingAnswer = this.currentWord.correctAnswers.filter(
      (x) => this.getAnswers().find((y: string) => x === y)
    )[0];
    word.animating = false;
    if (!word.selectedAnswer) {
      this.showGuidBox();
    } else {
      if (word.correctAnswers.find((x) => x === word.selectedAnswer)) {
        if (!isCalledFromView) {
          this.calculateScore();
          this.store.dispatch(
            toggleNotification({
              gameName: 'Falling stars',
              message: 'I am the message',
              score: this.calculateScore(),
            } as NotificationState)
          );
          // this.scoreStorageService
          //   .storeScore({
          //     bookId: this.bookId,
          //     chapterId: this.chapterId,
          //     gameName: 'falling-stars',
          //   } as ScoreStoreInterface)
          //   .subscribe();
          this.scoreStorageService.catchScores(this.calculateScore());
        }
        this.playNextStar();
      } else {
        this.showGuidBox();
      }
    }
  }

  calculateScore(): number {
    // It is the travelled time of the object before user hit the correct Answer.
    const travelledBeforeHit =
      (secondsForTraver + bufferBeforeStart - (Date.now() - this.startTime)) /
      1000;

    // Below line `/ 1000` is converting Milli seconds to seconds
    const result = travelledBeforeHit * (10 / (secondsForTraver / 1000));

    // To show only one decimal number after decimal point
    return Math.round(result * 10) / 10;
  }

  showGuidBox(): void {
    this.guidBoxShowing = true;
  }

  playNextStar(): void {
    this.startTime = Date.now();
    this.guidBoxShowing = false;
    if (this.words.length === this.words.indexOf(this.currentWord) + 1) {
      // It means the game is finish
      // TODO: Remove below line, it is just for develop a feature
      // this.words[0].animating = true;
      setTimeout(() => {
        this.showEndGameDialog();
      }, 1000);
    } else {
      this.words[this.words.indexOf(this.currentWord) + 1].animating = true;
    }
  }

  getRandomNumber(): number {
    const result = Math.floor(Math.random() * 90 + 10);
    // If left of the object would be more than 95%,
    // then the object overflow from right side of the screen
    return result > 95 ? result - 10 : result;
  }

  checkSelectedAnswer(item: string): void {
    const activeWord = this.words.find((x) => x.animating);
    activeWord.selectedAnswer = item;
    this.boxAnimationDone(activeWord);
  }

  isPressing(answer): boolean {
    return (
      this.words.find((x) => x.animating).possibleAnswers.indexOf(answer) +
        1 ===
      this.pressedNumber
    );
  }
}
