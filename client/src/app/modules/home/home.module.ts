import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GreetingComponent } from './greeting/greeting.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ChooseLanguagesComponent } from './choose-languages/choose-languages.component';
import { PrimengModule } from '../common/primeng/primeng.module';
import { FormsModule } from '@angular/forms';
import { LoadingDirective } from '../../core/directives/loading.directive';
import { DeactivateWithDelay, HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';

@NgModule({
  declarations: [
    HomeComponent,
    GreetingComponent,
    LoginComponent,
    RegisterComponent,
    ChooseLanguagesComponent,
    LoadingDirective,
  ],
  imports: [CommonModule, HomeRoutingModule, PrimengModule, FormsModule],
  providers: [DeactivateWithDelay],
})
export class HomeModule {}
