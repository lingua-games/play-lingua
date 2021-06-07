import { Component, OnInit } from '@angular/core';
import { SecurityService } from '../../../core/service/security.service';
import { UserModel } from '../../../core/models/user.model';
import { LoginResultModel } from '../../../core/models/login-result.model';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { LoginFormErrors } from '../../../core/models/form-errors.model';
import { DefaultLanguageModel } from '../../../core/models/set-default-language.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  user: UserModel = {} as UserModel;
  errorMessage?: string;
  formError: LoginFormErrors = {} as LoginFormErrors;
  isLoading?: boolean;
  defaultLanguages: DefaultLanguageModel = {} as DefaultLanguageModel;

  constructor(
    private securityService: SecurityService,
    private router: Router,
    private location: Location
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
    this.formError = {} as LoginFormErrors;

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
          this.securityService.storeCredentialsAfterLogin(res);

          const token = this.securityService.getTokenInformation();

          if (token && JSON.parse(token?.needsResetPassword)) {
            this.router.navigate(['../reset-password']).then();
          } else {
            this.router.navigate(['../game-menu']).then();
          }
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
