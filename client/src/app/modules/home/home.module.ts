import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GreetingComponent } from './greeting/greeting.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { PrimengModule } from '../common/primeng/primeng.module';
import { FormsModule } from '@angular/forms';
import { DeactivateWithDelay, HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { GameMenuComponent } from './game-menu/game-menu.component';
import { PrepareAddWordsComponent } from './prepare-add-words/prepare-add-words.component';
import { MaterialModule } from '../common/material/material.module';
import { SelectDefaultLanguageDialogComponent } from '../../core/dialogs/select-default-language-dialog/select-default-language-dialog.component';
import { DirectiveModule } from '../../core/directives/directive.module';
import { StoreModule } from '@ngrx/store';
import { scoreNotificationReducer } from '../../core/component/score-notification/state/score-notification.reducer';
import { ProfileComponent } from './profile/profile.component';
import { ComponentModule } from '../../core/component/component.module';
import { CompleteRegistrationComponent } from './complete-registration/complete-registration';
import { RecaptchaModule } from 'ng-recaptcha';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ActivateUserComponent } from './activate-user/activate-user.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { DonateCryptoDialogComponent } from './donate-crypto-dialog/donate-crypto-dialog.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [
    SelectDefaultLanguageDialogComponent,
    HomeComponent,
    GreetingComponent,
    LoginComponent,
    RegisterComponent,
    GameMenuComponent,
    PrepareAddWordsComponent,
    ProfileComponent,
    CompleteRegistrationComponent,
    ResetPasswordComponent,
    ForgotPasswordComponent,
    ActivateUserComponent,
    AboutUsComponent,
    DonateCryptoDialogComponent,
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    PrimengModule,
    FormsModule,
    MaterialModule,
    DirectiveModule,
    ComponentModule,
    RecaptchaModule,
    FontAwesomeModule,
    StoreModule.forFeature('notifications', scoreNotificationReducer),
  ],
  providers: [DeactivateWithDelay],
})
export class HomeModule {}
