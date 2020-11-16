import {
  Directive,
  ElementRef,
  Input,
  OnChanges,
  OnInit,
  Renderer2,
  SimpleChanges,
} from '@angular/core';

@Directive({
  selector: '[appLoading]',
})
export class LoadingDirective implements OnInit, OnChanges {
  // tslint:disable-next-line:no-input-rename
  @Input('loadingFlag') loadingFlag: boolean;

  constructor(private element: ElementRef) {
    console.log(this.loadingFlag);
  }

  ngOnInit(): void {
    this.element.nativeElement.style.transition = '2s';
  }

  ngOnChanges(): void {
    if (this.loadingFlag) {
      this.element.nativeElement.style.pointerEvents = 'none';
      this.element.nativeElement.style.animation =
        'loading-animation 1500ms linear infinite';
    } else {
      this.element.nativeElement.style.animation =
        'stop-loading-animation 500ms';
      this.element.nativeElement.style.pointerEvents = 'all';
    }
  }
}
