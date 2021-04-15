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
}
