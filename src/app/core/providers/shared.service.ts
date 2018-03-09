import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

import { AppConstants } from '../../app-constants';
import { StaticMethods } from '../../utils/static-methods';

import { Observable } from 'rxjs/Observable';
import { ErrorObservable } from 'rxjs/observable/errorObservable';
import { catchError, tap, map } from 'rxjs/operators';

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';

import { Subject } from 'rxjs/Subject';

import { ModalManager } from './modal-manager';
import { Ciudad } from '../../shared/models/shared.model';
import { ParameterType, Parameter } from '../../shared/models/warehouse.model';


@Injectable()
export class SharedService {

  productParams: Parameter[] = [
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
  ];

  securityParams: Parameter[] = [
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
  ];

  certificationsParams: Parameter[] = [
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
  ];

  servicesParams: Parameter[] = [
    {
      id: 18,
      description: 'Etiquetado',
      type: ParameterType.EXTRA_SERVICES
    },
    {
      id: 19,
      description: 'Re-empaque',
      type: ParameterType.EXTRA_SERVICES
    },
    {
      id: 20,
      description: 'Transporte',
      type: ParameterType.EXTRA_SERVICES
    },
    {
      id: 21,
      description: 'Cross Docking',
      type: ParameterType.EXTRA_SERVICES
    },
    {
      id: 22,
      description: 'Embalaje',
      type: ParameterType.EXTRA_SERVICES
    },
  ];

  parametersCache: any;

  constructor(
    private http: HttpClient,
    private mm: ModalManager
  ) { }

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

  getParameters(params?): Observable<any> {
    if (this.parametersCache) {
      return Observable.of<any>(this.parametersCache);
    }
    let parameters: Parameter[] = this.productParams;
    parameters = parameters.concat(this.securityParams);
    parameters = parameters.concat(this.certificationsParams);
    parameters = parameters.concat(this.servicesParams);
    return Observable.of<any>(parameters).pipe(
      map(res => {
        return {
          product: this.productParams,
          security: this.securityParams,
          certifications: this.certificationsParams,
          services: this.servicesParams,
        };
      })
    );

    // return this.http.get<Warehouse[]>(`${AppConstants.API_ENDPOINT}warehouses${StaticMethods.getParams(params)}`, params)
    //   .pipe(
    //   catchError((err, caught) => {
    //     this.mm.closeLoadingDialog();
    //     return ErrorObservable.create(StaticMethods.handleHttpResponseError(err));
    //   })
    //   );
  }
}

