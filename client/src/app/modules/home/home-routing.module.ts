import { Injectable, NgModule } from '@angular/core';
import { Routes, RouterModule, CanDeactivate } from '@angular/router';
import { GreetingComponent } from './greeting/greeting.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ChooseLanguagesComponent } from './choose-languages/choose-languages.component';
import { environment } from '../../../environments/environment';
import { HomeComponent } from './home.component';
import { GameMenuComponent } from './game-menu/game-menu.component';
import { PrepareAddWordsComponent } from './prepare-add-words/prepare-add-words.component';
import { ProfileComponent } from './profile/profile.component';
import { UserAndGuestAllowService } from '../../core/service/guards/user-and-guest-allow.service';
import { OnlyUserAllowService } from '../../core/service/guards/only-user-allow.service';
import { OnlyNotSignedAllowService } from '../../core/service/guards/only-not-signed-allow.service';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { ActivateUserComponent } from './activate-user/activate-user.component';

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
        path: 'forget-password',
        component: ForgotPasswordComponent,
        canDeactivate: [DeactivateWithDelay],
      },
      {
        path: 'change-password',
        component: ChangePasswordComponent,
        canDeactivate: [DeactivateWithDelay],
      },
      {
        path: 'activate-user/:code',
        component: ActivateUserComponent,
        canDeactivate: [DeactivateWithDelay],
      },
      {
        path: 'choose-languages',
        component: ChooseLanguagesComponent,
        canDeactivate: [DeactivateWithDelay],
      },
      {
        path: 'choose-languages/:mode',
        component: ChooseLanguagesComponent,
        canDeactivate: [DeactivateWithDelay],
        canActivate: [OnlyUserAllowService],
      },
      {
        path: 'game-menu',
        component: GameMenuComponent,
        canDeactivate: [DeactivateWithDelay],
        canActivate: [UserAndGuestAllowService],
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
