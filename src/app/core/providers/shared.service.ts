/// <reference path="../../../../node_modules/@types/googlemaps/index.d.ts" />
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

import { environment } from '@env/environment';
import { StaticMethods } from '@core/static-methods';

import { Observable, Subject, of, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';

import { ModalManager } from './modal-manager';
import { Ciudad, Departamento, GoogleAddress } from '@shared/models/shared.model';
import { ParameterType, Parameter } from '@shared/models/warehouse.model';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  parametersCache: any;

  departamentos: Departamento[] = [];

  ciudades: Ciudad[] = [];

  public scrollToSolutions = new Subject();
  public scrollToNews = new Subject();
  public scrollToProcess = new Subject();

  constructor(
    private http: HttpClient,
    private mm: ModalManager
  ) { }

  getCiudades(dptoId: number, params?): Observable<Ciudad[]> {
    if (this.ciudades && this.ciudades.length) {
      return of<Ciudad[]>(this.ciudades);
    }
    return this.http.get<Ciudad[]>(`${environment.API_ENDPOINT}departments/${dptoId}/cities${StaticMethods.getParams(params)}`)
      .pipe(
        catchError((err, caught) => {
          this.mm.closeLoadingDialog();
          StaticMethods.handleHttpResponseError(err);
          return throwError('');
        })
      );
  }

  getDepartamentos(): Observable<Departamento[]> {
    if (this.departamentos && this.departamentos.length) {
      return of<Departamento[]>(this.departamentos);
    }
    return this.http.get<Departamento[]>(`${environment.API_ENDPOINT}departments`)
      .pipe(
        tap(res => {
          this.departamentos = res;
        }),
        catchError((err, caught) => {
          this.mm.closeLoadingDialog();
          StaticMethods.handleHttpResponseError(err);
          return throwError('');
        })
      );
  }

  getParameters(params?): Observable<any> {
    if (this.parametersCache) {
      return of<any>(this.parametersCache);
    }

    return this.http.get<Parameter[]>(`${environment.API_ENDPOINT}parameters${StaticMethods.getParams(params)}`)
      .pipe(
        map(res => {
          console.log(res);
          const filtered = {
            product: res.filter(p => p.typeParameter === ParameterType.ACCEPTED_PRODUCTS),
            security: res.filter(p => p.typeParameter === ParameterType.SECURITY),
            certifications: res.filter(p => p.typeParameter === ParameterType.CERTIFICATIONS),
            services: res.filter(p => p.typeParameter === ParameterType.EXTRA_SERVICES),
          };
          console.log(filtered);
          return filtered;
        }),
        tap(res => {
          this.parametersCache = res;
        }),
        catchError((err, caught) => {
          this.mm.closeLoadingDialog();
          return throwError(StaticMethods.handleHttpResponseError(err));
        }));
  }

  autocompleteAddress(r: google.maps.places.AutocompletionRequest,
    callback: (res: GoogleAddress[]) => void, currentLocation?) {
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

