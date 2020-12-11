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
import { GameMenuComponent } from './game-menu/game-menu.component';
import { PrepareAddWordsComponent } from './prepare-add-words/prepare-add-words.component';
import { MaterialModule } from '../common/material/material.module';
import { SelectDefaultLanguageDialogComponent } from '../../core/dialogs/select-default-language-dialog/select-default-language-dialog.component';

@NgModule({
  declarations: [
    SelectDefaultLanguageDialogComponent,
    HomeComponent,
    GreetingComponent,
    LoginComponent,
    RegisterComponent,
    ChooseLanguagesComponent,
    GameMenuComponent,
    LoadingDirective,
    PrepareAddWordsComponent,
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    PrimengModule,
    FormsModule,
    MaterialModule,
  ],
  providers: [DeactivateWithDelay],
  exports: [LoadingDirective],
})
export class HomeModule {}
