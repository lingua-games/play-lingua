import { Component, OnInit } from '@angular/core';
import { SecurityService } from '../../../core/service/security.service';
import { UserModel } from '../../../core/models/user.model';
import { LoginResultModel } from '../../../core/models/login-result.model';
import { Router } from '@angular/router';
import { LanguageModel } from '../../../core/models/language.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  user: UserModel = new UserModel();
  errorMessage: string;
  formError: any = {};
  isLoading: boolean;

  constructor(
    private securityService: SecurityService,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (localStorage.getItem('lingua-token')) {
      this.router.navigate(['game-menu']);
    }
  }

  login(): void {
    if (!this.user.email) {
      this.formError.email = 'Email field is empty';
      return;
    }

    if (!this.user.password) {
      this.formError.password = 'Password field is empty';
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';
    this.securityService.login(this.user).subscribe(
      (res: LoginResultModel) => {
        if (res.isLogin) {
          localStorage.setItem('lingua-token', res.token);
          localStorage.setItem(
            'lingua-total-score',
            res.user.totalScore.toString()
          );
          const defaultBaseLanguageFromAPI = JSON.parse(
            res.user.baseLanguages
          ).find((x) => x.id === res.user.defaultBaseLanguage);
          const defaultTargetLanguageFromAPI = JSON.parse(
            res.user.targetLanguages
          ).find((x) => x.id === res.user.defaultTargetLanguage);

          localStorage.setItem(
            'lingua-default-languages',
            JSON.stringify({
              defaultBaseLanguage: defaultBaseLanguageFromAPI,
              defaultTargetLanguage: defaultTargetLanguageFromAPI,
            })
          );
          if (res.user.isSelectedLanguages) {
            localStorage.setItem(
              'lingua-selected-languages',
              `{ "base": ${res.user.baseLanguages}, "target": ${res.user.targetLanguages} }`
            );
          }
          this.router.navigate(['../game-menu']);
        } else {
          this.errorMessage = res.message;
        }
        this.isLoading = false;
      },
      (error: string) => {
        this.isLoading = false;
      }
    );
  }
}
