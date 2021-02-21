import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserModel } from '../models/user.model';
import { Observable, Subject } from 'rxjs';
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
  private storageSub = new Subject<number>();

  constructor(
    private http: HttpClient,
    private router: Router,
    private dialogRef: MatDialog
  ) {}

  setToken(token: string): void {
    localStorage.setItem('lingua-token', token);
  }

  getTotalScore(): Observable<number> {
    return this.storageSub.asObservable();
  }

  setTotalScore(newScore: number): void {
    // TODO: THIS PART SHOULD BE IMPLEMENT AS NGRX INSTEAD OF RXJS
    let totalScore = +localStorage.getItem('lingua-total-score');
    totalScore += newScore;
    totalScore = Math.round(totalScore * 10) / 10;
    localStorage.setItem('lingua-total-score', totalScore.toString());
    this.storageSub.next(totalScore);
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
