import {ElementStyle} from './element-style.model';

export class MarioModel {
  isJumping?: boolean;
  style: ElementStyle;

  constructor() {
  }

  setStyle(style: ElementStyle): void {
    this.style = style;
  }

  moveLeft(distance?: number): void {
    distance = distance || 1;
    const left = parseInt(this.style.left, null);
    if (left >= distance) {
      this.style.left = (left - distance) + '%';
    } else {
      this.style.left = '0%';
    }
  }

  moveRight(distance?: number): void {
    distance  = distance || 1;
    const right = parseInt(this.style.left, null);
    if (right + parseInt(this.style.width, null) + distance < 100) {
      this.style.left = (right + distance) + '%';
    } else {
      this.style.left = (100 - parseInt(this.style.width, null)) + '%';
    }
  }

  jump(height?: number): void {
    if (this.isJumping) {
      return;
    }
    height = height || 30;
    const originalTop = this.style.top;
    this.style.transition = 'top 1s';
    this.isJumping = true;
    this.style.top = (parseInt(this.style.top, null) - height) + '%';
    setTimeout(() => {
      this.style.top = originalTop;
      setTimeout(() => {
        this.style.transition = '';
        this.isJumping = false;
      }, 1000);
    }, 1000);
  }
}
