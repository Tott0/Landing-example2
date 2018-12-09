import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';


import { StaticMethods } from '@core/static-methods';
import { ModalManager } from '@core/providers/modal-manager';
import { environment } from '@env/environment';

import { Warehouse, Parameter, ParameterType, PositionType, Position, MeasureType, WarehouseApi } from '../shared/models/warehouse.model';
import { Ciudad, Departamento } from '../shared/models/shared.model';

@Injectable()
export class OwnerService {

  constructor(
    private http: HttpClient,
    private mm: ModalManager
  ) { }

  getWarehouses(params?): Observable<WarehouseApi> {
    if (!params) {
      params = {
        page: 1,
        per_page: 4
      };
    }
    return this.http.get<WarehouseApi>(`${environment.API_ENDPOINT}warehouses${StaticMethods.getParams(params)}`)
      .pipe(
        catchError((err, caught) => {
          this.mm.closeLoadingDialog();
          StaticMethods.handleHttpResponseError(err);
          return throwError('');
        })
      );
  }

  createWarehouse(warehouse) {
    const formData = new FormData();

    formData.append('name', warehouse.name);
    formData.append('lat', warehouse.lat);
    formData.append('lng', warehouse.lng);
    formData.append('city_id', warehouse.city_id);
    formData.append('address', warehouse.address);
    formData.append('description', warehouse.description);
    formData.append('workingDays', warehouse.workingDays);
    formData.append('workingTime', warehouse.workingTime);

    for (const pa of warehouse.positions_attributes) {
      formData.append('positions_attributes[][type_position]', pa.typePosition);
      formData.append('positions_attributes[][measure]', pa.measure);
      formData.append('positions_attributes[][amount]', pa.amount);
      formData.append('positions_attributes[][width]', pa.width);
      formData.append('positions_attributes[][length]', pa.length);
      formData.append('positions_attributes[][max_height]', pa.max_height);
      formData.append('positions_attributes[][max_weidth]', pa.max_width);
      formData.append('positions_attributes[][refrigerated]', pa.refrigerated);
      formData.append('positions_attributes[][dangerous]', pa.dangerous);
    }

    for (const wpa of warehouse.warehouse_parameters_attributes) {
      formData.append('warehouse_parameters_attributes[][parameter_id]', wpa);
    }

    for (const aa of warehouse.attachment_attributes) {
      formData.append('attachments_attributes[][image]', aa.file as File);
    }

    console.log(formData);
    return this.http.post(`${environment.API_ENDPOINT}warehouses`, formData)
      .pipe(
        catchError((err, caught) => {
          this.mm.closeLoadingDialog();
          return throwError(StaticMethods.handleHttpResponseError(err));
        })
      );
  }
}
