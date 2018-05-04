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
        {url: 'https://www.joc.com/sites/default/files/field_feature_image/warehouse%2032.jpg'}
      ],
      workingDays: [true, false, true, true, false, false, true],
      positions: [
        {
          id: 1,
          type: PositionType.RACK,
          amount: 500,
          price_per_unit: 10000,
          width: 1,
          length: 1,
          max_height: 1,
          max_weight: 2000,
          refrigerated: true,
          dangerous: true,
        },
        {
          id: 2,
          type: PositionType.FLOOR_CLOSED,
          amount: 500,
          price_per_unit: 10000,
          width: 1,
          length: 1,
          max_height: 1,
          max_weight: 2000,
          refrigerated: true,
        },
        {
          id: 3,
          type: PositionType.FLOOR_OPEN,
          amount: 500,
          price_per_unit: 10000,
          width: 1,
          length: 1,
          max_height: 1,
          max_weight: 2000,
          dangerous: true,
        },
        {
          id: 4,
          type: PositionType.BOX,
          amount: 500,
          price_per_unit: 10000,
          width: 1,
          length: 1,
          max_height: 1,
          max_weight: 2000,
        }
      ],
      parameters: [
        {
          id: 8,
          description: 'Vigilancia Privada',
          type: ParameterType.SECURITY
        },
        {
          id: 9,
          description: 'Circuito cerrado de televisón',
          type: ParameterType.SECURITY
        },
        {
          id: 10,
          description: 'Alarma de seguridad',
          type: ParameterType.SECURITY
        },
        {
          id: 11,
          description: 'BASC',
          type: ParameterType.CERTIFICATIONS
        },
        {
          id: 12,
          description: 'ISO9001',
          type: ParameterType.CERTIFICATIONS
        },
        {
          id: 13,
          description: 'Zona Franca',
          type: ParameterType.CERTIFICATIONS
        },
        {
          id: 14,
          description: 'Depósito Aduanero',
          type: ParameterType.CERTIFICATIONS
        },
        {
          id: 15,
          description: 'ISO14001',
          type: ParameterType.CERTIFICATIONS
        },
        {
          id: 16,
          description: 'ISO18001',
          type: ParameterType.CERTIFICATIONS
        },
        {
          id: 17,
          description: 'ISO28000',
          type: ParameterType.CERTIFICATIONS
        },
        {
          id: 1, // food,
          description: 'Alimentos',
          type: ParameterType.ACCEPTED_PRODUCTS
        },
        {
          id: 2, // organic,
          description: 'Materiales Orgánicos',
          type: ParameterType.ACCEPTED_PRODUCTS
        },
        {
          id: 3, // frozen,
          description: 'Productos Congelados',
          type: ParameterType.ACCEPTED_PRODUCTS
        },
        {
          id: 4, // metal,
          description: 'Metales',
          type: ParameterType.ACCEPTED_PRODUCTS
        },
        {
          id: 5, // health,
          description: 'Farmaceúticos, salud y químicos',
          type: ParameterType.ACCEPTED_PRODUCTS
        },
        {
          id: 6, // building,
          description: 'Productos de Construcción',
          type: ParameterType.ACCEPTED_PRODUCTS
        },
        {
          id: 7, // dangerous,
          description: 'Materiales Peligrosos',
          type: ParameterType.ACCEPTED_PRODUCTS
        },
      ]
    },
  ];

  constructor(
    private http: HttpClient,
    private mm: ModalManager
  ) { }

  getWarehouse(warehouseId, params?): Observable<Warehouse> {
    return Observable.of<Warehouse>(this.warehouses[0])
    // return this.http.get<WarehouseApi>(`${AppConstants.API_ENDPOINT}warehouses/${warehouseId}${StaticMethods.getParams(params)}`)
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
