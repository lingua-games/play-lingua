import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {
  FaIconLibrary,
  FontAwesomeModule,
} from '@fortawesome/angular-fontawesome';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {
  faArrowCircleLeft,
  faPlus,
  faQuestion,
  faTrash,
  faTrophy,
} from '@fortawesome/free-solid-svg-icons';
import { faEdit } from '@fortawesome/free-regular-svg-icons';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorIntercept } from './core/interceptors/error.interceptor';
import { TokenIntercept } from './core/interceptors/token.interceptor';
import { MessageService } from 'primeng/api';
import { StoreModule } from '@ngrx/store';
import { ScoreNotificationComponent } from './core/component/score-notification/score-notification.component';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { MaterialModule } from './modules/common/material/material.module';
import { PrimengModule } from './modules/common/primeng/primeng.module';
import { faPowerOff } from '@fortawesome/free-solid-svg-icons/faPowerOff';
import { faForward } from '@fortawesome/free-solid-svg-icons/faForward';
import { faGooglePlay } from '@fortawesome/free-brands-svg-icons';

@NgModule({
  declarations: [AppComponent, ScoreNotificationComponent],
  imports: [
    PrimengModule,
    AppRoutingModule,
    FontAwesomeModule,
    HttpClientModule,
    MaterialModule,
    BrowserModule,
    BrowserAnimationsModule,
    StoreModule.forRoot({}, {}),
    StoreDevtoolsModule.instrument({
      name: 'Store dev tools',
      maxAge: 25,
      logOnly: environment.production,
    }),
  ],
  providers: [
    MessageService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenIntercept,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorIntercept,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor(library: FaIconLibrary) {
    library.addIcons(
      faPlus,
      faEdit,
      faTrash,
      faPowerOff,
      faForward,
      faQuestion,
      faGooglePlay,
      faTrophy,
      faArrowCircleLeft
    );
  }
}
