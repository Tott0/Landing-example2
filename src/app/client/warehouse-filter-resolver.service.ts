import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import {
  Router, Resolve, RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Warehouse } from '../shared/models/warehouse.model';
import { ClientService } from './client.service';
import { ModalManager } from '../core/providers/modal-manager';

@Injectable()
export class WarehouseFilterResolver implements Resolve<Warehouse[]> {
  constructor(
    private service: ClientService,
    private router: Router,
    private mm: ModalManager) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Warehouse[]> {
    console.log(route.params);
    const params = route.params;

    this.mm.showLoadingDialog();
    return this.service.filterWarehouses(params).map(c => {
      if (c && c.length > 0) {
        return c;
      } else { // no warehouses
        this.mm.closeLoadingDialog();
        this.router.navigate(['temproute_client']);
        return null;
      }
    });
  }
}
