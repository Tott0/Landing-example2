import { Injectable, Injector } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { AuthService } from '../providers/auth.service';
import { environment } from '@env/environment';
import { tap } from 'rxjs/operators';

@Injectable()
export class ValidAuthInterceptor implements HttpInterceptor {

  constructor(
    private inj: Injector) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const aService: AuthService = this.inj.get(AuthService);
    if (aService.token && req.url.includes(environment.API_ENDPOINT) && !req.url.includes('/check')) {
      return next.handle(req)
      .pipe(
        tap((event) => { },
        (err: HttpErrorResponse) => {
          if (err instanceof HttpErrorResponse) {
            if (err.status === 401) {
              aService.logout().subscribe();
              // alert('Sesión Expirada');
            }
          }
          return Observable.throw(event);
        })
      );

    } else {
      return next.handle(req);
    }
  }
}
