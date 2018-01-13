import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ClientComponent } from './client.component';
import { StartComponent } from './start/start.component';
import { MapComponent } from './map/map.component';

// import { LoginAuthGuard, PersonAuthGuard } from '../core/providers/auth-guard.service';

// import { CaseDetailResolver } from './case-detail/case-detail-resolver.service';
// import { MultaCodesResolver } from '../shared/shared-resolvers.service';


const caseRoutes: Routes = [
  {
    path: '',
    component: ClientComponent,
    // canActivate: [PersonAuthGuard]
    children: [
      {
        path: '',
        component: StartComponent
      },
      {
        path: 'temproute_map',
        component: MapComponent
      }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(caseRoutes)
  ],
  exports: [
    RouterModule
  ],
  providers: [
    // CaseDetailResolver,
    // MultaCodesResolver,
    // LoginAuthGuard,
    // PersonAuthGuard
  ]
})

export class ClientRoutingModule { }
