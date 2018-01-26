import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { ErrorObservable } from 'rxjs/observable/errorObservable';
import { catchError, tap, map } from 'rxjs/operators';

import { Subject } from 'rxjs/Subject';

import { WareHouse, Parameter, ParameterType } from '../shared/models/warehouse.model';

import { AppConstants } from '../app-constants';
import { StaticMethods } from '../utils/static-methods';
import { ModalManager } from '../core/providers/modal-manager';
import { Ciudad } from '../shared/models/shared.model';

@Injectable()
export class ClientService {

  constructor(
    private http: HttpClient,
    private mm: ModalManager
  ) { }

  ciudades: Ciudad[] = [{
    id: 1,
    name: 'Barranquilla'
  }];

  warehouses: WareHouse[] = [
    {
      name: 'Bodega 1',
      address: 'Calle c Kra 2',
      lat: 11.020699,
      lng: -74.842199,
      city: this.ciudades[0],

      positions: [],
      parameters: []
    },
    {
      name: 'Bodega 2',
      address: 'Via 40 720',
      lat: 11.01746,
      lng: -74.7952625,
      city: this.ciudades[0],

      positions: [],
      parameters: []
    },
    {
      name: 'Bodega 3',
      address: 'Kra 40 Calle C',
      lat: 10.989747,
      lng: -74.774055,
      city: this.ciudades[0],

      positions: [],
      parameters: []
    },
    {
      name: 'Bodega 4',
      address: 'Avenida 80 Esquina',
      lat: 10.905396,
      lng: -74.813534,
      city: this.ciudades[0],

      positions: [],
      parameters: []
    },
    {
      name: 'Bodega 5',
      address: 'Calle calle Kra kra',
      lat: 10.9388873,
      lng: -74.767401,
      city: this.ciudades[0],

      positions: [],
      parameters: []
    },
  ];


  filterWarehouses(params): Observable<WareHouse[]> {
    this.warehouses.filter(wh => {
      if (params.city && wh.city.id !== params.city) {
        return false;
      }

      if (params.amount) {
        let sw = false;
        for (const pos of wh.positions) {
          if (params.amount <= pos.amount) {
            sw = true;
            break;
          }
        }
        if (!sw) { return false; }
      }
    });
    return Observable.of<WareHouse[]>(this.warehouses);

    // return this.http.get<WareHouse[]>(`${AppConstants.API_ENDPOINT}warehouses${StaticMethods.getParams(params)}`, params)
    //   .pipe(
    //   catchError((err, caught) => {
    //     this.mm.closeLoadingDialog();
    //     return ErrorObservable.create(StaticMethods.handleHttpResponseError(err));
    //   })
    //   );
  }
}
