import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { OwnerComponent } from './owner.component';
import { CreateWarehouseComponent } from './create-warehouse/create-warehouse.component';
import { WarehouseParametersResolver } from '../client/warehouse-parameters-resolver.service';


const routes: Routes = [
  {
    path: '',
    component: OwnerComponent,
    // canActivate: [PersonAuthGuard]
    children: [
      {
        path: '',
        component: CreateWarehouseComponent,
        resolve: {
          parameters: WarehouseParametersResolver,
        }
      }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ],
  providers: [
    WarehouseParametersResolver,
  ]
})

export class OwnerRoutingModule { }
