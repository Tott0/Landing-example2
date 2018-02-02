import { NgModule } from '@angular/core';
import { SharedModule } from '../../app/shared/shared.module';
/* */
import { OwnerComponent } from './owner.component';
import { CreateWarehouseComponent } from './create-warehouse/create-warehouse.component';
/* */
import { OwnerRoutingModule } from './owner.routing';
import { OwnerService } from './owner.service';
import { StepBasicInfoComponent } from './create-warehouse/step-basic-info/step-basic-info.component';
import { StepAvailabilityComponent } from './create-warehouse/step-availability/step-availability.component';
import { StepStorageComponent } from './create-warehouse/step-storage/step-storage.component';

@NgModule({
  imports: [
    SharedModule,
    OwnerRoutingModule
  ],
  declarations: [
    OwnerComponent,
    CreateWarehouseComponent,
    StepBasicInfoComponent,
    StepStorageComponent,
    StepAvailabilityComponent,
  ],
  providers: [
    OwnerService
  ]
})
export class OwnerModule { }
