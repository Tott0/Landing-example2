import { NgModule } from '@angular/core';
import { SharedModule } from '../../app/shared/shared.module';
/* */
import { OwnerComponent } from './owner.component';
import { CreateWarehouseComponent } from './create-warehouse/create-warehouse.component';
import { StepBasicInfoComponent } from './create-warehouse/step-basic-info/step-basic-info.component';
import { StepStorageComponent } from './create-warehouse/step-storage/step-storage.component';
/* */
import { OwnerRoutingModule } from './owner.routing';
import { OwnerService } from './owner.service';
import { UsedMaterialComponentsModule } from '@shared/modules/used-material-components.module';
import { StepServicesComponent } from './create-warehouse/step-services/step-services.component';
import { StepWarehouseInfoComponent } from './create-warehouse/step-warehouse/step-warehouse-info.component';

@NgModule({
  imports: [
    SharedModule,
    UsedMaterialComponentsModule,
    OwnerRoutingModule
  ],
  declarations: [
    OwnerComponent,
    CreateWarehouseComponent,
    StepBasicInfoComponent,
    StepWarehouseInfoComponent,
    StepServicesComponent,
    StepStorageComponent,
  ],
  providers: [
    OwnerService
  ]
})
export class OwnerModule { }
