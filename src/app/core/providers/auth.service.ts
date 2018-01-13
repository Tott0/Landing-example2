import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

import { Auth, User } from '../../auth/auth.model';
import { AppConstants } from '../../app-constants';
import { StaticMethods } from '../../utils/static-methods';

import { Observable } from 'rxjs/Observable';
import { ErrorObservable } from 'rxjs/observable/errorObservable';
import { catchError, tap } from 'rxjs/operators';

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/observable/of';

import { Subject } from 'rxjs/Subject';

import { PersonType } from '../../shared/enums/person-type.enum';
import { ModalManager } from './modal-manager';


@Injectable()
export class AuthService {

  private _token: string;
  private _auth: Auth;
  public fcm_token: string;

  redirectUrl: string;

  get token() {
    return this._token;
  }

  get user() {
    return this._auth ? this._auth.user : undefined;
  }

  get unreadNots() {
    return this._auth ? this._auth.unread_nots : undefined;
  }

  set unreadNots(unreadNots) {
    this._auth.unread_nots = unreadNots;
  }

  loginSbj = new Subject<any>();
  logoutSbj = new Subject<any>();

  constructor(
    private http: HttpClient,
    private mm: ModalManager
  ) { }

  login(user): Observable<Auth> {
    return this.http.post<Auth>(`${AppConstants.API_ENDPOINT}login`, user)
      .pipe(
      catchError((err, caught) => {
        this.mm.closeLoadingDialog();
        return ErrorObservable.create(StaticMethods.handleHttpResponseError(err));
      }),
      tap((res) => {
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

  check(): Promise<any> {
    this._token = sessionStorage.getItem('token');
    return this.http.get<Auth>(`${AppConstants.API_ENDPOINT}check?fcm_token=${this.fcm_token}`)
      .toPromise()
      .then((res) => {
        this._auth = res;
        this.loginSbj.next(res.user);
        return res.user;
      })
      .catch((err) => {
        this._token = undefined;
        this._auth = undefined;
        sessionStorage.removeItem('token');
        return Promise.reject(err);
      });
  }

  logout(params?): Promise<any> {

    this.http.delete(`${AppConstants.API_ENDPOINT}logout`);

    this._token = undefined;
    this._auth = undefined;
    sessionStorage.removeItem('token');
    this.logoutSbj.next();
    return Promise.resolve();
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
