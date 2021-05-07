import { Component, OnInit } from '@angular/core';
import { InvitationService } from '../../../core/service/invitation.service';
import { ApiResult } from '../../../core/models/api-result.model';
import { InvitationForm } from '../../../core/models/invitation-form.interface';
import {
  NotificationService,
  Severity,
} from '../../../core/service/notification.service';

@Component({
  selector: 'app-view-invitations',
  templateUrl: './view-invitations.component.html',
  styleUrls: ['./view-invitations.component.scss'],
})
export class ViewInvitationsComponent implements OnInit {
  public invitations: ApiResult<InvitationForm[]> = new ApiResult<
    InvitationForm[]
  >();
  constructor(
    private invitationService: InvitationService,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.getInvitations();
  }

  getInvitations(): void {
    this.invitations.setLoading(true);
    this.invitationService.getInvitations().subscribe(
      (res: InvitationForm[]) => {
        this.invitations.setData(res);
      },
      () => {
        this.invitations.setLoading(false);
      }
    );
  }

  hideInvitation(invitation: InvitationForm): void {
    invitation.isHiding = true;
    this.invitationService
      .changeInvitationVisibility(invitation.uniqueKey, false)
      .subscribe(
        () => {
          invitation.isHiding = false;
          this.notificationService.showMessage('Successful', Severity.success);
          const index = this.invitations.data.indexOf(invitation);
          this.invitations.data.splice(index, 1);
        },
        () => {
          this.notificationService.showMessage(
            'Failed to hide invitation',
            Severity.error
          );
          invitation.isHiding = false;
        }
      );
  }

  resendInvitationEmail(invitation: InvitationForm): void {
    invitation.isSendingInvitationLoading = true;
    this.invitationService.resendInvitationMail(invitation.uniqueKey).subscribe(
      () => {
        invitation.isSendingInvitationLoading = false;
        this.notificationService.showMessage('Email sent', Severity.success);
      },
      () => {
        this.notificationService.showMessage(
          'Failed to resend email',
          Severity.error
        );
        invitation.isSendingInvitationLoading = false;
      }
    );
  }
}
