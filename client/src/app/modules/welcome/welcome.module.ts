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
import { PrimengModule } from '../common/primeng/primeng.module';
import { FormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { LoadingDirective } from '../../core/directives/loading.directive';
import { NotificationService } from '../../core/service/notification.service';

@NgModule({
  declarations: [
    WelcomeComponent,
    GreetingComponent,
    LoginComponent,
    RegisterComponent,
    ChooseLanguagesComponent,
    LoadingDirective,
  ],
  imports: [CommonModule, WelcomeRoutingModule, PrimengModule, FormsModule],
  providers: [DeactivateWithDelay],
})
export class WelcomeModule {}
