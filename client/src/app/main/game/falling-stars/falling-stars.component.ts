import {Component, OnInit} from '@angular/core';
import {GamesService} from '../../../service/games.service';

@Component({
  selector: 'app-falling-stars',
  templateUrl: './falling-stars.component.html',
  styleUrls: ['./falling-stars.component.scss']
})
export class FallingStarsComponent implements OnInit {
  words: any[];
  currentWord: any;

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
          style: {left: `${index * 10 + 10}%`, top: '-10%'},
          typingWord: ''
        });
        this.startWord(this.words[0]);
      });
    });
  }

  startWord(word): void {
    this.currentWord = word;
    const presentingWord = setInterval(() => {
      const top = parseInt(word.style.top, null);
      if (word.typingWord.toLowerCase() === word.value.toLowerCase()) {
        word.answered = true;
        clearInterval(presentingWord);
        this.endWord(word);

      } else {
        if (top < 100) {
          word.style.top = (top + 1) + '%';
        } else {
          clearInterval(presentingWord);
          this.endWord(word);
        }
      }
    }, 500);
  }

  endWord(word): void {
    word.terminate = true;
    const index = this.words.indexOf(word);
    if (this.words.length !== index - 1 && this.words[index + 1]) {
      this.startWord(this.words[index + 1]);
    }
  }

  // checkWord(event: KeyboardEvent): void {
  //   if (this.typingWord.toLowerCase() === this.currentWord.value.toLowerCase()) {
  //     clearInterval(this.presentingWord);
  //     this.endWord(this.currentWord);
  //     this.typingWord = '';
  //   }
  // }
}

