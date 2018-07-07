import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Component, OnInit, Input, NgZone } from '@angular/core';
import { Validators, FormBuilder, FormGroup, AbstractControl } from '@angular/forms';
import { StaticMethods } from '../../../utils/static-methods';
import { DomSanitizer } from '@angular/platform-browser';
import { ModalManager } from '../../../core/providers/modal-manager';
import { Warehouse } from '../../../shared/models/warehouse.model';
import { Departamento, Ciudad, GoogleAddress } from '../../../shared/models/shared.model';

import { SharedService } from '../../../core/providers/shared.service';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { debounceTime, catchError, switchMap, distinctUntilChanged, startWith, tap } from 'rxjs/operators';
import { map } from 'rxjs/operator/map';

@Component({
  selector: 'app-step-basic-info',
  templateUrl: './step-basic-info.component.html',
  styleUrls: ['./step-basic-info.component.scss']
})
export class StepBasicInfoComponent implements OnInit {

  @Input() warehouse: Warehouse;
  @Input() departamentos: Departamento[];

  ciudades: Ciudad[] = [];
  searchKey = new Subject<any>();

  daysEnabled = true;
  timeEnabled = true;

  errors: any = {};

  selectedDepartamento: Departamento;

  // filteredAddresses: Observable<GoogleAddress[]>;
  filteredAddresses: GoogleAddress[] = [];
  addrSubj = new Subject();
  currentAddress = new GoogleAddress();
  mapLat: number;
  mapLng: number;
  mapZoom: number;


  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private domSanitizer: DomSanitizer,
    private sService: SharedService,
    private mm: ModalManager,
    private ngZone: NgZone,
  ) { }

  ngOnInit() {
    this.searchKey
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        switchMap(dptoId => {
          this.mm.showLoadingDialog();
          return dptoId ? this.sService.getCiudades(dptoId) : Observable.of<Ciudad[]>([]);
        }),
        catchError(err => {
          console.error(err);
          return Observable.of<Ciudad[]>([]);
        })
      )
      .subscribe((ciudades) => {
        console.log(ciudades);
        this.ciudades = ciudades;
        this.mm.closeLoadingDialog();
      });

    this.addrSubj
      .pipe(
        debounceTime(300),
      // switchMap((addr) => {
      //   return addr ? this.sService.autocompleteAddress(addr, new Subject<any>()) : Observable.of([]);
      // }),
      // map(val => this.filter(val))
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

  mcDisplayFn(mc: GoogleAddress) {
    return mc ? mc.address : mc;
  }

  onSubmit() {
    // this.mm.showLoadingDialog();
  }

  getErrorMessage(formControl: AbstractControl, error) {
    if (error && error.length) {
      return error[0];
    } else {
      return StaticMethods.getFormError(formControl);
    }
  }

  dayModeChaged(ev) {
    console.log(this.warehouse.workingDays);
    switch (+ev) {
      case 1:
        this.daysEnabled = true;
        break;
      case 2:
        this.warehouse.workingDays = Array(7).fill(true);
        this.daysEnabled = false;
        break;
    }
    console.log(this.warehouse.workingDays);

  }
  timeModeChanged(ev) {
    switch (+ev) {
      case 1:
        this.timeEnabled = true;
        break;
      case 2:
        this.warehouse.workingTime = ['00', 'am', '00', 'am', '00', '00'];
        this.timeEnabled = false;
        break;
    }
  }

  onFile(files) {
    console.log(files);
    if (this.warehouse.images.length + files.length > 5) {
      this.errors.photos = 'Solo se pueden seleccionar máximo 5 archivos';
    } else {
      for (let f of files) {
        f = {
          file: f,
          url: URL.createObjectURL(f),
        };
        this.warehouse.images = this.warehouse.images.concat(f);
      }
    }
    console.log(this.warehouse.images);
  }

  isComplete() {
    // if (!this.warehouse ||
    //   !this.warehouse.name ||
    //   !this.warehouse.address ||
    //   !this.warehouse.city ||
    //   !this.warehouse.workingDays.some(wd => wd) ||
    //   !this.photos.length
    // ) {
    //   return false;
    // }
    return true;
  }

  departamentoChanged(ev) {
    console.log(ev);
    this.warehouse.city = undefined;
    this.ciudades = [];
    this.searchKey.next(ev);
  }

  ciudadChanged(ev: Ciudad) {
    console.log(ev);
    this.filteredAddresses = [];
    this.warehouse.address = undefined;
    this.warehouse.lat = undefined;
    this.warehouse.lng = undefined;
    this.currentAddress = new GoogleAddress();
    this.mm.showLoadingDialog();
    this.sService.autocompleteAddress({
      input: ev.name,
      componentRestrictions: {
        country: 'co'
      }
    } as google.maps.places.AutocompletionRequest, (addrs => {
      this.sService.getAddress(addrs[0].place_id, (res) => {
        this.mm.closeLoadingDialog();
        this.mapLat = res.lat;
        this.mapLng = res.lng;
        this.mapZoom = 13;
      });
    }));
  }

  addressChanged(ev) {
    console.log(ev);
    this.filteredAddresses = [];
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
    this.addrSubj.next(r);
  }

  addressSelected(event) {
    console.log(event);
    this.filteredAddresses = [];
    this.mm.showLoadingDialog();
    this.sService.getAddress(event, (addr) => {
      this.mm.closeLoadingDialog();
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

}
