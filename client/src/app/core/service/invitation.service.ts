import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { InvitationForm } from '../models/invitation-form.interface';
import { environment } from '../../../environments/environment';

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
}
