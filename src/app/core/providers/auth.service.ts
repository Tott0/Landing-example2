import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

import { Auth } from '../../auth/auth.model';
import { AppConstants } from '@app/app-constants';
import { environment } from '@env/environment';
import { StaticMethods } from '@core/static-methods';

import { Observable, Subject, of, throwError } from 'rxjs';
import { catchError, tap, share, concat, timeoutWith } from 'rxjs/operators';

import { ModalManager } from './modal-manager';
import { User } from '@app/shared/models/user.model';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private isTokenChecked = false;
  private _token: string;
  private _auth: Auth;
  public fcm_token: string;

  redirectUrl: string;

  get token() {
    return this._token;
  }

  get user(): Auth {
    return this._auth ? this._auth : undefined;
  }

  loginSbj = new Subject<any>();
  logoutSbj = new Subject<any>();

  tabSessionSbj = new Subject<any>();
  isTabSessionChecked = false;

  constructor(
    private http: HttpClient,
    private mm: ModalManager,
  ) {
    this.tabSessionSbj.subscribe(() => {
      console.log('this has been checked my man');
      this.isTabSessionChecked = true;
    });
  }

  login(user): Observable<Auth> {
    return this.http.post<Auth>(`${environment.API_ENDPOINT}login`, user)
      .pipe(
        catchError((err, caught) => {
          this.mm.closeLoadingDialog();
          return throwError(StaticMethods.handleHttpResponseError(err));
        }),
        tap((res) => {
          res = new Auth(res);
          this._token = res.token;
          this._auth = res;
          sessionStorage.setItem('token', res.token);
          this.loginSbj.next(res.user);
          return res;
        })
      );
  }

  signup(account): Observable<any> {
    return this.http.post(`${environment.API_ENDPOINT}users`, account)
      .pipe(
        catchError((err, caught) => {
          this.mm.closeLoadingDialog();
          return throwError(StaticMethods.handleHttpResponseError(err));
        })
      );
  }

  createRenter(renter): Observable<any> {
    const formData = new FormData();

    formData.set('matricula_inmobiliaria', renter.matricula_inmobiliaria);
    formData.set('bank_reference', renter.bank_reference.file, renter.bank_reference.name);
    formData.set('certificado_libertad_tradicion', renter.certificado_libertad_tradicion.file, renter.certificado_libertad_tradicion.name);
    formData.set('rut', renter.rut.file, renter.rut.name);

    return this.http.post(`${environment.API_ENDPOINT}renters`, formData)
      .pipe(
        catchError((err, caught) => {
          this.mm.closeLoadingDialog();
          return throwError(StaticMethods.handleHttpResponseError(err));
        })
      );
  }

  check(): Observable<any> {
    // console.log('#check()');
    this._token = sessionStorage.getItem('token');
    if (!this.token) {
      this.mm.closeLoadingDialog();
      return throwError('No token');
    }

    if (this.isTokenChecked) {
      if (this.user) {
        return of(this.user);
      } else {
        this.mm.closeLoadingDialog();
        return throwError('No token');
      }
    }

    return this.http.get<Auth>(`${environment.API_ENDPOINT}check`)
      .pipe(
        share(),
        tap((res) => {
          res = new Auth(res);
          this.isTokenChecked = true;
          this._token = res.token;
          this._auth = res;
          this.loginSbj.next(res);
          this.mm.closeLoadingDialog();
          return res;
        }),
        catchError((err, caught) => {
          this.isTokenChecked = true;
          this._auth = undefined;
          this._token = undefined;
          sessionStorage.removeItem('token');
          this.mm.closeLoadingDialog();
          return throwError(StaticMethods.handleHttpResponseError(err));
        }));
  }

  checkSessionToken() {
    this.mm.showLoadingDialog();
    console.log('asking for check');
    if (this.isTabSessionChecked) {
      return this.check();
    }
    return this.tabSessionSbj.pipe(
      timeoutWith(10000, of(undefined)),
      share(),
      concat(this.check())
    );
  }

  logout(params?): Observable<any> {

    this._token = undefined;
    this._auth = undefined;
    this.redirectUrl = undefined;
    sessionStorage.removeItem('token');
    this.logoutSbj.next();

    return this.http.delete(`${environment.API_ENDPOINT}sessions/logout`);
  }

  forgotPassword(user) {
    return this.http.post(`${environment.API_ENDPOINT}users/recover_password`, user, {
      responseType: 'text',
    })
      .pipe(
        catchError((err, caught) => {
          this.mm.closeLoadingDialog();
          return throwError(StaticMethods.handleHttpResponseError(err));
        })
      );
  }

  recoverPassword(user) {
    return this.http.post(`${environment.API_ENDPOINT}users/update_password`, user)
      .pipe(
        catchError((err, caught) => {
          this.mm.closeLoadingDialog();
          return throwError(StaticMethods.handleHttpResponseError(err));
        })
      );
  }
}
