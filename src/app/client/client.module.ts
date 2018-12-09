import { NgModule } from '@angular/core';
import { SharedModule } from '../../app/shared/shared.module';

import { ClientComponent } from './client.component';

// import { ClientService } from './client.service';

import { ClientRoutingModule } from './client.routing';
import { ClientService } from './client.service';
import { UsedMaterialComponentsModule } from '@shared/modules/used-material-components.module';

@NgModule({
  imports: [
    SharedModule,
    UsedMaterialComponentsModule,
    ClientRoutingModule,
  ],
  declarations: [
    ClientComponent,
  ],
  providers: [
    ClientService
  ]
})
export class ClientModule { }
