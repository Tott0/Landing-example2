import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalManager } from '../core/providers/modal-manager';

import { OwnerService } from './owner.service';
import { Warehouse, WarehouseApi } from '@shared/models/warehouse.model';

import { Observable, of } from 'rxjs';
import { MatPaginator } from '@angular/material';
import { merge, startWith, switchMap, map, catchError } from 'rxjs/operators';
import { AuthService } from '@app/core/providers/auth.service';

@Component({
  selector: 'app-owner',
  templateUrl: './owner.component.html',
  styleUrls: ['./owner.component.scss']
})
export class OwnerComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;

  warehouses: Warehouse[] = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private mm: ModalManager,
    private service: OwnerService,
    public authService: AuthService
  ) { }

  ngOnInit() {
    this.paginator.pageSize = 4;
    this.route.data.subscribe((data: { res: WarehouseApi }) => {
      console.log(data.res);
      this.warehouses = data.res.warehouses;
      this.paginator.length = data.res.total_count;
      this.mm.closeLoadingDialog();
    });

    this.paginator.page
      .pipe(
        switchMap(() => {
          this.mm.showLoadingDialog();
          return this.service.getWarehouses({
            page: this.paginator.pageIndex + 1,
            per_page: 4,
          });
        }),
        map((res: WarehouseApi) => {
          this.mm.closeLoadingDialog();
          this.paginator.length = res.total_count;
          return res.warehouses;
        }),
        catchError(() => of([])))
      .subscribe(warehouses => this.warehouses = warehouses);
  }

  getBodegas(page) {

  }

}
