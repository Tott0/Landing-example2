import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  Router, Resolve, RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Parameter } from '@shared/models/warehouse.model';
import { ModalManager } from '../core/providers/modal-manager';
import { SharedService } from '../core/providers/shared.service';

@Injectable()
export class WarehouseParametersResolver implements Resolve<Parameter[]> {
  constructor(
    private service: SharedService,
    private router: Router,
    private mm: ModalManager) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Parameter[]> {
    this.mm.showLoadingDialog();
    return this.service.getParameters();
  }
}
