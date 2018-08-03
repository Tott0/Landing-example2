import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

import { Auth } from '../../auth/auth.model';
import { AppConstants } from '../../app-constants';
import { StaticMethods } from '../../utils/static-methods';

import { Observable } from 'rxjs/Observable';
import { ErrorObservable } from 'rxjs/observable/errorObservable';
import { catchError, tap, share, timeout, concat, timeoutWith, zip } from 'rxjs/operators';

import 'rxjs/add/observable/of';

import { Subject } from 'rxjs/Subject';

import { ModalManager } from './modal-manager';


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
    return this.http.post<Auth>(`${AppConstants.API_ENDPOINT}login`, user)
      .pipe(
        catchError((err, caught) => {
          this.mm.closeLoadingDialog();
          return ErrorObservable.create(StaticMethods.handleHttpResponseError(err));
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
    return this.http.post(`${AppConstants.API_ENDPOINT}users`, account)
      .pipe(
        catchError((err, caught) => {
          this.mm.closeLoadingDialog();
          return ErrorObservable.create(StaticMethods.handleHttpResponseError(err));
        })
      );
  }

  createRenter(renter): Observable<any> {
    const formData = new FormData();

    formData.set('matricula_inmobiliaria', renter.matricula_inmobiliaria);
    formData.set('bank_reference', renter.bank_reference.file, renter.bank_reference.name);
    formData.set('certificado_libertad_tradicion', renter.certificado_libertad_tradicion.file, renter.certificado_libertad_tradicion.name);
    formData.set('rut', renter.rut.file, renter.rut.name);

    return this.http.post(`${AppConstants.API_ENDPOINT}renters`, formData)
      .pipe(
        catchError((err, caught) => {
          this.mm.closeLoadingDialog();
          return ErrorObservable.create(StaticMethods.handleHttpResponseError(err));
        })
      );
  }

  check(): Observable<any> {
    // console.log('#check()');
    this._token = sessionStorage.getItem('token');
    if (!this.token) {
      this.mm.closeLoadingDialog();
      return ErrorObservable.create('No token');
    }

    if (this.isTokenChecked) {
      if (this.user) {
        return Observable.of(this.user);
      } else {
        this.mm.closeLoadingDialog();
        return ErrorObservable.create('No token');
      }
    }

    return this.http.get<Auth>(`${AppConstants.API_ENDPOINT}check`)
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
          return ErrorObservable.create(StaticMethods.handleHttpResponseError(err));
        }));
  }

  checkSessionToken() {
    this.mm.showLoadingDialog();
    console.log('asking for check');
    if (this.isTabSessionChecked) {
      return this.check();
    }
    return this.tabSessionSbj.pipe(
      timeoutWith(10000, Observable.of(undefined)),
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

    return this.http.delete(`${AppConstants.API_ENDPOINT}sessions/logout`);
  }

  forgotPassword(user) {
    return this.http.post(`${AppConstants.API_ENDPOINT}users/recover_password`, user, {
      responseType: 'text',
    })
      .pipe(
        catchError((err, caught) => {
          this.mm.closeLoadingDialog();
          return ErrorObservable.create(StaticMethods.handleHttpResponseError(err));
        })
      );
  }

  recoverPassword(user) {
    return this.http.post(`${AppConstants.API_ENDPOINT}users/update_password`, user)
      .pipe(
        catchError((err, caught) => {
          this.mm.closeLoadingDialog();
          return ErrorObservable.create(StaticMethods.handleHttpResponseError(err));
        })
      );
  }
}
