import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuidBoxComponent } from './guid-box.component';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';

describe('GuidBoxComponent', () => {
  let component: GuidBoxComponent;
  let fixture: ComponentFixture<GuidBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GuidBoxComponent],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GuidBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
