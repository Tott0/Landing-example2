import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { WarehouseComponent } from './warehouse.component';

import { WarehouseResolver } from './warehouse-resolvers.service';


const routes: Routes = [
  {
    path: ':id',
    component: WarehouseComponent,
    resolve: {
      res: WarehouseResolver
    }
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
    WarehouseResolver
  ]
})

export class WarehouseRoutingModule { }
