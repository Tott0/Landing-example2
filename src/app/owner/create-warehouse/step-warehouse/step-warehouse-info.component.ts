import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Component, OnInit, Input, NgZone, ChangeDetectorRef } from '@angular/core';
import { Validators, FormBuilder, FormGroup, AbstractControl } from '@angular/forms';
import { StaticMethods, getTimeBySlot } from '@core/static-methods';
import { DomSanitizer } from '@angular/platform-browser';
import { ModalManager } from '@core/providers/modal-manager';
import { Warehouse } from '@shared/models/warehouse.model';
import { Departamento, Ciudad, GoogleAddress, DocumentFile } from '@shared/models/shared.model';

import { SharedService } from '@core/providers/shared.service';
import { Observable, Subject, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { debounceTime, catchError, switchMap, distinctUntilChanged, startWith, tap } from 'rxjs/operators';
import { Completable } from '../create-warehouse.component';

@Component({
  selector: 'app-step-warehouse-info',
  templateUrl: './step-warehouse-info.component.html',
  styleUrls: ['./step-warehouse-info.component.scss']
})
export class StepWarehouseInfoComponent implements OnInit, Completable {

  @Input() warehouse: Warehouse;
  @Input() parameters: any;

  searchKey = new Subject<any>();

  daysEnabled = true;
  timeEnabled = true;

  sliderOptions = {
    floor: 0,
    ceil: 24 * 4,
    enforceRange: true,
    hideLimitLabels: true,
    hidePointerLabels: true,
    noSwitching: true,
  };
  getTimeBySlot = getTimeBySlot;

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
    private changeDetector: ChangeDetectorRef,
  ) { }

  ngOnInit() {
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

  onFile(files, i) {
    console.log(files);
    switch (i) {
      case 0:
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
        break;
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
    return false;
  }

  sliderChanged() {
    this.changeDetector.detectChanges();
  }

}
