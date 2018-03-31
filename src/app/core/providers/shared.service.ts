import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

import { AppConstants } from '../../app-constants';
import { StaticMethods } from '../../utils/static-methods';

import { Observable } from 'rxjs/Observable';
import { ErrorObservable } from 'rxjs/observable/errorObservable';
import { catchError, tap, map } from 'rxjs/operators';

import { Subject } from 'rxjs/Subject';

import { ModalManager } from './modal-manager';
import { Ciudad, Departamento, GoogleAddress } from '../../shared/models/shared.model';
import { ParameterType, Parameter } from '../../shared/models/warehouse.model';
import { MapsAPILoader } from '@agm/core';

import {} from '@types/googlemaps';


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

  departamentos: Departamento[] = [{
    id: 1,
    name: 'Atlántico'
  }];

  ciudades: Ciudad[] = [{
    id: 1,
    name: 'Barranquilla',
    departamento: this.departamentos[0]
  }];

  constructor(
    private http: HttpClient,
    private mm: ModalManager
  ) { }

  getCiudades(dptoId: number, params?): Observable<Ciudad[]> {
    return this.http.get<Ciudad>(`${AppConstants.API_ENDPOINT}departments/${dptoId}/cities${StaticMethods.getParams(params)}`)
      .pipe(
        catchError((err, caught) => {
          this.mm.closeLoadingDialog();
          StaticMethods.handleHttpResponseError(err);
          return ErrorObservable.create('');
        })
      );
  }

  getDepartamentos(): Observable<Departamento[]> {
    return this.http.get<Departamento>(`${AppConstants.API_ENDPOINT}departments`)
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

  autocompleteAddress(r: google.maps.places.AutocompletionRequest, callback: (res: GoogleAddress[]) => void, currentLocation?) {
    // tslint:disable-next-line:max-line-length
    const s = new google.maps.places.AutocompleteService();
    console.log(r);
    s.getPlacePredictions(r, (res, status) => {
      console.log(res);
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        const cleanPredictions: GoogleAddress[] = [];
        for (const p of res) {
          const t = new GoogleAddress();
          t.address = p.description;
          t.place_id = p.place_id;
          cleanPredictions.push(t);
        }
        callback(cleanPredictions);
      } else {
        callback([]);
      }
    });
  }


  getAddress(placeId, callback: (res: GoogleAddress) => void) {
    const s = new google.maps.Geocoder();
    const r: google.maps.GeocoderRequest = {
      placeId: placeId
    };
    s.geocode(r, (res, status) => {
      const gr = res[0];
      console.log(gr);
      if (status === google.maps.GeocoderStatus.OK) {
        callback({
          address: gr.formatted_address,
          lat: gr.geometry.location.lat(),
          lng: gr.geometry.location.lng(),
          place_id: placeId,
        } as GoogleAddress);
      } else {
        callback(undefined);
      }
    });
  }
}

