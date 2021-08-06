import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewInvitationsComponent } from './view-invitations.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { InvitationService } from '../../../core/service/invitation.service';
import { of, throwError } from 'rxjs';
import { InvitationForm } from '../../../core/models/invitation-form.interface';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import {
  NotificationService,
  Severity,
} from '../../../core/service/notification.service';

describe('ViewInvitationsComponent', () => {
  let component: ViewInvitationsComponent;
  let fixture: ComponentFixture<ViewInvitationsComponent>;
  let mockNotificationService;
  let mockInvitationService;

  beforeEach(async () => {
    mockNotificationService = jasmine.createSpyObj(['showMessage']);
    mockInvitationService = jasmine.createSpyObj('invitationService', {
      getInvitations: () => of(),
      resendInvitationMail: () => of(),
      changeInvitationVisibility: () => of(),
    });

    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [ViewInvitationsComponent],
      providers: [
        {
          provide: NotificationService,
          useValue: mockNotificationService,
        },
        {
          provide: InvitationService,
          useValue: mockInvitationService,
        },
      ],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewInvitationsComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    mockInvitationService.getInvitations.and.callFake(() => {
      return of([{ playerName: 'fake player name' } as InvitationForm]);
    });
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should call getInvitation on initial time', () => {
    spyOn(component, 'getInvitations');

    fixture.detectChanges();

    expect(component.getInvitations).toHaveBeenCalled();
  });

  it('should set invitations if API call successfully', () => {
    mockInvitationService.getInvitations.and.callFake(() => {
      return of([{ playerName: 'fake player name' } as InvitationForm]);
    });

    component.getInvitations();

    expect(component.invitations.data[0].playerName).toBe('fake player name');
  });

  it('should stop loading if API fail', () => {
    mockInvitationService.getInvitations.and.callFake(() => {
      return throwError('I am error');
    });

    component.getInvitations();

    expect(component.invitations.isLoading).toBeFalsy();
  });

  it('should show notification if resend email success', () => {
    mockInvitationService.resendInvitationMail.and.callFake(() => {
      return of(true);
    });

    component.resendInvitationEmail({} as InvitationForm);

    expect(mockNotificationService.showMessage).toHaveBeenCalledWith(
      'Email sent',
      Severity.success
    );
  });

  it('should show notification if resend email fail', () => {
    mockInvitationService.resendInvitationMail.and.callFake(() => {
      return throwError('I am error');
    });

    component.resendInvitationEmail({} as InvitationForm);

    expect(mockNotificationService.showMessage).toHaveBeenCalledWith(
      'Failed to resend email',
      Severity.error
    );
  });

  describe('hideInvitation', () => {
    it('should show successful message once service success', () => {
      mockInvitationService.changeInvitationVisibility.and.callFake(() => {
        return of({});
      });
      const invitations = [{ email: 'fake email' } as InvitationForm];
      component.invitations.data = invitations;

      component.hideInvitation(invitations[0]);

      expect(mockNotificationService.showMessage).toHaveBeenCalledWith(
        'Successful',
        Severity.success
      );
    });

    it('should show error message once service fail', () => {
      mockInvitationService.changeInvitationVisibility.and.callFake(() => {
        return throwError('I am error');
      });
      const invitations = [{ email: 'fake email' } as InvitationForm];

      component.hideInvitation(invitations[0]);

      expect(mockNotificationService.showMessage).toHaveBeenCalledWith(
        'Failed to hide invitation',
        Severity.error
      );
    });
  });
});
