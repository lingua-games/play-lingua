import { LoadingDirective } from './loading.directive';
import { TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';

describe('LoadingDirective', () => {
  let directive;
  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
    });
    const element = jasmine.createSpyObj(['nativeElement']);
    directive = new LoadingDirective(element);
  });
  it('should create an instance', () => {
    expect(directive).toBeTruthy();
  });
});
