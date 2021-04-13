import { Component, Input, OnInit } from '@angular/core';
import { GameConfigModel } from '../../models/game-config-model';
import { BookModel } from '../../models/book.model';
import { ChapterModel } from '../../models/chapter.model';

@Component({
  selector: 'app-ranking',
  templateUrl: './ranking.component.html',
  styleUrls: ['./ranking.component.scss'],
})
export class RankingComponent implements OnInit {
  @Input() form: GameConfigModel = {
    selectedBook: {} as BookModel,
    selectedChapter: {} as ChapterModel,
  };

  constructor() {}

  ngOnInit(): void {}
}
