import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { merge } from 'rxjs/operators';
import {
  Router, Resolve, RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';

import { ModalManager } from '@core/providers/modal-manager';

import { Ciudad, Departamento } from '@shared/models/shared.model';
import { SharedService } from '@core/providers/shared.service';

@Injectable()
export class DepartamentosResolver implements Resolve<Departamento[]> {
  constructor(
    private sharedService: SharedService,
    private router: Router,
    private mm: ModalManager) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Departamento[]> {

    this.mm.showLoadingDialog();
    return this.sharedService.getDepartamentos();
  }
}

