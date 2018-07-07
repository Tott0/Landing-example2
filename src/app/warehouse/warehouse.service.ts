import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { ErrorObservable } from 'rxjs/observable/errorObservable';
import { catchError, tap, map } from 'rxjs/operators';

import { Subject } from 'rxjs/Subject';

import { Warehouse, Parameter, ParameterType, PositionType, Position, MeasureType, WarehouseApi } from '../shared/models/warehouse.model';

import { AppConstants } from '../app-constants';
import { StaticMethods } from '../utils/static-methods';
import { ModalManager } from '../core/providers/modal-manager';
import { Ciudad, Departamento } from '../shared/models/shared.model';

@Injectable()
export class WarehouseService {

  constructor(
    private http: HttpClient,
    private mm: ModalManager
  ) { }

  getWarehouse(warehouseId, params?): Observable<Warehouse> {
    return this.http.get<Warehouse>(`${AppConstants.API_ENDPOINT}warehouses/${warehouseId}${StaticMethods.getParams(params)}`)
      .pipe(
        map(res => new Warehouse(res)),
        catchError((err, caught) => {
          this.mm.closeLoadingDialog();
          StaticMethods.handleHttpResponseError(err);
          return ErrorObservable.create('');
        })
      );
  }
}
