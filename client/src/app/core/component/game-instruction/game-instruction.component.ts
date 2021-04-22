import { Component, Input, OnInit } from '@angular/core';
import { GameNameEnum } from '../../models/game-name.enum';

@Component({
  selector: 'app-game-instruction',
  templateUrl: './game-instruction.component.html',
  styleUrls: ['./game-instruction.component.scss'],
})
export class GameInstructionComponent implements OnInit {
  @Input() gameName: GameNameEnum = -1;
  textTemplate = '';

  ngOnInit(): void {
    if (this.gameName === GameNameEnum.supperMario) {
      this.textTemplate = `
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
      this.textTemplate = `
<ul class='mt-4'>
  <li>
    <strong>Mission</strong><p>Prevent stars to reach to the earth.</p>
  </li>
  <li>
    <strong>How to play</strong>
    <p>Select the correct word which is most related to the word written on the falling star.</p>
  </li>
  <li>
    <strong>Scores</strong>
    <p>As much as you hit the correct answer faster, you get more score. <br>
       Choosing a wrong answer has no score.</p>
  </li>
  <li>
    <strong>Movements / keys</strong>
    <p>For selecting right answer, you can press 1,2,3,4 keys or select the word by mouse.</p>
  </li>
  <li>
    <strong>Extra pints</strong>
    <p>If you choose a wrong answer for a word, that word will be asked again at the end of the game with half score.</p>
  </li>
</ul>
      `;
    }
  }
}
