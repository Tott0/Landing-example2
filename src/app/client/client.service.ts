import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { ErrorObservable } from 'rxjs/observable/errorObservable';
import { catchError, tap, map } from 'rxjs/operators';

import { Subject } from 'rxjs/Subject';

import { WareHouse, Parameter, ParameterType, PositionType, Position } from '../shared/models/warehouse.model';

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

      positions: [
        {
          id: 1,
          type: PositionType.RACK,
          amount: 500,
          width: 1,
          length: 1,
          height: 1,
          max_weight: 2000
        }
      ],
      parameters: [4, 5, 6, 7, 8, 11]
    },
    {
      name: 'Bodega 2',
      address: 'Via 40 720',
      lat: 11.01746,
      lng: -74.7952625,
      city: this.ciudades[0],

      positions: [
        {
          id: 2,
          type: PositionType.FLOOR_CLOSED,
          amount: 700,
          width: 1,
          length: 1,
          height: 1,
          max_weight: 2000
        }
      ],
      parameters: [1, 2, 3, 11, 12, 15]
    },
    {
      name: 'Bodega 3',
      address: 'Kra 40 Calle C',
      lat: 10.989747,
      lng: -74.774055,
      city: this.ciudades[0],

      positions: [
        {
          id: 3,
          type: PositionType.FLOOR_OPEN,
          amount: 500,
          width: 1,
          length: 1,
          height: 1,
          max_weight: 2000
        }
      ],
      parameters: [1, 2, 3]
    },
    {
      name: 'Bodega 4',
      address: 'Avenida 80 Esquina',
      lat: 10.905396,
      lng: -74.813534,
      city: this.ciudades[0],

      positions: [
        {
          id: 4,
          type: PositionType.RACK,
          amount: 100,
          width: 1,
          length: 1,
          height: 1,
          max_weight: 2000
        },
        {
          id: 5,
          type: PositionType.FLOOR_CLOSED,
          amount: 100,
          width: 1,
          length: 1,
          height: 1,
          max_weight: 2000
        }
      ],
      parameters: [4, 6, 9, 10, 13]
    },
    {
      name: 'Bodega 5',
      address: 'Calle calle Kra kra',
      lat: 10.9388873,
      lng: -74.767401,
      city: this.ciudades[0],

      positions: [
        {
          id: 6,
          type: PositionType.RACK,
          amount: 500,
          width: 1,
          length: 1,
          height: 1,
          max_weight: 2000
        },
        {
          id: 7,
          type: PositionType.FLOOR_OPEN,
          amount: 500,
          width: 1,
          length: 1,
          height: 1,
          max_weight: 2000
        },
        {
          id: 8,
          type: PositionType.FLOOR_CLOSED,
          amount: 500,
          width: 1,
          length: 1,
          height: 1,
          max_weight: 2000
        },
      ],
      parameters: [4, 6, 9, 10, 13, 18, 19, 22]
    },
  ];


  filterWarehouses(params): Observable<WareHouse[]> {
    return Observable.of<WareHouse[]>(
      this.warehouses.filter(wh => {
        console.log('--- wh ---');
        if (params.cd && wh.city.id !== +params.cd) {
          return false;
        }

        if (params.up) {
          console.log(+params.up);
          const amm = wh.positions.reduce((prev, curr) => {
            return {amount: prev.amount + curr.amount} as Position;
          }).amount;
          console.log(amm);
          if (amm < +params.up) {
            console.log('out');
           return false;
          }
        }

        console.log('asd');
        if (params.str) {
          if (+params.str[0]) {
            if (!wh.positions.some(w => w.type === PositionType.RACK)) {
              console.log('out1');
              return false;
            }
          }
          if (+params.str[1]) {
            if (!wh.positions.some(w => w.type === PositionType.FLOOR_CLOSED)) {
              console.log('out2');
              return false;
            }
          }
          if (+params.str[2]) {
            if (!wh.positions.some(w => w.type === PositionType.FLOOR_OPEN)) {
              console.log('out3');
              return false;
            }
          }
        }

        if (params.prm && params.prm.length) {
          if (!params.prm.every(p => (wh.parameters as number[]).includes(+p))) {
            console.log('out4');
            return false;
          }
        }

        return true;
      })
    );

    // return this.http.get<WareHouse[]>(`${AppConstants.API_ENDPOINT}warehouses${StaticMethods.getParams(params)}`, params)
    //   .pipe(
    //   catchError((err, caught) => {
    //     this.mm.closeLoadingDialog();
    //     return ErrorObservable.create(StaticMethods.handleHttpResponseError(err));
    //   })
    //   );
  }
}
