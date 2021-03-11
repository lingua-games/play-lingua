import { Component, OnInit } from '@angular/core';
import { SecurityService } from '../../../core/service/security.service';
import { UserModel } from '../../../core/models/user.model';
import { LoginResultModel } from '../../../core/models/login-result.model';
import { Router } from '@angular/router';
import { LocalStorageHelper } from '../../../core/models/local-storage.enum';
import { Location } from '@angular/common';
import { LocalStorageService } from '../../../core/service/local-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  user: UserModel = new UserModel();
  errorMessage: string;
  formError = {};
  isLoading: boolean;

  constructor(
    private securityService: SecurityService,
    private router: Router,
    private location: Location,
    private localStorageService: LocalStorageService
  ) {}

  ngOnInit(): void {
    if (this.securityService.isLoggedIn()) {
      this.router.navigate(['game-menu']).then();
    }
  }

  back(): void {
    this.location.back();
  }

  login(): void {
    if (!this.user.email) {
      this.formError['email'] = 'Email field is empty';
      return;
    }

    if (!this.user.password) {
      this.formError['password'] = 'Password field is empty';
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';
    this.securityService.login(this.user).subscribe(
      (res: LoginResultModel) => {
        if (res.isLogin) {
          this.securityService.setToken(res.token);
          this.localStorageService.save(
            LocalStorageHelper.totalScore,
            res.user.totalScore.toString()
          );
          const defaultBaseLanguageFromAPI = JSON.parse(
            res.user.baseLanguages
          ).find((x) => x.id === res.user.defaultBaseLanguage);
          const defaultTargetLanguageFromAPI = JSON.parse(
            res.user.targetLanguages
          ).find((x) => x.id === res.user.defaultTargetLanguage);

          this.localStorageService.delete(LocalStorageHelper.isGuest);
          this.localStorageService.save(
            LocalStorageHelper.defaultLanguages,
            JSON.stringify({
              defaultBaseLanguage: defaultBaseLanguageFromAPI,
              defaultTargetLanguage: defaultTargetLanguageFromAPI,
            })
          );
          if (res.user.isSelectedLanguages) {
            this.localStorageService.save(
              LocalStorageHelper.selectedLanguages,
              `{ "base": ${res.user.baseLanguages}, "target": ${res.user.targetLanguages} }`
            );
          }
          this.router.navigate(['../game-menu']).then();
        } else {
          this.errorMessage = res.message;
        }
        this.isLoading = false;
      },
      () => {
        this.isLoading = false;
      }
    );
  }
}
