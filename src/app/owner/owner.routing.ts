import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { OwnerComponent } from './owner.component';
import { CreateWarehouseComponent } from './create-warehouse/create-warehouse.component';
import { WarehouseListComponent } from './warehouse-list/warehouse-list.component';

import { WarehouseParametersResolver } from '../client/warehouse-parameters-resolver.service';
import { WarehousesOwnerResolver } from './warehouse-list/warehouses-owner-resolvers.service';


const routes: Routes = [
  {
    path: '',
    component: OwnerComponent,
    // canActivate: [PersonAuthGuard]
    children: [
      {
        path: 'tempproute_warehouses',
        component: WarehouseListComponent,
        resolve: {
          warehouses: WarehousesOwnerResolver,
        }
      },
      {
        path: 'tempproute_warehouses/temproute_create',
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
    WarehousesOwnerResolver,
  ]
})

export class OwnerRoutingModule { }
