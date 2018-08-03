import { Injector, Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { AuthService } from '../providers/auth.service';

import { environment } from '@env/environment';

@Injectable()
export class AuthHeadersInterceptor implements HttpInterceptor {

  constructor(private inj: Injector) {

  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let authReq;
    const authService = this.inj.get(AuthService);
    if (authService.token && req.url.includes(environment.API_ENDPOINT)) {
      authReq = req.clone({ setHeaders: { Authorization: authService.token } });
    }
    return next.handle(authReq ? authReq : req);
  }
}
