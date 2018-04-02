import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalManager } from '../core/providers/modal-manager';
import { Validators, FormBuilder, FormGroup, AbstractControl, FormControl } from '@angular/forms';
import { CustomValidators } from '../../app/shared/custom-validators';

import { WarehouseService } from './warehouse.service';
import { Warehouse, WarehouseApi, PositionType, Parameter, ParameterType, Position } from '../shared/models/warehouse.model';

import { MatTableDataSource } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import { merge, startWith, switchMap, map, catchError } from 'rxjs/operators';
import { AppConstants } from '../app-constants';

@Component({
  selector: 'app-warehouse',
  templateUrl: './warehouse.component.html',
  styleUrls: ['./warehouse.component.scss']
})
export class WarehouseComponent implements OnInit {

  warehouse: Warehouse;
  PositionType = PositionType;
  products: Parameter[] = [];
  security: Parameter[] = [];
  certifications: Parameter[] = [];
  serviceP: Parameter[] = [];

  storageColumns = ['number', 'unit', 'space', 'price', 'height', 'weight', 'special'];
  storageDataSource = new MatTableDataSource<Position>();

  filteredPositions: Position[] = [];

  minDate = new Date();
  errors: any = {};
  form: FormGroup;
  get startDate() { return this.form.get('start_date'); }
  get endDate() { return this.form.get('end_date'); }
  get positionType() { return this.form.get('position_type'); }
  get amount() { return this.form.get('amount'); }
  get refrigerated() { return this.form.get('refrigerated'); }
  get dangerous() { return this.form.get('dangerous'); }
  get position() { return this.form.get('position_id'); }

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private mm: ModalManager,
    private service: WarehouseService,
    private fb: FormBuilder,
  ) { }

  ngOnInit() {
    this.minDate.setDate(this.minDate.getDate() + 7);
    this.form = this.fb.group({
      start_date: ['', [Validators.required]],
      end_date: ['', [Validators.required]],
      position_type: ['', [Validators.required]],
      amount: [0, [Validators.required, Validators.min(1)]],
      refrigerated: [false, []],
      dangerous: [false, []],
      position: ['', []],
    });

    this.route.data.subscribe((data: { res: Warehouse }) => {
      console.log(data.res);
      this.warehouse = data.res;
      if (this.warehouse.parameters) {
        this.products = this.warehouse.parameters.filter(p => p.type === ParameterType.ACCEPTED_PRODUCTS);
        this.security = this.warehouse.parameters.filter(p => p.type === ParameterType.SECURITY);
        this.certifications = this.warehouse.parameters.filter(p => p.type === ParameterType.CERTIFICATIONS);
        this.serviceP = this.warehouse.parameters.filter(p => p.type === ParameterType.EXTRA_SERVICES);

        this.storageDataSource.data = this.warehouse.positions;
        this.filteredPositions = this.warehouse.positions;
      }
      this.mm.closeLoadingDialog();
    });

  }

  filterPositions(i) {
    this.filteredPositions = this.warehouse.positions;

    if (this.positionType.value) {
      this.filteredPositions = this.filteredPositions.filter(fp => fp.type === this.positionType.value);
    }
    if (this.refrigerated.value) {
      this.filteredPositions = this.filteredPositions.filter(fp => fp.refrigerated);
    }
    if (this.dangerous.value) {
      this.filteredPositions = this.filteredPositions.filter(fp => fp.dangerous);
    }
  }

  hasType(i) {
    switch (i) {
      case 0:
        if (this.warehouse.positions.some(wp => wp.type === PositionType.FLOOR_CLOSED || wp.type === PositionType.FLOOR_OPEN)) {
          return true;
        }
        break;
      case 1:
        if (this.warehouse.positions.some(wp => wp.type === PositionType.RACK)) {
          return true;
        }
        break;
      case 2:
        if (this.warehouse.positions.some(wp => wp.type === PositionType.BOX)) {
          return true;
        }
        break;
    }
    return false;
  }

  getDays() {
    let s = this.warehouse.workingDays[0] ? AppConstants.dateTranslation.dayNames[0] : '';

    for (let i = 1; i < this.warehouse.workingDays.length; i++) {
      s += this.warehouse.workingDays[i] ? ', ' + AppConstants.dateTranslation.dayNames[i] : '';
    }
    return s;
  }

  getSchedule() {
    const t = this.warehouse.workingTime;
    return t[0] + ':' + t[4] + ' ' + t[1] + ' - ' + t[2] + ':' + t[5] + ' ' + t[3];
  }

  getMeasure(position) {
    switch (position.type || position) {
      case PositionType.FLOOR_CLOSED:
        return 'm<sup>2</sup>';
      case PositionType.FLOOR_OPEN:
        return 'm<sup>2</sup>';
      case PositionType.RACK:
        return 'pallet(s)';
      case PositionType.BOX:
        return 'caja(s)';
      default:
        return '';
    }
  }

}
