import {
  DeactivateWithDelay,
  WelcomeRoutingModule,
} from './welcome-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WelcomeComponent } from './welcome.component';
import { GreetingComponent } from './greeting/greeting.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ChooseLanguagesComponent } from './choose-languages/choose-languages.component';

@NgModule({
  declarations: [WelcomeComponent, GreetingComponent, LoginComponent, RegisterComponent, ChooseLanguagesComponent],
  imports: [CommonModule, WelcomeRoutingModule],
  providers: [DeactivateWithDelay],
})
export class WelcomeModule {}
