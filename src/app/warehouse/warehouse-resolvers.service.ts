import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { merge } from 'rxjs/operators';
import {
  Router, Resolve, RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';

import { ModalManager } from '../core/providers/modal-manager';
import { WarehouseService } from './warehouse.service';
import { Warehouse, WarehouseApi } from '../shared/models/warehouse.model';
import { Location } from '@angular/common';

@Injectable()
export class WarehouseResolver implements Resolve<Warehouse> {
  constructor(
    private service: WarehouseService,
    private router: Router,
    private location: Location,
    private mm: ModalManager) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Warehouse> {
    if (!route.params.id) {
      this.location.back();
      return null;
    }
    this.mm.showLoadingDialog();
    return this.service.getWarehouse(route.params.id).map(res => {
      if (res) {
        return res;
      } else {
        this.mm.closeLoadingDialog();
        this.router.navigate(['']);
        return null;
      }
    });
  }
}

