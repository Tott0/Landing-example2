import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';

import { SharedService } from './providers/shared.service';
import { AuthService } from './providers/auth.service';
import { ModalManager } from './providers/modal-manager';

import { ValidAuthInterceptor } from './interceptors/valid-auth.interceptor';
import { AuthHeadersInterceptor } from './interceptors/auth-headers.interceptor';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    //
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ValidAuthInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthHeadersInterceptor,
      multi: true
    },
    //
    SharedService,
    AuthService,
    ModalManager,
    //
  ]
})
export class CoreModule { }
