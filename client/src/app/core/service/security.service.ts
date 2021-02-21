import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserModel } from '../models/user.model';
import { Observable } from 'rxjs';
import { LoginResultModel } from '../models/login-result.model';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';
import jwt_decode from 'jwt-decode';
import { MatDialog } from '@angular/material/dialog';
import { SecurityTokenInterface } from '../models/security-token.interface';

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

  setToken(token: string): void {
    localStorage.setItem('lingua-token', token);
  }

  getTotalScore(): string {
    return localStorage.getItem('lingua-total-score');
  }

  getTokenInformation(): SecurityTokenInterface {
    if (!localStorage.getItem('lingua-token')) {
      return {} as SecurityTokenInterface;
    }
    return jwt_decode(
      localStorage.getItem('lingua-token')
    ) as SecurityTokenInterface;
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('lingua-token');
  }

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
    this.router.navigate(['../login']).then();
  }
}
