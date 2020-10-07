import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SuperMarioComponent } from './super-mario.component';

describe('SuperMarioComponent', () => {
  let component: SuperMarioComponent;
  let fixture: ComponentFixture<SuperMarioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SuperMarioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SuperMarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
