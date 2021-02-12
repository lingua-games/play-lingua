import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserModel } from '../models/user.model';
import { Observable } from 'rxjs';
import { LoginResultModel } from '../models/login-result.model';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';
import { NotificationService, Severity } from './notification.service';
import { MatDialog } from '@angular/material/dialog';

@Injectable({
  providedIn: 'root',
})
export class SecurityService {
  authUrl = environment.apiUrl + 'Auth';

  constructor(
    private http: HttpClient,
    private router: Router,
    private dialogRef: MatDialog
  ) {}

  login(user: UserModel): Observable<LoginResultModel> {
    return this.http.post<LoginResultModel>(this.authUrl, user);
  }

  logout(): void {
    localStorage.clear();
    this.router.navigate(['../']);
  }

  logoutOn401(): void {
    this.dialogRef.closeAll();
    localStorage.removeItem('lingua-token');
    localStorage.removeItem('lingua-email');
    localStorage.removeItem('lingua-selected-languages');
    this.router.navigate(['../login']);
  }
}
