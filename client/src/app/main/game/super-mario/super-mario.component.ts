import {Component, HostListener, OnInit} from '@angular/core';
import {Mario} from '../../../models/Mario';

@Component({
  selector: 'app-super-mario',
  templateUrl: './super-mario.component.html',
  styleUrls: ['./super-mario.component.scss'],
})
export class SuperMarioComponent implements OnInit {

  mario: Mario = new Mario();

  @HostListener('document:keydown ', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent): void {
    switch (event.code) {
      case 'ArrowLeft':
        this.moveLeft();
        break;
      case 'ArrowRight':
        this.moveRight();
        break;
      case 'Space':
        this.jump();
        break;
    }
  }

  constructor() {
  }

  ngOnInit(): void {
    this.mario.setStyle({
      border: '1px solid',
      position: 'absolute',
      top: '85%',
      width: '3%',
      height: '5%',
      left: '10%',
      transition: '100ms',
    });
  }

  moveLeft(): void {
    this.mario.moveLeft(2);
  }

  moveRight(): void {
    this.mario.moveRight(2);
  }

  jump(): void {
    this.mario.jump();
  }
}
