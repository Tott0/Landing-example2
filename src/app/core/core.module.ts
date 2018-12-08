import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';

import { ValidAuthInterceptor } from './interceptors/valid-auth.interceptor';
import { AuthHeadersInterceptor } from './interceptors/auth-headers.interceptor';

/*Overlays */
import { OverlayModule } from '@angular/cdk/overlay';
import { PdfViewerOverlayService } from '@shared/overlays/file-preview/pdf-viewer-overlay.service';


@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    OverlayModule,
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

    //
    PdfViewerOverlayService,
  ]
})
export class CoreModule {
  constructor (@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error(
        'CoreModule is already loaded. Import it in the AppModule only');
    }
  }
 }
