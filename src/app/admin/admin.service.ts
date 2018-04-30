import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { ErrorObservable } from 'rxjs/observable/errorObservable';
import { catchError, tap, map } from 'rxjs/operators';

import { Subject } from 'rxjs/Subject';

import { AppConstants } from '@app/app-constants';
import { StaticMethods } from '@app/utils/static-methods';
import { ModalManager } from '@core/providers/modal-manager';

import { RenterApi, Renter } from '@app/shared/models/renter.model';



@Injectable()
export class AdminService {

  constructor(
    private http: HttpClient,
    private mm: ModalManager
  ) { }

  getRenters(params?): Observable<RenterApi> {
    if (!params) {
      params = {
        page: 1,
        per_page: 10
      };
    }
    return this.http.get<RenterApi>(`${AppConstants.API_ENDPOINT}renters${StaticMethods.getParams(params)}`)
      .pipe(
        catchError((err, caught) => {
          this.mm.closeLoadingDialog();
          StaticMethods.handleHttpResponseError(err);
          return ErrorObservable.create('');
        })
      );
  }

  acceptRenter(renterId): Observable<Renter>{
    return this.http.put<Renter>(`${AppConstants.API_ENDPOINT}renters/${renterId}/active`, undefined)
    .pipe(
      catchError((err, caught) => {
        this.mm.closeLoadingDialog();
        return ErrorObservable.create(StaticMethods.handleHttpResponseError(err));
      })
    );
  }

  rejectRenter(renterId): Observable<Renter>{
    return this.http.put<Renter>(`${AppConstants.API_ENDPOINT}renters/${renterId}/reject`, undefined)
    .pipe(
      catchError((err, caught) => {
        this.mm.closeLoadingDialog();
        return ErrorObservable.create(StaticMethods.handleHttpResponseError(err));
      })
    );
  }

}
