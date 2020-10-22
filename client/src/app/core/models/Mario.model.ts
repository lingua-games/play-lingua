import { ElementStyle } from './element-style.model';

export class MarioModel {
  isJumping?: boolean;
  style: ElementStyle;
  originalBottom?: string;

  constructor() {}

  setStyle(style: ElementStyle): void {
    this.style = style;
  }

  moveLeft(distance?: number): void {
    distance = distance || 1;
    const left = parseInt(this.style.left, null);
    if (left >= distance) {
      this.style.left = left - distance + '%';
    } else {
      this.style.left = '0%';
    }
  }

  moveRight(distance?: number): void {
    distance = distance || 1;
    const right = parseInt(this.style.left, null);
    if (right + parseInt(this.style.width, null) + distance < 100) {
      this.style.left = right + distance + '%';
    } else {
      this.style.left = 100 - parseInt(this.style.width, null) + '%';
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
      this.style.bottom = parseInt(this.style.bottom, null) + 1 + '%';
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
      this.style.bottom = parseInt(this.style.bottom, null) - 1 + '%';
    }, 10);
  }
}
