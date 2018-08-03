import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
/** */
import { AgmCoreModule } from '@agm/core';
/** */
import { AppComponent } from './app.component';
import { NotFoundComponent } from '@app/not-found/not-found.component';
import { NavbarComponent } from '@app/navbar/navbar.component';
import { FooterComponent } from '@app/footer/footer.component';
//
import { AuthModule } from '@app/auth/auth.module';
import { HomeModule } from '@app/home/home.module';
/** */
import { environment } from '@env/environment';
import { CoreModule } from '@app/core/core.module';
import { AppRoutingModule } from '@app/app.routing';
import { UsedMaterialComponentsModule } from '@shared/modules/used-material-components.module';


@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent,
    NavbarComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    UsedMaterialComponentsModule,
    BrowserAnimationsModule,
    //
    AgmCoreModule.forRoot({
      apiKey: environment.GOOGLE_API_KEY,
      libraries: ['places'],
      region: 'CO',
      language: 'ES'
    }),
    //
    CoreModule,
    AuthModule,
    HomeModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
