import { NgModule } from '@angular/core';
import { SharedModule } from '../../app/shared/shared.module';

import { ClientComponent } from './client.component';
import { MapComponent } from './map/map.component';

// import { ClientService } from './client.service';

import { ClientRoutingModule } from './client.routing';
import { ClientService } from './client.service';
import { UsedMaterialComponentsModule } from '@shared/modules/used-material-components.module';
import { WarehouseSearchComponent } from './warehouse-search/warehouse-search.component';

@NgModule({
  imports: [
    SharedModule,
    UsedMaterialComponentsModule,
    ClientRoutingModule,
  ],
  declarations: [
    ClientComponent,
    MapComponent,
    WarehouseSearchComponent
  ],
  providers: [
    ClientService
  ]
})
export class ClientModule { }
