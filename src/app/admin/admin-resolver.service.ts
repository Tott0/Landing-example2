import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import {
  Router, Resolve, RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';

import { ModalManager } from '@core/providers/modal-manager';
import { AdminService } from './admin.service';

import { RenterApi } from '@shared/models/renter.model';

@Injectable()
export class RentersResolver implements Resolve<RenterApi> {
  constructor(
    private service: AdminService,
    private router: Router,
    private mm: ModalManager) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<RenterApi> {
    this.mm.showLoadingDialog();
    return this.service.getRenters();
  }
}
