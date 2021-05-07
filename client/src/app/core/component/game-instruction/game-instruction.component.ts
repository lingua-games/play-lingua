import { Component, Input, OnInit } from '@angular/core';
import { GameNameEnum } from '../../models/game-name.enum';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-game-instruction',
  templateUrl: './game-instruction.component.html',
  styleUrls: ['./game-instruction.component.scss'],
})
export class GameInstructionComponent implements OnInit {
  @Input() gameName: GameNameEnum = -1;
  textTemplate: SafeHtml = {} as SafeHtml;

  constructor(private sanitizer: DomSanitizer) {}

  ngOnInit(): void {
    let template = '';
    if (this.gameName === GameNameEnum.supperMario) {
      template = `
<div class='mt-3'>
  <ul>
    <li style='margin-bottom: 1rem'><a>Move and jump to eat the best mushroom as an answer for the word on top.</a></li>
    <li style='margin: 1rem 0'><a>Wrongly eaten mushrooms will show up again with less score.</a></li>
    <li style='margin: 1rem 0'><a>You can skip a mushroom by pressing [Q].</a></li>
    <li style='margin: 1rem 0'><strong>Tip: </strong><a>Be fast and boost your score!</a></li>
  </ul>
</div>

      `;
    } else if (this.gameName === GameNameEnum.fallingStars) {
      template = `
<div class='alert alert-info'>
  <ul>
    <li style='margin-bottom: 1rem'><a>Choose the correct translate for the falling word!</a></li>
    <li style='margin: 1rem 0'><a>Select correct answer using your mouse or numbers on your keyboard</a></li>
    <li style='margin: 1rem 0'><a>Wrongly answered questions, will show up again with less score</a></li>
    <li style='margin: 1rem 0'><strong>Tip: </strong><a>Be fast and boost your score!</a></li>
  </ul>
</div>
      `;
    }

    this.textTemplate = this.sanitizer.bypassSecurityTrustHtml(template);
  }
}
