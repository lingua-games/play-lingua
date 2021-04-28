import { ElementStyle } from './element-style.model';

export class MarioModel {
  isJumping?: boolean;
  isMoving?: boolean;
  isMovingRight?: boolean;
  isMovingLeft?: boolean;
  style: ElementStyle = {} as ElementStyle;
  originalBottom?: string;
  jumpBackground?: string;
  movementBackground?: string;

  constructor() {}

  setStyle(style: ElementStyle): void {
    this.style = style;
  }

  moveLeft(distance?: number): void {
    this.isMovingRight = false;
    this.isMovingLeft = true;
    this.isMoving = true;
    distance = distance || 1;
    const left = parseInt(this.style.left || '0', 0);
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
    const right = parseInt(this.style.left || '0', 0);
    if (right + parseInt(this.style.width || '0', 0) + distance < 100) {
      this.style.left = (right + distance).toString() + '%';
    } else {
      this.style.left =
        (100 - parseInt(this.style.width || '0', 0)).toString() + '%';
    }
  }

  jump(height?: number): void {
    this.style.background = this.jumpBackground;
    if (this.isJumping) {
      return;
    }
    height = height || 30;
    this.originalBottom = this.style.bottom;
    this.isJumping = true;
    const interval = setInterval(() => {
      this.style.bottom =
        (parseInt(this.style.bottom || '0', 0) + 1).toString() + '%';
      if (
        parseInt(this.style.bottom || '0', 0) >=
        (height || 0) + parseInt(this.originalBottom || '0', 0)
      ) {
        clearInterval(interval);
        setTimeout(() => {
          this.comeDown();
        }, 150);
      }
    }, 10);
  }

  comeDown(): void {
    this.style.transition = '0ms';
    const interval = setInterval(() => {
      if (
        parseInt(this.style.bottom || '0', 0) <=
        parseInt(this.originalBottom || '0', 0)
      ) {
        clearInterval(interval);
        this.isJumping = false;
        this.style.background = this.movementBackground;
        return;
      }
      this.style.bottom =
        (parseInt(this.style?.bottom || '0', 0) - 1).toString() + '%';
    }, 10);
  }
}
