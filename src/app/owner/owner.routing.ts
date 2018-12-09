import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { OwnerComponent } from './owner.component';
// import { CreateWarehouseComponent } from './create-warehouse/create-warehouse.component';

import { WarehouseParametersResolver } from '../client/warehouse-parameters-resolver.service';
import { WarehousesOwnerResolver } from './owner-resolvers.service';
// import { DepartamentosResolver } from '../shared/shared-resolvers.service';


const routes: Routes = [
  {
    path: '',
    component: OwnerComponent,
    resolve: {
      res: WarehousesOwnerResolver
    }
  },
  // {
  //   path: 'warehouses/create',
  //   component: CreateWarehouseComponent,
  //   resolve: {
  //     parameters: WarehouseParametersResolver,
  //     departamentos: DepartamentosResolver,
  //   }
  // }
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
    // DepartamentosResolver,
  ]
})

export class OwnerRoutingModule { }
