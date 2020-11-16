import { Injectable, NgModule } from '@angular/core';
import {
  Routes,
  RouterModule,
  CanDeactivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { GreetingComponent } from './greeting/greeting.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ChooseLanguagesComponent } from './choose-languages/choose-languages.component';
import { environment } from '../../../environments/environment';
import { HomeComponent } from './home.component';
import { GameMenuComponent } from './game-menu/game-menu.component';

export interface CanComponentDeactivate {
  canDeactivate: () => Promise<boolean>;
}

@Injectable()
export class DeactivateWithDelay
  implements CanDeactivate<CanComponentDeactivate> {
  canDeactivate(
    component: CanComponentDeactivate,
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): any {
    return new Promise((resolve) => {
      setTimeout(() => resolve(true), environment.intervalForRoundMainPage / 4);
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
        path: 'choose-languages',
        component: ChooseLanguagesComponent,
        canDeactivate: [DeactivateWithDelay],
      },
      {
        path: 'game-menu',
        component: GameMenuComponent,
        canDeactivate: [DeactivateWithDelay],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
