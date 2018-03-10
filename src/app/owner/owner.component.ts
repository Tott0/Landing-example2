import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalManager } from '../core/providers/modal-manager';

import { OwnerService } from './owner.service';
import { Warehouse, WarehouseApi } from '../shared/models/warehouse.model';

import { Observable } from 'rxjs/Observable';
import { MatPaginator } from '@angular/material';
import { merge, startWith, switchMap, map, catchError } from 'rxjs/operators';

@Component({
  selector: 'app-owner',
  templateUrl: './owner.component.html',
  styleUrls: ['./owner.component.scss']
})
export class OwnerComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;

  warehousesPage: Warehouse[] = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private mm: ModalManager,
    private service: OwnerService,
  ) { }

  ngOnInit() {
    this.paginator.pageSize = 5;
    this.route.data.subscribe((data: { res: WarehouseApi }) => {
      console.log(data.res);
      this.warehousesPage = data.res.warehouses;
      this.paginator.length = data.res.total_count;
      this.mm.closeLoadingDialog();
    });

    this.paginator.page
    .pipe(
      switchMap(() => {
        this.mm.showLoadingDialog();
        return this.service.getWarehouses({
          page: this.paginator.pageIndex + 1,
          per_page: 5,
        });
      }),
    map((res: WarehouseApi) => {
      this.mm.closeLoadingDialog();
      this.paginator.length = res.total_count;
      return res.warehouses;
    }),
    catchError(() => return Observable.of([])))
      .subscribe(warehouses => this.warehousesPage = warehouses);
  }

  getBodegas(page) {

  }

}
