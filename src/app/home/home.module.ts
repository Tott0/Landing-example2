import { NgModule } from '@angular/core';
import { SharedModule } from '../../app/shared/shared.module';

import { HomeComponent } from './home.component';

// import { HomeService } from './home.service';

import { HomeRoutingModule } from './home.routing';

@NgModule({
  imports: [
    SharedModule,
    HomeRoutingModule
  ],
  declarations: [
    HomeComponent,
  ],
  providers: [
  ]
})
export class HomeModule { }
