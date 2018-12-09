import { NgModule } from '@angular/core';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';

import { LandingComponent } from './landing/landing.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { HomeComponent } from './home/home.component';
import { AuthComponent } from './auth/auth.component';
import { SignupComponent } from './auth/signup/signup.component';
import { ForgotComponent } from './auth/forgot/forgot.component';

import { LoginAuthGuard } from '@core/providers/auth-guard.service';

const appRoutes: Routes = [
  {
    path: 'temproute_client',
    loadChildren: 'app/client/client.module#ClientModule',
    // canActivate: [
    //   LoginAuthGuard,
    // ],
  },
  {
    path: 'temproute_owner',
    loadChildren: 'app/owner/owner.module#OwnerModule',
    // canActivate: [
    //   LoginAuthGuard,
    // ],
  },
  // {
  //   path: 'temproute_warehouse',
  //   loadChildren: 'app/warehouse/warehouse.module#WarehouseModule',
  //   // canActivate: [
  //   //   LoginAuthGuard,
  //   // ],
  // },
  // {
  //   path: 'temproute_admin',
  //   loadChildren: 'app/admin/admin.module#AdminModule',
  //   // canActivate: [
  //   //   LoginAuthGuard,
  //   // ],
  // },
  { path: 'login', component: AuthComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'forgot', component: ForgotComponent },
  { path: '', component: HomeComponent },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes,
      {
        enableTracing: false,
        preloadingStrategy: PreloadAllModules
      }),
  ],
  exports: [
    RouterModule
  ],
  providers: [
    LoginAuthGuard,
  ]
})

export class AppRoutingModule { }
