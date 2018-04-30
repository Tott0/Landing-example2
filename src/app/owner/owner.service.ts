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
export class OwnerService {

  departamentos: Departamento[] = [{
    id: 1,
    name: 'Atlántico'
  }];

  ciudades: Ciudad[] = [{
    id: 1,
    name: 'Barranquilla',
    departamento: this.departamentos[0]
  }];

  warehouses: Warehouse[] = [
    {
      name: 'Bodega 1',
      address: 'Calle c Kra 2',
      lat: 11.020699,
      lng: -74.842199,
      city: this.ciudades[0],
      description: 'Bodega al centro de la ciudad',
      images: [
        'https://www.joc.com/sites/default/files/field_feature_image/warehouse%2032.jpg'
      ],

      positions: [
        {
          id: 1,
          type: PositionType.RACK,
          measure: MeasureType.PALLET,
          amount: 500,
          price_per_unit: 10000,
          width: 1,
          length: 1,
          max_height: 1,
          max_weight: 2000
        }
      ],
      parameters: []
    },
    {
      name: 'Bodega 2',
      address: 'Via 40 720',
      lat: 11.01746,
      lng: -74.7952625,
      city: this.ciudades[0],
      description: 'Bodega al centro de la ciudad',
      images: [
        'http://2k7p22nx6oe213gsh48gkhoz-wpengine.netdna-ssl.com/wp-content/uploads/2014/06/bigstock-Industrial-Warehouse-6200839.jpg'
      ],

      positions: [
        {
          id: 2,
          type: PositionType.FLOOR_CLOSED,
          measure: MeasureType.PALLET,
          amount: 700,
          price_per_unit: 10000,
          width: 1,
          length: 1,
          max_height: 1,
          max_weight: 2000
        }
      ],
      parameters: []
    },
    {
      name: 'Bodega 3',
      address: 'Kra 40 Calle C',
      lat: 10.989747,
      lng: -74.774055,
      city: this.ciudades[0],
      description: 'Bodega al centro de la ciudad',
      images: [
        'http://resources.supplychaindigital.com/topic/image/warehouse.jpg'
      ],

      positions: [
        {
          id: 3,
          type: PositionType.FLOOR_OPEN,
          measure: MeasureType.PALLET,
          amount: 500,
          price_per_unit: 10000,
          width: 1,
          length: 1,
          max_height: 1,
          max_weight: 2000
        }
      ],
      parameters: []
    },
    {
      name: 'Bodega 4',
      address: 'Avenida 80 Esquina',
      lat: 10.905396,
      lng: -74.813534,
      city: this.ciudades[0],
      description: 'Bodega al centro de la ciudad',
      images: [
        // tslint:disable-next-line:max-line-length
        'https://media.gettyimages.com/photos/shelves-in-the-warehouse-picture-id478144494?b=1&k=6&m=478144494&s=612x612&w=0&h=cr3cGrzj4vdCMedm3eMX0vSaycumGcZBrRuaCsMoK-w='
      ],

      positions: [
        {
          id: 4,
          type: PositionType.RACK,
          measure: MeasureType.PALLET,
          amount: 100,
          price_per_unit: 10000,
          width: 1,
          length: 1,
          max_height: 1,
          max_weight: 2000
        },
        {
          id: 5,
          type: PositionType.FLOOR_CLOSED,
          measure: MeasureType.PALLET,
          amount: 100,
          price_per_unit: 10000,
          width: 1,
          length: 1,
          max_height: 1,
          max_weight: 2000
        }
      ],
      parameters: []
    },
    {
      name: 'Bodega 5',
      address: 'Calle calle Kra kra',
      lat: 10.9388873,
      lng: -74.767401,
      city: this.ciudades[0],
      description: 'Bodega al centro de la ciudad',
      images: [
        'http://luxreview.com/upload/system/2016/03/07133245.jpg'
      ],

      positions: [
        {
          id: 6,
          type: PositionType.RACK,
          measure: MeasureType.PALLET,
          amount: 500,
          price_per_unit: 10000,
          width: 1,
          length: 1,
          max_height: 1,
          max_weight: 2000
        },
        {
          id: 7,
          type: PositionType.FLOOR_OPEN,
          measure: MeasureType.PALLET,
          amount: 500,
          price_per_unit: 10000,
          width: 1,
          length: 1,
          max_height: 1,
          max_weight: 2000
        },
        {
          id: 8,
          type: PositionType.FLOOR_CLOSED,
          measure: MeasureType.PALLET,
          amount: 500,
          price_per_unit: 10000,
          width: 1,
          length: 1,
          max_height: 1,
          max_weight: 2000
        },
      ],
      parameters: []
    },
  ];

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
    return this.http.get<WarehouseApi>(`${AppConstants.API_ENDPOINT}warehouses${StaticMethods.getParams(params)}`)
      .pipe(
        catchError((err, caught) => {
          this.mm.closeLoadingDialog();
          StaticMethods.handleHttpResponseError(err);
          return ErrorObservable.create('');
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
      formData.append('positions_attributes[]', pa);
    }

    for (const wpa of warehouse.warehouse_parameters_attributes) {
      formData.append('warehouse_parameters_attributes[]', wpa);
    }

    for (const aa of warehouse.attachment_attributes) {
      formData.append('attachment_attributes[]', aa);
    }

    return this.http.post(`${AppConstants.API_ENDPOINT}warehouses`, formData)
      .pipe(
        catchError((err, caught) => {
          this.mm.closeLoadingDialog();
          return ErrorObservable.create(StaticMethods.handleHttpResponseError(err));
        })
      );
  }
}
