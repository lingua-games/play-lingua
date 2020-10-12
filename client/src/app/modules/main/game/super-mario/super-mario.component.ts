import {Component, HostListener, OnInit} from '@angular/core';
import {MarioModel} from '../../../../core/models/Mario.model';

@Component({
  selector: 'app-super-mario',
  templateUrl: './super-mario.component.html',
  styleUrls: ['./super-mario.component.scss'],
})
export class SuperMarioComponent implements OnInit {

  mario: MarioModel = new MarioModel();

  movingRightInterval?: number;
  movingLeftInterval?: number;

  @HostListener('document:keydown ', ['$event'])
  keyDownEvent(event: KeyboardEvent): void {
    switch (event.code) {
      case 'ArrowLeft':
        this.startMovingLeft();
        break;
      case 'ArrowRight':
        this.startMovingRight();
        break;
      case 'Space':
        this.jump();
        break;
    }
  }

  @HostListener('document:keyup', ['$event'])
  keyUpEvent(event: KeyboardEvent): void {
    switch (event.code) {
      case 'ArrowLeft':
        this.stopMovingLeft();
        break;
      case 'ArrowRight':
        this.stopMovingRight();
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

  stopMovingLeft(): void {
    clearInterval(this.movingLeftInterval);
    this.movingLeftInterval = null;
  }

  startMovingLeft(): void {
    if (!this.movingLeftInterval) {
      this.movingLeftInterval = setInterval(() => {
        this.mario.moveLeft(1);
      }, 30);
    }
  }

  stopMovingRight(): void {
    clearInterval(this.movingRightInterval);
    this.movingRightInterval = null;
  }

  startMovingRight(): void {
    if (!this.movingRightInterval) {
      this.movingRightInterval = setInterval(() => {
        this.mario.moveRight(1);
      }, 30);
    }
  }

  jump(): void {
    this.mario.jump();
  }
}
