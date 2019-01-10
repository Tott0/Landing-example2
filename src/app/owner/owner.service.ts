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
    //  step basic
    formData.append('name', warehouse.name);
    formData.append('city_id', warehouse.city_id);
    formData.append('address', warehouse.address);
    formData.append('lat', warehouse.lat);
    formData.append('lng', warehouse.lng);
    formData.append('area_size', warehouse.areaSize);
    formData.append('description', warehouse.description);
    formData.append('matricula_inmobiliaria', warehouse.matInmobiliaria);
    formData.append('certificado_libertad_tradicion', warehouse.certificadoLibertadTradicion as File);
    //  step warehouse
    formData.append('working_days', warehouse.workingDays);
    formData.append('service_time', warehouse.serviceTime);
    formData.append('service_end_time', warehouse.serviceEndTime);
    formData.append('dock_time', warehouse.dockTime);
    formData.append('dock_end_time', warehouse.dockEndTime);
    formData.append('same_day_time', warehouse.sameDayTime);
    for (const wp of warehouse.warehouseParameters) {
      formData.append('warehouse_parameters_attributes[][parameter_id]', wp.id);
    }
    for (const aa of warehouse.images) {
      formData.append('attachments_attributes[][image]', aa.file as File);
    }
    // step service
    formData.append('inbound_response_time', warehouse.inboundResponseTime);
    formData.append('outbound_response_time', warehouse.outboundResponseTime);
    formData.append('customer_access', warehouse.customerAccess);
    formData.append('scheduling_window_time', warehouse.schedulingWindowTime);
    formData.append('contact_name', warehouse.contactName);
    formData.append('contact_lastName', warehouse.contactLastName);
    formData.append('contact_phone', warehouse.contactPhone);
    formData.append('contact_email', warehouse.contactEmail);
    for (const ws of warehouse.warehouseServices) {
      formData.append('warehouse_parameters_attributes[][service_id]', ws.id);
      formData.append('warehouse_parameters_attributes[][service_id]', ws.price);
    }
    // step storage
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
