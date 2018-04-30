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
import {
  MatSidenavModule, MatListModule, MatChipsModule, MatToolbarModule, MatMenuModule, MatButtonModule,
  MatProgressBarModule, MatProgressSpinnerModule, MatTooltipModule
} from '@angular/material';
import { AppConstants } from './app-constants';
/* */
import { PdfViewerOverlayComponent } from './shared/overlays/file-preview/pdf-viewer-overlay.component';
import { PdfViewerModule } from 'ng2-pdf-viewer';


@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    NavbarComponent,
    FooterComponent,
    NotFoundComponent,
    PdfViewerOverlayComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    //
    MatSidenavModule, MatListModule, MatChipsModule, MatToolbarModule, MatMenuModule, MatButtonModule, MatProgressBarModule,
    MatProgressSpinnerModule, MatTooltipModule,
    AgmCoreModule.forRoot({
      apiKey: AppConstants.GOOGLE_API_KEY,
      libraries: ['places'],
      region: 'CO',
      language: 'ES'
    }),
    PdfViewerModule,
    //
    CoreModule,
    AuthModule,
    HomeModule,
    //
    AppRoutingModule,
  ],
  providers: [
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    PdfViewerOverlayComponent
  ]
})
export class AppModule { }
