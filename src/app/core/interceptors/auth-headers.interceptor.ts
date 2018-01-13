import { Injector, Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { AuthService } from '../providers/auth.service';

import { AppConstants } from '../../app-constants';

@Injectable()
export class AuthHeadersInterceptor implements HttpInterceptor {

  constructor(private inj: Injector) {

  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let authReq;
    const authService = this.inj.get(AuthService);
    if (authService.token && req.url.includes(AppConstants.API_ENDPOINT)) {
      authReq = req.clone({ setHeaders: { Authorization: authService.token } });
    }
    return next.handle(authReq ? authReq : req);
  }
}
