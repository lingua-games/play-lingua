import { Component, OnInit } from '@angular/core';
import { animate, style, transition, trigger } from '@angular/animations';
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
  ],
})
export class FallingStarsComponent implements OnInit {
  words: FallingStarsWord[] = [];
  scoreBoard: Score = {} as Score;

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
    this.scoreBoard.total = res.length;
    this.scoreBoard.correct = 0;
    this.scoreBoard.inCorrect = 0;
    res.forEach((element: WordKeyValueModel<string[]>) => {
      this.words.push({
        key: element.key,
        correctAnswers: element.values,
        style: { left: `${this.getRandomNumber()}%` },
        selectedAnswer: '',
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

  boxAnimationDone(word: FallingStarsWord): void {
    word.animating = false;
    const index = this.words.indexOf(word);
    if (this.words.length === index + 1) {
      // It means the game is finish
    } else {
      this.words[index + 1].animating = true;
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
    if (
      activeWord.correctAnswers.find(
        (x) => x.toLowerCase() === item.toLowerCase()
      )
    ) {
      this.scoreBoard.correct++;
    } else {
      this.scoreBoard.inCorrect++;
    }
    this.boxAnimationDone(activeWord);
  }
}
