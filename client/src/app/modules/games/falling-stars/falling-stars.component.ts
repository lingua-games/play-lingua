import { Component, OnInit } from '@angular/core';
import { animate, style, transition, trigger } from '@angular/animations';
import { FallingStarsWord } from '../../../core/models/falling-stars-word.interface';
import { Score } from '../../../core/models/score.interface';
import { GamesService } from '../../../core/service/games.service';
import { MatDialog } from '@angular/material/dialog';
import { StartGameDialogComponent } from './start-game-dialog/start-game-dialog.component';
import { Book } from '../../../core/models/book.interface';
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
    this.getGameWords();
  }

  showStartDialog(): void {
    const dialog = this.dialog.open(StartGameDialogComponent, {
      disableClose: true,
      width: '30%',
    });

    dialog.afterClosed().subscribe((res: any) => {
      // this.startGame();
    });
  }

  getGameWords(): void {
    this.words = [];
    this.gamesService
      .getGameWords()
      .subscribe((res: WordKeyValueModel<string[]>[]) => {
        this.scoreBoard.total = res.length;
        this.scoreBoard.correct = 0;
        this.scoreBoard.inCorrect = 0;
        res.forEach((element) => {
          this.words.push({
            key: element.key,
            correctAnswers: element.value,
            style: { left: `${this.getRandomNumber()}%` },
            selectedAnswer: '',
            animating: false,
            possibleAnswers: this.generateRandomOptions(element, res),
          });
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
    const copyOfAllWords = JSON.parse(
      JSON.stringify(allWords.filter((x) => x.key !== targetWord.key))
    );

    // Filling the correct option
    const answerPlace = Math.round(Math.random() * (3 - 0));
    const answersLength = targetWord.value.length;
    if (answersLength === 1) {
      result[answerPlace] = targetWord.value[0];
    } else {
      // if the word has more than 1 answers, get one randomly
      result[answerPlace] =
        targetWord.value[Math.round(Math.random() * (answersLength - 1))];
    }

    // Filling the rest of options
    for (let i = 0; i < 4; i++) {
      if (!result[i]) {
        const randomIndex = Math.round(
          Math.random() * (copyOfAllWords.length - 1)
        );
        result[i] = copyOfAllWords[randomIndex].value[0];
        copyOfAllWords.splice(randomIndex, 1);
      }
    }

    return result;
  }

  showReadyBox(): boolean {
    return !this.words.find((x) => x.animating);
  }

  startGame(): void {
    this.words[0].animating = true;
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
    console.log(this.scoreBoard);
  }
}
