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
      <p>
      In <strong>Super Mario game</strong> You have control over Mario character and can move to
      <strong>left</strong>, <strong>right</strong> and even
      <strong>jump</strong> in screen.
      </p>
      <p>
      While playing game, an <strong>enemy</strong> in style of bird appears on the top of screen and at the same time four <strong>mushrooms</strong>
       one by one start moving through right to left side of the screen , each <strong>mushrooms</strong> has a word (key) in it and those <strong>mushrooms</strong>
       which has related word with the <strong>enemy</strong> are healthy and the rest are with poison.
      </p>
      <p>
      <strong>Healthy mushroom: </strong>When Mario eat a healthy mushroom, he earn points and the value of this point is depends on how fast mushroom get eaten
      </p>
      <p>
      <strong>Poison mushroom: </strong>When Mario eat a poison mushroom, he <strong>does not</strong> earn points and this enemy will appear again at the end of the game,
      this time score divide by 2 and so on
      </p>
      <p>
      <strong>Note. </strong> If you feel like <strong>mushrooms</strong> are moving slowly and it is boring for you, you can always skip
      <strong>mushroom</strong> with pressing <strong>[Q]</strong>
      </p>
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
