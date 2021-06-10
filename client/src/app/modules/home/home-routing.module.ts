import { Injectable, NgModule } from '@angular/core';
import { Routes, RouterModule, CanDeactivate } from '@angular/router';
import { GreetingComponent } from './greeting/greeting.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { environment } from '../../../environments/environment';
import { HomeComponent } from './home.component';
import { GameMenuComponent } from './game-menu/game-menu.component';
import { PrepareAddWordsComponent } from './prepare-add-words/prepare-add-words.component';
import { ProfileComponent } from './profile/profile.component';
import { UserAndGuestAllowService } from '../../core/service/guards/user-and-guest-allow.service';
import { OnlyUserAllowService } from '../../core/service/guards/only-user-allow.service';
import { OnlyNotSignedAllowService } from '../../core/service/guards/only-not-signed-allow.service';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ActivateUserComponent } from './activate-user/activate-user.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { HasResetPasswordTokenService } from '../../core/service/guards/has-reset-password-token.service';
import { AboutUsComponent } from './about-us/about-us.component';

export interface CanComponentDeactivate {
  canDeactivate: () => Promise<boolean>;
}

@Injectable()
export class DeactivateWithDelay
  implements CanDeactivate<CanComponentDeactivate>
{
  canDeactivate(): Promise<true> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(true);
      }, environment.intervalForRoundMainPage / 4);
    });
  }
}

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: '',
        component: GreetingComponent,
        canDeactivate: [DeactivateWithDelay],
        canActivate: [OnlyNotSignedAllowService],
      },
      {
        path: 'profile',
        component: ProfileComponent,
        canDeactivate: [DeactivateWithDelay],
        canActivate: [OnlyUserAllowService],
      },
      {
        path: 'login',
        component: LoginComponent,
        canDeactivate: [DeactivateWithDelay],
      },
      {
        path: 'register',
        component: RegisterComponent,
        canDeactivate: [DeactivateWithDelay],
      },
      {
        path: 'forgot-password',
        component: ForgotPasswordComponent,
        canDeactivate: [DeactivateWithDelay],
      },
      {
        path: 'reset-password',
        component: ResetPasswordComponent,
        canActivate: [HasResetPasswordTokenService],
        canDeactivate: [DeactivateWithDelay],
      },
      {
        path: 'activate-user/:code',
        component: ActivateUserComponent,
        canDeactivate: [DeactivateWithDelay],
      },
      {
        path: 'game-menu',
        component: GameMenuComponent,
        canDeactivate: [DeactivateWithDelay],
        canActivate: [UserAndGuestAllowService],
      },
      {
        path: 'about-us',
        component: AboutUsComponent,
        canDeactivate: [DeactivateWithDelay],
      },
      {
        path: 'prepare-adding-words',
        component: PrepareAddWordsComponent,
        canDeactivate: [DeactivateWithDelay],
        canActivate: [OnlyUserAllowService],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
