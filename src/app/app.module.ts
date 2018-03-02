import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

/* App Root */
import { AppComponent } from './app.component';
import { LandingComponent } from './landing/landing.component';
import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';
import { NotFoundComponent } from './not-found/not-found.component';

/* Feature Modules */
import { CoreModule } from './core/core.module';
import { AuthModule } from './auth/auth.module';
import { HomeModule } from './home/home.module';

/* Routing Module */
import { AppRoutingModule } from './app.routing';
/* */
import { AgmCoreModule } from '@agm/core';
import { MatSidenavModule, MatListModule, MatChipsModule, MatToolbarModule } from '@angular/material';
import { AppConstants } from './app-constants';


@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    NavbarComponent,
    FooterComponent,
    NotFoundComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    //
    MatSidenavModule, MatListModule, MatChipsModule, MatToolbarModule,
    AgmCoreModule.forRoot({
      apiKey: AppConstants.GOOGLE_API_KEY
    }),
    //
    CoreModule,
    AuthModule,
    HomeModule,
    //
    AppRoutingModule,
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
