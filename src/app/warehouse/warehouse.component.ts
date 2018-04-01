import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalManager } from '../core/providers/modal-manager';

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

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private mm: ModalManager,
    private service: WarehouseService,
  ) { }

  ngOnInit() {
    this.route.data.subscribe((data: { res: Warehouse }) => {
      console.log(data.res);
      this.warehouse = data.res;
      if (this.warehouse.parameters) {
        this.products = this.warehouse.parameters.filter(p => p.type === ParameterType.ACCEPTED_PRODUCTS);
        this.security = this.warehouse.parameters.filter(p => p.type === ParameterType.SECURITY);
        this.certifications = this.warehouse.parameters.filter(p => p.type === ParameterType.CERTIFICATIONS);
        this.serviceP = this.warehouse.parameters.filter(p => p.type === ParameterType.EXTRA_SERVICES);

        this.storageDataSource.data = this.warehouse.positions;
      }
      this.mm.closeLoadingDialog();
    });
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
    switch (position.type) {
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
