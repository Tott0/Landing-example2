import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { ModalManager } from '@core/providers/modal-manager';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material';
import { ResultSnackbar } from '@shared/dialogs/result-snackbar/result.snackbar';

import { Observable } from 'rxjs/Observable';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { merge, startWith, switchMap, map, catchError } from 'rxjs/operators';
import { Subject } from 'rxjs/Subject';
import { FilterSubject } from '@app/shared/models/shared.model';

import { AdminService } from '@app/admin/admin.service';
import { RenterApi } from '@app/shared/models/renter.model';

@Component({
  selector: 'app-renters',
  templateUrl: 'renters.component.html',
  styleUrls: ['renters.component.scss']
})
export class RentersComponent implements OnInit {

  renterColumns = ['name', 'lastName', 'identification', 'phoneNumber', 'email', 'company'];
  renterDataSource = new MatTableDataSource();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  pageSizeChange = new Subject();
  camFilterSbj: FilterSubject = new FilterSubject();

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private mm: ModalManager,
    private snackbar: MatSnackBar,
    private service: AdminService,
  ) {
  }

  ngOnInit() {
    this.route.data.subscribe((data: { res: RenterApi }) => {
      // console.log(data.res);
      this.renterDataSource.data = data.res.renters;
      this.paginator.length = data.res.total_count;
      this.mm.closeLoadingDialog();
    });

    this.paginator.pageSize = 10;

    this.sort.sortChange
      .pipe(
        merge(this.paginator.page, this.camFilterSbj.change, this.pageSizeChange),
        switchMap(() => {
          this.mm.showLoadingDialog();
          return this.service.getRenters({
            order_by: this.sort.active,
            sort: this.sort.direction,
            page: this.paginator.pageIndex + 1,
            per_page: this.paginator.pageSize,
            //
            byCamera: this.camFilterSbj.value,
          });
        }),
        map((res: RenterApi) => {
          this.mm.closeLoadingDialog();
          this.paginator.length = res.total_count;
          return res.renters;
        }),
        catchError(() => {
          return Observable.of([]);
        })
      ).subscribe(data => this.renterDataSource.data = data);

    this.sort.sortChange.subscribe(() => { this.paginator.pageIndex = 0; });
  }

  detail(renterId) {
    this.router.navigate([`${renterId}`], {
      relativeTo: this.route
    });
  }

}
