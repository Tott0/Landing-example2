import { NgModule } from '@angular/core';
import { SharedModule } from '../../app/shared/shared.module';

import { ClientComponent } from './client.component';

// import { ClientService } from './client.service';

import { ClientRoutingModule } from './client.routing';
import { StartComponent } from './start/start.component';
import { MapComponent } from './map/map.component';
import { AgmCoreModule } from '@agm/core';

@NgModule({
  imports: [
    SharedModule,
    ClientRoutingModule,
    AgmCoreModule
  ],
  declarations: [
    ClientComponent,
    StartComponent,
    MapComponent
  ],
  providers: [
  ]
})
export class ClientModule { }
