import { ElementStyle } from './element-style.model';

export class MarioModel {
  isJumping?: boolean;
  isMoving?: boolean;
  isMovingRight?: boolean;
  isMovingLeft?: boolean;
  style: ElementStyle = {} as ElementStyle;
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
    this.style.background =
      'url("../../../../assets/mario/mario-jumping.png") 0 0 no-repeat';
    if (this.isJumping) {
      return;
    }
    height = height || 30;
    this.originalBottom = this.style.bottom;
    this.isJumping = true;
    let intervalStep = 0;
    let counter = 0;
    const interval = setInterval(() => {
      if (parseInt(this.style.bottom, 0) > 35) {
        intervalStep = 4;
        this.style.transition = 'bottom 20ms';
      } else {
        this.style.transition = 'bottom 10ms';
      }

      if (counter >= intervalStep) {
        counter = 0;
        this.style.bottom =
          (parseInt(this.style.bottom || '0', 0) + 1).toString() + '%';
        if (
          parseInt(this.style.bottom || '0', 0) >=
          (height || 0) + parseInt(this.originalBottom || '0', 0)
        ) {
          clearInterval(interval);
          this.comeDown();
        }
      }
      counter++;
    }, 10);
  }

  comeDown(): void {
    this.style.transition = '0ms';
    let intervalStep = 0;
    let counter = 0;
    const interval = setInterval(() => {
      if (
        parseInt(this.style.bottom, 0) > 20 &&
        parseInt(this.style.bottom, 0) < 30
      ) {
        intervalStep = 0;
        // this.style.transition = 'bottom 10ms';
      } else if (parseInt(this.style.bottom, 0) > 38) {
        intervalStep = 1;
        // this.style.transition = 'bottom 20ms';
      } else {
        // this.style.transition = 'bottom 10ms';
      }
      if (
        parseInt(this.style.bottom || '0', 0) <=
        parseInt(this.originalBottom || '0', 0)
      ) {
        clearInterval(interval);
        this.isJumping = false;
        this.style.background =
          'url("../../../../assets/mario/mario-movement.png") 0 0 no-repeat';
        return;
      }
      if (counter >= intervalStep) {
        counter = 0;
        this.style.bottom =
          (parseInt(this.style?.bottom || '0', 0) - 1).toString() + '%';
      }
      counter++;
    }, 10);
  }
}
