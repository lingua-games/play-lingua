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
import { LocalStorageHelper } from '../models/local-storage.enum';

@Injectable({
  providedIn: 'root',
})
export class SecurityService {
  authUrl = environment.apiUrl + 'Auth';
  private storageSub = new Subject<string>();

  constructor(
    private http: HttpClient,
    private router: Router,
    private dialogRef: MatDialog
  ) {}

  setToken(token: string): void {
    localStorage.setItem(LocalStorageHelper.token, token);
  }

  getTotalScore(): Observable<string> {
    return this.storageSub.asObservable();
  }

  setTotalScore(newScore: string): void {
    if (localStorage.getItem(LocalStorageHelper.isGuest)) {
      return;
    }
    if (newScore === '0') {
      this.storageSub.next(localStorage.getItem(LocalStorageHelper.totalScore));
      return;
    }
    // TODO: THIS PART SHOULD BE IMPLEMENT AS NGRX INSTEAD OF RXJS
    let totalScore = +localStorage.getItem(LocalStorageHelper.totalScore);
    totalScore += +newScore;
    totalScore = Math.round(totalScore * 10) / 10;
    localStorage.setItem(LocalStorageHelper.totalScore, totalScore.toString());
    this.storageSub.next(totalScore.toString());
  }

  initialTotalScore(score: string): void {
    localStorage.setItem(LocalStorageHelper.totalScore, score);
    this.storageSub.next(score);
  }

  getTokenInformation(): SecurityTokenInterface {
    if (localStorage.getItem(LocalStorageHelper.token) === 'null') {
      this.logoutOn401();
    }
    if (!localStorage.getItem(LocalStorageHelper.token)) {
      return {} as SecurityTokenInterface;
    }
    return jwt_decode(
      localStorage.getItem(LocalStorageHelper.token)
    ) as SecurityTokenInterface;
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem(LocalStorageHelper.token);
  }

  isGuest(): boolean {
    return !!localStorage.getItem(LocalStorageHelper.isGuest);
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
    localStorage.removeItem(LocalStorageHelper.token);
    localStorage.removeItem(LocalStorageHelper.email);
    localStorage.removeItem(LocalStorageHelper.selectedLanguages);
    this.router.navigate(['../login']).then();
  }
}
