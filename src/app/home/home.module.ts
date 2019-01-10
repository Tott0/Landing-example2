import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { UsedMaterialComponentsModule } from '@shared/modules/used-material-components.module';

import { HomeComponent } from './home.component';

import { HomeRoutingModule } from './home.routing';

@NgModule({
  imports: [
    SharedModule,
    UsedMaterialComponentsModule,
    HomeRoutingModule
  ],
  declarations: [
    HomeComponent,
  ],
  providers: [
  ]
})
export class HomeModule { }
