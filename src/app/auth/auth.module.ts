import { NgModule } from '@angular/core';
import { SharedModule } from '../../app/shared/shared.module';

import { AuthComponent } from './auth.component';

import { SignupComponent } from './signup/signup.component';
import { ForgotComponent } from './forgot/forgot.component';
import { RecoverComponent } from './recover/recover.component';

import { AuthRoutingModule } from './auth.routing';

@NgModule({
  imports: [
    SharedModule,
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
