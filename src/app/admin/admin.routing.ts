import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdminComponent } from './admin.component';

import { RentersComponent } from '@app/admin/renters/renters.component';
import { RentersResolver } from '@app/admin/admin-resolver.service';

import { LoginAuthGuard, AdminAuthGuard } from '../core/providers/auth-guard.service';


const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
  },
  {
    path: 'solicitudes-arriendo',
    component: RentersComponent,
    resolve: {
      renters: RentersResolver
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
    LoginAuthGuard,
    AdminAuthGuard,
    RentersResolver
  ]
})

export class AdminRoutingModule { }
