import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SendInvitationComponent } from './send-invitation.component';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MessageService } from 'primeng/api';

describe('SendInvitationComponent', () => {
  let component: SendInvitationComponent;
  let fixture: ComponentFixture<SendInvitationComponent>;
  let mockMessageService;
  beforeEach(async () => {
    mockMessageService = jasmine.createSpyObj(['add']);
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [SendInvitationComponent],
      providers: [
        {
          provide: MessageService,
          useValue: mockMessageService,
        },
      ],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SendInvitationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
