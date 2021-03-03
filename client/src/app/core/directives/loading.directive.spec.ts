import { LoadingDirective } from './loading.directive';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  DebugElement,
  NO_ERRORS_SCHEMA,
} from '@angular/core';
import { By } from '@angular/platform-browser';

@Component({
  template: `
    <div appLoading [loadingFlag]="flag">
      <h2>No Highlight</h2>
    </div>
  `,
})
class TestComponent {
  public flag = true;

  triggerFlag(): void {
    this.flag = !this.flag;
  }
}

describe('LoadingDirective', () => {
  let fixture: ComponentFixture<TestComponent>;
  let des: DebugElement[];
  let component: TestComponent;
  beforeEach(() => {
    fixture = TestBed.configureTestingModule({
      declarations: [LoadingDirective, TestComponent],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
    }).createComponent(TestComponent);
    des = fixture.debugElement.queryAll(By.directive(LoadingDirective));
    component = fixture.componentInstance;
  });

  it('should set the transition to 2s', () => {
    fixture.detectChanges();
    expect(des[0].nativeElement.style.transition).toBe('all 2s ease 0s');
  });

  it('should trigger loading on trigger call', () => {
    component.triggerFlag();
    fixture.detectChanges();
    expect(des[0].nativeElement.style.animation).toBe(
      '500ms ease 0s 1 normal none running stop-loading-animation'
    );
    expect(des[0].nativeElement.style.pointerEvents).toBe('all');

    component.triggerFlag();
    fixture.detectChanges();
    expect(des[0].nativeElement.style.animation).toBe(
      '1500ms linear 0s infinite normal none running loading-animation'
    );
    expect(des[0].nativeElement.style.pointerEvents).toBe('none');
  });
});
