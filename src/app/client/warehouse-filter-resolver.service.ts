import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { tap } from 'rxjs/operators';
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
    return this.service.filterWarehouses(params).pipe(
      tap((res: any) => {
        if (res.total_count) {
          return res.warehouses;
        }
        return res;
      }));
  }
}
