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
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class SecurityService {
  authUrl = environment.apiUrl + 'Auth';
  public storageSub = new Subject<string>();

  constructor(
    private http: HttpClient,
    private router: Router,
    private dialogRef: MatDialog,
    private localStorageService: LocalStorageService
  ) {}

  setToken(token: string | undefined): void {
    this.localStorageService.save(LocalStorageHelper.token, token);
  }

  getTotalScore(): Observable<string> {
    return this.storageSub.asObservable();
  }

  setTotalScore(newScore: string): void {
    if (this.localStorageService.load(LocalStorageHelper.isGuest)) {
      return;
    }
    if (newScore === '0') {
      this.storageSub.next(
        this.localStorageService.load(LocalStorageHelper.totalScore)
      );
      return;
    }
    // TODO: THIS PART SHOULD BE IMPLEMENT AS NGRX INSTEAD OF RXJS
    let totalScore = +this.localStorageService.load(
      LocalStorageHelper.totalScore
    );
    totalScore += +newScore;
    totalScore = Math.round(totalScore * 10) / 10;
    this.localStorageService.save(
      LocalStorageHelper.totalScore,
      totalScore.toString()
    );
    this.storageSub.next(totalScore.toString());
  }

  initialTotalScore(score: string): void {
    this.localStorageService.save(LocalStorageHelper.totalScore, score);
    this.storageSub.next(score);
  }

  getTokenInformation(): SecurityTokenInterface | undefined {
    if (this.localStorageService.load(LocalStorageHelper.token) === 'null') {
      this.logoutOn401();
      return;
    }
    if (!this.localStorageService.load(LocalStorageHelper.token)) {
      return {} as SecurityTokenInterface;
    }
    return jwt_decode(
      this.localStorageService.load(LocalStorageHelper.token)
    ) as SecurityTokenInterface;
  }

  isLoggedIn(): boolean {
    return !!this.localStorageService.load(LocalStorageHelper.token);
  }

  isAdmin(): boolean {
    const token = this.getTokenInformation();
    if (token) {
      return JSON.parse(token.isAdmin);
    }
    return false;
  }

  isGuest(): boolean {
    return !!this.localStorageService.load(LocalStorageHelper.isGuest);
  }

  login(user: UserModel): Observable<LoginResultModel> {
    return this.http.post<LoginResultModel>(this.authUrl, user);
  }

  logout(): void {
    try {
      this.localStorageService.clear();
      this.router.navigate(['../']).then();
    } catch (error) {}
  }

  logoutOn401(): void {
    try {
      this.dialogRef.closeAll();
      this.localStorageService.delete(LocalStorageHelper.token);
      this.localStorageService.delete(LocalStorageHelper.email);
      this.localStorageService.delete(LocalStorageHelper.selectedLanguages);
      this.router.navigate(['../login']).then();
    } catch (e) {}
  }
}
