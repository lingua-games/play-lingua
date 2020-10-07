import {ElementStyle} from './element-style.model';

export class Mario {
  isJumping?: boolean;
  style: ElementStyle;

  constructor() {
  }

  setStyle(style: ElementStyle): void {
    this.style = style;
  }

  moveLeft(width?: number): void {
    width = width || 1;
    const left = parseInt(this.style.left, null);
    if (left >= 1) {
      this.style.left = (left - width) + '%';
    }
  }

  moveRight(width?: number): void {
    width = width || 1;
    const right = parseInt(this.style.left, null);
    if (right + width < 100) {
      this.style.left = (right + width) + '%';
    }
  }

  jump(height?: number): void {
    if (this.isJumping) {
      return;
    }
    height = height || 30;
    const originalTop = this.style.top;
    this.style.transition = '1s';
    this.isJumping = true;
    this.style.top = (parseInt(this.style.top, null) - height) + '%';
    setTimeout(() => {
      this.style.top = originalTop;
      setTimeout(() => {
        this.style.transition = '100ms';
        this.isJumping = false;
      }, 1000);
    }, 1000);
  }
}
