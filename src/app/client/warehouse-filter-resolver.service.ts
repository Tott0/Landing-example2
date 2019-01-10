import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap, map } from 'rxjs/operators';
import {
  Router, Resolve, RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Warehouse, WarehouseApi } from '@shared/models/warehouse.model';
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
    return this.service.filterWarehouses({
      by_city: params.cd
    }).pipe(
      map((res: WarehouseApi) => {
        if (res.total_count >= 0) {
          return res.warehouses;
        }
        return [];
      }));
  }
}
