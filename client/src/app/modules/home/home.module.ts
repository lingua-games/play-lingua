import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GreetingComponent } from './greeting/greeting.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ChooseLanguagesComponent } from './choose-languages/choose-languages.component';
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

@NgModule({
  declarations: [
    SelectDefaultLanguageDialogComponent,
    HomeComponent,
    GreetingComponent,
    LoginComponent,
    RegisterComponent,
    ChooseLanguagesComponent,
    GameMenuComponent,
    PrepareAddWordsComponent,
    ProfileComponent,
    CompleteRegistrationComponent,
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    PrimengModule,
    FormsModule,
    MaterialModule,
    DirectiveModule,
    ComponentModule,
    StoreModule.forFeature('notifications', scoreNotificationReducer),
  ],
  providers: [DeactivateWithDelay],
})
export class HomeModule {}
