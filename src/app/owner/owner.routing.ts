import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { OwnerComponent } from './owner.component';
import { CreateWarehouseComponent } from './create-warehouse/create-warehouse.component';


const routes: Routes = [
  {
    path: '',
    component: OwnerComponent,
    // canActivate: [PersonAuthGuard]
    children: [
      {
        path: '',
        component: CreateWarehouseComponent
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
  ]
})

export class OwnerRoutingModule { }
