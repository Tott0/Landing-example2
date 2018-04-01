import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { ErrorObservable } from 'rxjs/observable/errorObservable';
import { catchError, tap, map } from 'rxjs/operators';

import { Subject } from 'rxjs/Subject';

import { Warehouse, Parameter, ParameterType, PositionType, Position, MeasureType } from '../shared/models/warehouse.model';

import { AppConstants } from '../app-constants';
import { StaticMethods } from '../utils/static-methods';
import { ModalManager } from '../core/providers/modal-manager';
import { Ciudad, Departamento } from '../shared/models/shared.model';

@Injectable()
export class ClientService {

  constructor(
    private http: HttpClient,
    private mm: ModalManager
  ) { }

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


  filterWarehouses(params): Observable<Warehouse[]> {
    return Observable.of<Warehouse[]>(
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
          if (!params.prm.every(p => (wh.parameters).some(p2 => p2.id === +p))) {
            console.log('out4');
            return false;
          }
        }

        return true;
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
