import { Component, OnInit, Input, NgZone } from '@angular/core';
import { StaticMethods, getErrorMessage } from '@core/static-methods';
import { ModalManager } from '@core/providers/modal-manager';
import { Warehouse } from '@shared/models/warehouse.model';
import { Departamento, Ciudad, GoogleAddress, DocumentFile, CiudadApi } from '@shared/models/shared.model';

import { SharedService } from '@core/providers/shared.service';
import { Observable, Subject, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { debounceTime, catchError, switchMap, distinctUntilChanged, startWith, tap } from 'rxjs/operators';
import { Completable } from '../create-warehouse.component';

@Component({
  selector: 'app-step-basic-info',
  templateUrl: './step-basic-info.component.html',
  styleUrls: ['./step-basic-info.component.scss']
})
export class StepBasicInfoComponent implements OnInit, Completable {

  @Input() warehouse: Warehouse;
  @Input() departamentos: Departamento[];

  // ciudades: Ciudad[] = [];
  // searchKey = new Subject<any>();

  cityValueChanged = new Subject<any>();
  filteredCities: Observable<Ciudad[]>;

  getErrorMessage = getErrorMessage;
  errors: any = {};

  // selectedDepartamento: Departamento;

  // filteredAddresses: Observable<GoogleAddress[]>;

  addressEnabled = false;
  addrValueChanged = new Subject();
  filteredAddresses: GoogleAddress[] = [];
  currentAddress = new GoogleAddress();

  mapLat: number;
  mapLng: number;
  mapZoom: number;


  constructor(
    private sService: SharedService,
    private mm: ModalManager,
    private ngZone: NgZone,
    private sharedService: SharedService,
  ) { }

  ngOnInit() {
    this.filteredCities = this.cityValueChanged
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        switchMap(value => {
          return value ? this.sharedService.searchCities({
            name: value
          }) : of({
            cities: [],
            total_count: 0
          });
        }),
        map((res: CiudadApi) => {
          console.log('cities', res);
          return res.cities.slice(0, 5);
        }),
        catchError(err => {
          return of([{
            id: 1,
            name: 'Barranquilla',
            department: {
              id: 1,
              name: 'Atlantico'
            }
          }]);
        })
      );

    this.addrValueChanged
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
      )
      .subscribe((addr: google.maps.places.AutocompletionRequest) => {
        if (!addr) {
          this.filteredAddresses = [];
          return;
        }
        this.sService.autocompleteAddress(addr, (addrs) => {
          this.ngZone.run(() => {
            this.filteredAddresses = addrs;
          });
        });
      });
  }

  cityDisplayFn(city?: Ciudad): string | undefined {
    return city ? city.name : undefined;
  }

  mcDisplayFn(mc: GoogleAddress) {
    return mc ? mc.address : mc;
  }

  onFile(files, i) {
    console.log(files);
    switch (i) {
      case 1:
        this.warehouse.certificadoLibertadTradicion = {
          file: files,
          name: files.name,
          url: URL.createObjectURL(files)
        };
        break;

    }
  }

  isComplete() {
    return true;
  }

  // departamentoChanged(ev) {
  //   console.log(ev);
  //   this.warehouse.city = undefined;
  //   this.ciudades = [];
  //   this.searchKey.next(ev);
  // }

  ciudadChanged(ev: Ciudad) {
    console.log(ev);
    this.filteredAddresses = [];
    this.warehouse.address = undefined;
    this.warehouse.lat = undefined;
    this.warehouse.lng = undefined;
    this.currentAddress = new GoogleAddress();
    this.addressEnabled = false;

    if (!ev) {
      return;
    }

    this.mm.showLoadingDialog();
    this.sService.autocompleteAddress({
      input: this.warehouse.city.name,
      componentRestrictions: {
        country: 'co'
      }
    } as google.maps.places.AutocompletionRequest, (addrs => {
      this.sService.getAddress(addrs[0].place_id, (res) => {
        console.log('getAddress', res);
        this.ngZone.run(() => {

          this.mm.closeLoadingDialog();

          this.mapLat = res.lat;
          this.mapLng = res.lng;
          this.warehouse.lat = res.lat;
          this.warehouse.lng = res.lng;

          this.mapZoom = 13;

          this.addressEnabled = true;
        });
        // setTimeout(() => {
        // });
      });
    }));
  }

  addressChanged(ev) {
    console.log(ev);
    // this.filteredAddresses = [];
    if (!ev) {
      return;
    }
    const r: google.maps.places.AutocompletionRequest = {
      input: ev,
      location: new google.maps.LatLng(this.mapLat, this.mapLng),
      radius: 16000,
      componentRestrictions: {
        country: 'co'
      }
    };
    this.addrValueChanged.next(r);
  }

  addressSelected(event) {
    console.log(event);
    this.filteredAddresses = [];
    this.mm.showLoadingDialog();
    this.sService.getAddress(event, (addr) => {
      setTimeout(() => {
        this.mm.closeLoadingDialog();
      });
      console.log(addr);
      if (addr) {
        this.warehouse.address = addr.address;
        this.warehouse.lat = addr.lat;
        this.warehouse.lng = addr.lng;
        this.mapLat = addr.lat;
        this.mapLng = addr.lng;
      } else {
        this.warehouse.address = undefined;
        this.warehouse.lat = undefined;
        this.warehouse.lng = undefined;
        this.currentAddress = new GoogleAddress();
      }
    });

  }

  markerDragEnded(ev) {
    console.log(ev);
    this.warehouse.lat = ev.coords.lat;
    this.warehouse.lng = ev.coords.lng;
  }

}
