import {Component, OnInit} from '@angular/core';
import {GamesService} from '../../../service/games.service';
import {animate, style, transition, trigger} from '@angular/animations';
import {FallingStarsWord} from '../../../models/falling-stars-word.interface';

@Component({
  selector: 'app-falling-stars',
  templateUrl: './falling-stars.component.html',
  styleUrls: ['./falling-stars.component.scss'],
  animations: [
    trigger('fade', [
      transition('void => true', [
        style({top: '-10%'}),
        animate(5000, style({top: '100%'}))
      ])
    ])
  ]
})
export class FallingStarsComponent implements OnInit {
  words: FallingStarsWord[] = [];
  typingWord: string;

  constructor(private gamesService: GamesService) {
  }

  ngOnInit(): void {
    this.getGameWords();
  }

  getGameWords(): void {
    this.words = [];
    this.gamesService.getGameWords().subscribe((res: string[]) => {
      res.forEach((element, index: number) => {
        this.words.push({
          value: element,
          // To get random 2 digit number
          style: {left: `${this.getRandomNumber()}%`},
          typingWord: '',
          animating: false
        });
      });
      this.words[0].animating = true;
    });
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

  checkTypingWord(event: string): void {
    const activeWord = this.words.find(x => x.animating);
    if (
      event.toLowerCase() === activeWord.value.toLowerCase()) {
      this.typingWord = '';
      this.boxAnimationDone(activeWord);
    }
  }
}

