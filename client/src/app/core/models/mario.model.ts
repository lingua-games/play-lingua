import { ElementStyle } from './element-style.model';

export class MarioModel {
  isJumping?: boolean;
  isMoving?: boolean;
  isMovingRight?: boolean;
  isMovingLeft?: boolean;
  style: ElementStyle;
  originalBottom?: string;

  constructor() {}

  setStyle(style: ElementStyle): void {
    this.style = style;
  }

  moveLeft(distance?: number): void {
    this.isMovingRight = false;
    this.isMovingLeft = true;
    this.isMoving = true;
    distance = distance || 1;
    const left = parseInt(this.style.left, null);
    if (left >= distance) {
      this.style.left = (left - distance).toString() + '%';
    } else {
      this.style.left = '0%';
    }
  }

  moveRight(distance?: number): void {
    this.isMovingLeft = false;
    this.isMovingRight = true;
    this.isMoving = true;
    distance = distance || 1;
    const right = parseInt(this.style.left, null);
    if (right + parseInt(this.style.width, null) + distance < 100) {
      this.style.left = (right + distance).toString() + '%';
    } else {
      this.style.left =
        (100 - parseInt(this.style.width, null)).toString() + '%';
    }
  }

  jump(height?: number): void {
    if (this.isJumping) {
      return;
    }
    height = height || 30;
    this.originalBottom = this.style.bottom;
    this.isJumping = true;
    const interval = setInterval(() => {
      this.style.bottom =
        (parseInt(this.style.bottom, null) + 1).toString() + '%';
      if (
        parseInt(this.style.bottom, null) >=
        height + parseInt(this.originalBottom, null)
      ) {
        clearInterval(interval);
        this.comeDown();
      }
    }, 10);
  }

  comeDown(): void {
    const interval = setInterval(() => {
      if (
        parseInt(this.style.bottom, null) <= parseInt(this.originalBottom, null)
      ) {
        clearInterval(interval);
        this.isJumping = false;
        return;
      }
      this.style.bottom =
        (parseInt(this.style.bottom, null) - 1).toString() + '%';
    }, 10);
  }
}
