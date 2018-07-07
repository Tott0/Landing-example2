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
import { RenterApi, Renter } from '@app/shared/models/renter.model';
import { User, Person } from '@app/shared/models';

import { PdfViewerOverlayRef } from '@shared/overlays/file-preview/pdf-viewer-overlay.ref';
import { PdfViewerOverlayService } from '@shared/overlays/file-preview/pdf-viewer-overlay.service';

@Component({
  selector: 'app-renters',
  templateUrl: 'renters.component.html',
  styleUrls: ['renters.component.scss']
})
export class RentersComponent implements OnInit {

  renterColumns = ['type', 'identification', 'name', 'matriculaInmobiliaria', 'rut',
    'certificadoLibertadTradicion', 'bankReference', 'actions'];
  renterDataSource = new MatTableDataSource<Renter>();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  pageSizeChange = new Subject();
  camFilterSbj: FilterSubject<any> = new FilterSubject();
  stateFilterSbj: FilterSubject<any> = new FilterSubject();

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private mm: ModalManager,
    private snackbar: MatSnackBar,
    private service: AdminService,
    private pdfViewer: PdfViewerOverlayService,
  ) {
  }

  ngOnInit() {
    this.route.data.subscribe((data: { res: RenterApi }) => {
      // console.log(data.res);
      data.res = data.res || {
        renters: [
          new Renter({
            id: 1,
            user: new User({
              person: new Person({
                id: 1,
                name: 'FirstName',
                lastName: 'lastName',
                identification: '11408736272'
              })
            }),
            matriculaInmobiliaria: '1291i123i12hu9ij1r',
            rut: { url: 'http://www.comercial.usm.cl/wp-content/uploads/2015/10/vica.com_.mx_Promociones_assets_promocion2.pdf' },
            certificadoLibertadTradicion: { url: 'http://www.comercial.usm.cl/wp-content/uploads/2015/10/vica.com_.mx_Promociones_assets_promocion2.pdf' },
            bankReference: { url: 'http://www.comercial.usm.cl/wp-content/uploads/2015/10/vica.com_.mx_Promociones_assets_promocion2.pdf' },
          })],
        total_count: 1
      };
      console.log(data.res);
      this.renterDataSource.data = data.res.renters;
      this.paginator.length = data.res.total_count;
      this.mm.closeLoadingDialog();
    });

    this.paginator.pageSize = 10;

    this.sort.sortChange
      .pipe(
        merge(this.paginator.page, this.camFilterSbj.change, this.pageSizeChange, this.stateFilterSbj.change),
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

  toggleRenter(renterId, accept) {
    this.mm.showLoadingDialog();
    const obs = accept ? this.service.acceptRenter(renterId) : this.service.rejectRenter(renterId);

    obs.subscribe((res) => {
      this.stateFilterSbj.change.next();
      this.mm.closeLoadingDialog();
    }, (err) => {
      this.mm.showResultSnackbar('Error en Solicitud', false);
    });
  }

  openPdf(pdf) {
    const dialogRef: PdfViewerOverlayRef = this.pdfViewer.open({
      data: {
        name: '',
        url: pdf
      }
    });
  }

}
