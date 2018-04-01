import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalManager } from '../core/providers/modal-manager';

import { WarehouseService } from './warehouse.service';
import { Warehouse, WarehouseApi } from '../shared/models/warehouse.model';

import { Observable } from 'rxjs/Observable';
import { MatPaginator } from '@angular/material';
import { merge, startWith, switchMap, map, catchError } from 'rxjs/operators';

@Component({
  selector: 'app-warehouse',
  templateUrl: './warehouse.component.html',
  styleUrls: ['./warehouse.component.scss']
})
export class WarehouseComponent implements OnInit {

  warehouse: Warehouse;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private mm: ModalManager,
    private service: WarehouseService,
  ) { }

  ngOnInit() {
    this.route.data.subscribe((data: { res: Warehouse }) => {
      console.log(data.res);
      this.warehouse = data.res;
      this.mm.closeLoadingDialog();
    });
  }

}
