import { LoadingDirective } from './loading.directive';
import { TestBed } from '@angular/core/testing';

describe('LoadingDirective', () => {
  let directive;
  beforeEach(() => {
    TestBed.configureTestingModule({});
    const element = jasmine.createSpyObj(['nativeElement']);
    directive = new LoadingDirective(element);
  });
  it('should create an instance', () => {
    expect(directive).toBeTruthy();
  });
});
