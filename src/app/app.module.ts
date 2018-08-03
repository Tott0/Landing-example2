import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
/** */
import { AppComponent } from './app.component';
/** */
import { CoreModule } from '@app/core/core.module';
import { UsedMaterialComponentsModule } from '@shared/modules/used-material-components.module';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    UsedMaterialComponentsModule,
    BrowserAnimationsModule,
    //
    CoreModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
