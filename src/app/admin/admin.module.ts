import { NgModule } from '@angular/core';
import { SharedModule } from '../../app/shared/shared.module';

import { AdminComponent } from './admin.component';

// import { AdminService } from './admin.service';

import { AdminRoutingModule } from './admin.routing';
import { AdminService } from './admin.service';

@NgModule({
  imports: [
    SharedModule,
    AdminRoutingModule,
  ],
  declarations: [
    AdminComponent,
  ],
  providers: [
    AdminService
  ]
})
export class AdminModule { }
