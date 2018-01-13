import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

import { AppConstants } from '../../app-constants';
import { StaticMethods } from '../../utils/static-methods';

import { MultaCode, PicoYPlacaDia, Ciudad } from '../../shared/shared.model';

import { Observable } from 'rxjs/Observable';
import { ErrorObservable } from 'rxjs/observable/errorObservable';
import { catchError } from 'rxjs/operators';

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';

import { Subject } from 'rxjs/Subject';

import { ModalManager } from './modal-manager';


@Injectable()
export class SharedService {

  constructor(
    private http: HttpClient,
    private mm: ModalManager
  ) { }

  getMultaCodes(): Observable<MultaCode[]> {
    return this.http.get<MultaCode[]>(`${AppConstants.API_ENDPOINT}code_value_multas`)
      .pipe(
      catchError((err, caught) => {
        this.mm.closeLoadingDialog();
        StaticMethods.handleHttpResponseError(err);
        return ErrorObservable.create('');
      })
      );
  }

  getPicoYPlacaMes(params): Observable<PicoYPlacaDia[]> {
    return this.http.get<PicoYPlacaDia[]>(`${AppConstants.API_ENDPOINT}pico_placa${StaticMethods.getParams(params)}`)
      .pipe(
      catchError((err, caught) => {
        this.mm.closeLoadingDialog();
        StaticMethods.handleHttpResponseError(err);
        return ErrorObservable.create('');
      }))
      .map(res => {
        const year = params.year;
        const month = params.month - 1;
        let ppMes: PicoYPlacaDia[] = new Array(42).fill(undefined).map(d => {
          return {} as PicoYPlacaDia;
        });
        const firstDay = new Date(year, month, 1).getDay();
        const lastDay = firstDay - 1 + new Date(year, month + 1, 0).getDate();

        ppMes = ppMes.map((pp, index) => {
          return index >= firstDay && index <= lastDay ? {
            date: new Date(year, month, index - firstDay + 1),
            intervals: []
          } : undefined;
        });

        while (res.days.length) {
          const d = res.days[0].date.split('-');
          res.days[0].date = new Date(d[0], d[1] - 1, d[2]);
          ppMes[firstDay - 1 + res.days[0].date.getDate()] = res.days.shift();
        }
        return ppMes.slice(0, 42);
      });
  }

  getCiudades(): Observable<Ciudad[]> {
    return this.http.get<Ciudad>(`${AppConstants.API_ENDPOINT}cities`)
      .pipe(
      catchError((err, caught) => {
        this.mm.closeLoadingDialog();
        StaticMethods.handleHttpResponseError(err);
        return ErrorObservable.create('');
      })
      );
  }
}

