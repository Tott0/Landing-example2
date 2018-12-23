import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { StaticMethods } from '@core/static-methods';
import { ModalManager } from '@core/providers/modal-manager';
import { environment } from '@env/environment';

import { Warehouse, WarehouseApi } from '@shared/models/warehouse.model';

@Injectable()
export class ClientService {

  constructor(
    private http: HttpClient,
    private mm: ModalManager
  ) { }


  filterWarehouses(params): Observable<WarehouseApi> {
    return this.http.get<WarehouseApi>(`${environment.API_ENDPOINT}warehouses${StaticMethods.getParams(params)}`)
      .pipe(
        catchError((err, caught) => {
          this.mm.closeLoadingDialog();
          return throwError(StaticMethods.handleHttpResponseError(err));
        })
      );
  }
}
