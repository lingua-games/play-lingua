import { Component, HostListener, OnInit } from '@angular/core';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { FallingStarsWord } from '../../../core/models/falling-stars-word.interface';
import { Score } from '../../../core/models/score.interface';
import { GamesService } from '../../../core/service/games.service';
import { MatDialog } from '@angular/material/dialog';
import { StartGameDialogComponent } from './start-game-dialog/start-game-dialog.component';
import { WordKeyValueModel } from '../../../core/models/word-key-value.model';

@Component({
  selector: 'app-falling-stars',
  templateUrl: './falling-stars.component.html',
  styleUrls: ['./falling-stars.component.scss'],
  animations: [
    trigger('fade', [
      transition('void => true', [
        style({ top: '-10%' }),
        animate(5000, style({ top: '100%' })),
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
  currentWord: FallingStarsWord = new FallingStarsWord();
  guidBoxShowing: boolean;

  @HostListener('document:keydown ', ['$event'])
  keyDownEvent(event: KeyboardEvent): void {
    console.log(event);
    if (!this.words || !this.words.length) {
      return;
    }
    if (event.code === 'Digit1' || event.code === 'Numpad1') {
      this.checkSelectedAnswer(this.getAnswers()[0]);
    }

    if (
      (event.code === 'Enter' || event.code === 'NumpadEnter') &&
      this.guidBoxShowing
    ) {
      this.playNextStar();
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

    if (event.code === 'Escape') {
    }
  }

  constructor(private gamesService: GamesService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.showStartDialog();
  }

  showStartDialog(): void {
    this.dialog
      .open(StartGameDialogComponent, {
        disableClose: true,
        width: '30%',
      })
      .afterClosed()
      .subscribe((res: WordKeyValueModel<string[]>[]) => {
        if (res && res.length) {
          this.setGameWords(res);
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
    if (this.words[0]) {
      this.words[0].animating = true;
    }
  }

  boxAnimationDone(
    word: FallingStarsWord,
    starHitFloor: boolean = false
  ): void {
    word.animating = false;
    this.currentWord = word;

    if (starHitFloor) {
    } else {
      if (word.correctAnswers.find((x) => x === word.selectedAnswer)) {
        // TODO: Show BOOOOOOM HURAAAAA here
        this.playNextStar();
      } else {
        this.showGuidBox();
      }
    }
  }

  showGuidBox(): void {
    this.guidBoxShowing = true;
  }

  playNextStar(): void {
    if (this.words.length === this.words.indexOf(this.currentWord) + 1) {
      // It means the game is finish
      // TODO: Remove below line, it is just for develop a feature
      this.words[0].animating = true;
    }
    this.guidBoxShowing = false;
    this.words[this.words.indexOf(this.currentWord) + 1].animating = true;
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
    activeWord.correctShowingAnswer = activeWord.correctAnswers.filter((x) =>
      this.getAnswers().find((y) => x === y)
    )[0];
    this.boxAnimationDone(activeWord);
  }
}
