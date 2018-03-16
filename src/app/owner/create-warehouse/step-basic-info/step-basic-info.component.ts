import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Component, OnInit, Input } from '@angular/core';
import { Validators, FormBuilder, FormGroup, AbstractControl } from '@angular/forms';
import { StaticMethods } from '../../../utils/static-methods';
import { DomSanitizer } from '@angular/platform-browser';
import { ModalManager } from '../../../core/providers/modal-manager';
import { Warehouse } from '../../../shared/models/warehouse.model';
import { Departamento, Ciudad } from '../../../shared/models/shared.model';

import { SharedService } from '../../../core/providers/shared.service';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { debounceTime, catchError, switchMap, distinctUntilChanged } from 'rxjs/operators';

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

  photos: any[] = [];
  errors: any = {};

  selectedDepartamento: Departamento;
  selectedCiudad: Ciudad;


  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private domSanitizer: DomSanitizer,
    private sService: SharedService,
    private mm: ModalManager,
  ) { }

  ngOnInit() {
    this.searchKey
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        switchMap(cityId => {
          this.mm.showLoadingDialog();
          return cityId ? this.sService.getCiudades({
            city_id: cityId
          }) : Observable.of<Ciudad[]>([]);
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
    if (this.photos.length + files.length > 5) {
      this.errors.photos = 'Solo se pueden seleccionar máximo 5 archivos';
    } else {
      for (let f of files) {
        f = {
          file: f,
          url: URL.createObjectURL(f),
        };
        this.photos = this.photos.concat(f);
      }
    }
    console.log(this.photos);
  }

  isComplete() {
    if (!this.warehouse ||
      !this.warehouse.name ||
      !this.warehouse.address ||
      !this.warehouse.city ||
      !this.warehouse.workingDays.some(wd => wd) ||
      !this.photos.length
    ) {
      return false;
    }
    return true;
  }

  departamentoChanged(ev) {
    console.log(ev);
    this.warehouse.city = undefined;
    this.ciudades = [];
    this.searchKey.next(ev);
  }

  ciudadChanged(ev) {
    console.log(ev);
    // this.warehouse.
  }

}
