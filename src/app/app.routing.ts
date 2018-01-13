import { NgModule } from '@angular/core';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';

import { LandingComponent } from './landing/landing.component';

const appRoutes: Routes = [
  {
    path: 'temproute_client',
    loadChildren: 'app/client/client.module#ClientModule'
  },
  { path: '', component: LandingComponent },
  { path: '**', component: LandingComponent }, // TODO fix this
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
  ]
})

export class AppRoutingModule { }
