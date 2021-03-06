import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { InvitationForm } from '../models/invitation-form.interface';
import { environment } from '../../../environments/environment';
import { UserModel } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class InvitationService {
  constructor(private http: HttpClient) {}

  adminApi = environment.apiUrl + 'admin';

  send(form: InvitationForm): Observable<InvitationForm> {
    return this.http.post<InvitationForm>(
      this.adminApi + '/send-invitation',
      form
    );
  }

  getInvitation(uniqueKey: string): Observable<InvitationForm> {
    return this.http.get<InvitationForm>(
      this.adminApi + '/get-invitation-by-unique-key/' + uniqueKey
    );
  }

  getUserList(): Observable<UserModel[]> {
    return this.http.get<UserModel[]>(
      this.adminApi + '/get-user-list-for-invitations/'
    );
  }

  setAsOpen(form: InvitationForm): Observable<{}> {
    return this.http.post(this.adminApi + '/set-invitation-open', form);
  }

  getInvitations(): Observable<InvitationForm[]> {
    return this.http.get<InvitationForm[]>(this.adminApi + '/get-invitations');
  }

  resendInvitationMail(uniqueKey: string): Observable<boolean> {
    return this.http.get<boolean>(
      this.adminApi + `/resend-invitation-email/${uniqueKey}`
    );
  }

  changeInvitationVisibility(
    uniqueKey: string,
    visibility: boolean
  ): Observable<boolean> {
    return this.http.post<boolean>(
      this.adminApi + `/change-invitation-visibility/`,
      { uniqueKey, visibility }
    );
  }
}
