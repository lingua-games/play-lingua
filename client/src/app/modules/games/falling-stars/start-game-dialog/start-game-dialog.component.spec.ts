import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StartGameDialogComponent } from './start-game-dialog.component';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MatDialogRef } from '@angular/material/dialog';
import { NotificationService } from '../../../../core/service/notification.service';

describe('StartGameDialogComponent', () => {
  let component: StartGameDialogComponent;
  let fixture: ComponentFixture<StartGameDialogComponent>;
  let mockMatDialogRef;
  beforeEach(async(() => {
    mockMatDialogRef = jasmine.createSpyObj(['close']);
    localStorage.setItem(
      'lingua-default-languages',
      `{"defaultBaseLanguage":{"id":123,"code":"fa","name":"Persian","nativeName":"فارسی","fullName":"Persian - فارسی"},"defaultTargetLanguage":{"id":38,"code":"nl","name":"Dutch","nativeName":"Nederlands, Vlaams","fullName":"Dutch - Nederlands, Vlaams"}}`
    );

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      declarations: [StartGameDialogComponent],
      providers: [
        {
          provide: MatDialogRef,
          useValue: mockMatDialogRef,
        },
      ],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StartGameDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
