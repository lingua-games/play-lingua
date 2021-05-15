import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuidBoxComponent } from './guid-box.component';

describe('GuidBoxComponent', () => {
  let component: GuidBoxComponent;
  let fixture: ComponentFixture<GuidBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GuidBoxComponent ]
    })
    .compileComponents();
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
