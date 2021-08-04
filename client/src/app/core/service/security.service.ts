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
import { DefaultLanguageModel } from '../models/set-default-language.model';
import { LanguageModel } from '../models/language.model';

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
    if (!this.isLoggedIn().success) {
      return;
    }
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
    if (!this.isLoggedIn().success) {
      return;
    }
    this.localStorageService.save(LocalStorageHelper.totalScore, score);
    this.storageSub.next(score);
  }

  getTokenInformation(): SecurityTokenInterface | undefined {
    try {
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
    } catch {
      this.localStorageService.clear();
      this.logout();
      return {} as SecurityTokenInterface;
    }
  }

  isLoggedIn(): { success: boolean; route: string } {
    const token = this.getTokenInformation();
    if (!token?.email) {
      return { success: false, route: './login' };
    }

    if (token.needsResetPassword && JSON.parse(token.needsResetPassword)) {
      return { success: false, route: '../reset-password' };
    }

    return { success: true, route: '' };
  }

  isAdmin(): boolean {
    const token = this.getTokenInformation();
    if (token && token.isAdmin) {
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

  storeCredentialsAfterLogin(loginResult: LoginResultModel): void {
    this.setToken(loginResult.token);
    this.localStorageService.save(
      LocalStorageHelper.totalScore,
      loginResult?.user?.totalScore.toString()
    );

    const defaultLanguages: DefaultLanguageModel = {} as DefaultLanguageModel;
    defaultLanguages.defaultBaseLanguage =
      loginResult.user?.defaultBaseLanguage || ({} as LanguageModel);
    defaultLanguages.defaultTargetLanguage =
      loginResult.user?.defaultTargetLanguage || ({} as LanguageModel);

    this.localStorageService.delete(LocalStorageHelper.isGuest);
    this.localStorageService.save(
      LocalStorageHelper.defaultLanguages,
      JSON.stringify(defaultLanguages)
    );
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
      this.router.navigate(['../login']).then();
    } catch (e) {}
  }
}
