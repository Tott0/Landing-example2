import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { merge } from 'rxjs/operators';
import {
  Router, Resolve, RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';

import { ModalManager } from '../../core/providers/modal-manager';
import { OwnerService } from '../owner.service';
import { Warehouse, WarehouseApi } from '../../shared/models/warehouse.model';

@Injectable()
export class WarehousesOwnerResolver implements Resolve<WarehouseApi> {
  constructor(
    private service: OwnerService,
    private router: Router,
    private mm: ModalManager) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<WarehouseApi> {
    this.mm.showLoadingDialog();
    return this.service.getWarehouses();
  }
}

