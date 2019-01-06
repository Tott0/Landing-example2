import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ClientComponent } from './client.component';
import { WarehouseFilterResolver } from './warehouse-filter-resolver.service';
import { WarehouseParametersResolver, WarehouseServiceParametersResolver } from './warehouse-parameters-resolver.service';

// import { LoginAuthGuard, PersonAuthGuard } from '../core/providers/auth-guard.service';

// import { CaseDetailResolver } from './case-detail/case-detail-resolver.service';
// import { MultaCodesResolver } from '@shared/shared-resolvers.service';


import { MapComponent } from './map/map.component';


const routes: Routes = [
  {
    path: '',
    component: ClientComponent,
    // canActivate: [PersonAuthGuard]
    children: [
    ]
  },
  {
    path: 'temproute_map',
    component: MapComponent,
    resolve: {
      warehouses: WarehouseFilterResolver,
      services: WarehouseServiceParametersResolver,
      parameters: WarehouseParametersResolver,
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
    WarehouseFilterResolver,
    WarehouseParametersResolver,
    WarehouseServiceParametersResolver,
  ]
})

export class ClientRoutingModule { }
