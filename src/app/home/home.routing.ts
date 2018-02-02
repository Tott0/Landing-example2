import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home.component';

// import { LoginAuthGuard, PersonAuthGuard } from '../core/providers/auth-guard.service';

// import { CaseDetailResolver } from './case-detail/case-detail-resolver.service';
// import { MultaCodesResolver } from '../shared/shared-resolvers.service';


const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    // canActivate: [PersonAuthGuard]
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
    // CaseDetailResolver,
    // MultaCodesResolver,
    // LoginAuthGuard,
    // PersonAuthGuard
  ]
})

export class HomeRoutingModule { }
