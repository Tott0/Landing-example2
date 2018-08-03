import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { UsedMaterialComponentsModule } from '@shared/modules/used-material-components.module';

import { AuthComponent } from './auth.component';

import { SignupComponent } from './signup/signup.component';
import { ForgotComponent } from './forgot/forgot.component';
import { RecoverComponent } from './recover/recover.component';

import { AuthRoutingModule } from './auth.routing';

@NgModule({
  imports: [
    SharedModule,
    UsedMaterialComponentsModule,
    AuthRoutingModule
  ],
  declarations: [
    AuthComponent,
    SignupComponent,
    ForgotComponent,
    RecoverComponent
  ]
})
export class AuthModule { }
