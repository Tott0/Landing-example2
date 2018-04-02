import { NgModule } from '@angular/core';
import { SharedModule } from '../../app/shared/shared.module';
/* */
import { WarehouseComponent } from './warehouse.component';
/* */
import { WarehouseRoutingModule } from './warehouse.routing';
import { WarehouseService } from './warehouse.service';

@NgModule({
  imports: [
    SharedModule,
    WarehouseRoutingModule
  ],
  declarations: [
    WarehouseComponent,
  ],
  providers: [
    WarehouseService
  ]
})
export class WarehouseModule { }
