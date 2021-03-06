import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalManager } from '../../core/providers/modal-manager';

import { AgmMap, MouseEvent } from '@agm/core';
import { Warehouse, MeasureType, PositionType, Parameter, ServiceParameter } from '../../shared/models/warehouse.model';

import { Observable, Subject, of } from 'rxjs';
import { switchMap, catchError, debounceTime, merge, tap } from 'rxjs/operators';

import { MatPaginator } from '@angular/material';
import { ClientService } from '../client.service';
import { Ciudad, FilterSubject } from '../../shared/models/shared.model';
import { AppConstants } from '@app/app-constants';


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit, OnDestroy {
  @ViewChild(AgmMap) map: AgmMap;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private mm: ModalManager,
    private service: ClientService,
  ) {
    // this.route.
  }

  iLat = 10.9838314;
  iLng = -74.8136909;
  zoom = 13;
  warehouses: Warehouse[] = [];
  parameters: any;
  services: ServiceParameter[] = [];

  cityFSbj = new FilterSubject<Ciudad>();
  positionFSbj = new FilterSubject<PositionType>();
  amountFSbj = new FilterSubject<number>();
  iDateFSbj = new FilterSubject<Date>();
  eDateFSbj = new FilterSubject<Date>();
  productFSbj = new FilterSubject<Parameter[]>();

  sortOrderFSbj = new FilterSubject<number>();

  iDate = new Date();
  eDate = new Date();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  currentFilters: any;
  focusedWarehouse: Warehouse;

  PositionType = PositionType;

  ngOnInit() {
    setTimeout(() => {
      AppConstants.isAtMap = true;
    });
    const subscription = this.route.data
      .subscribe((data: { warehouses: Warehouse[], parameters: any, services: ServiceParameter[] }) => {
        console.log(data);
        this.warehouses = data.warehouses;
        this.parameters = data.parameters;
        this.services = data.services;
        if (!this.currentFilters) {
          this.currentFilters = {
            cd: +this.route.snapshot.paramMap.get('cd'),
            up: +this.route.snapshot.paramMap.get('up'),
            str: this.route.snapshot.paramMap.get('str'),
            prm: this.route.snapshot.paramMap.get('prm'),
          };
          this.currentFilters.cd = 1; // FIXME
        }
        console.log('cf', this.currentFilters);

        const str = this.currentFilters.str;
        console.log(str);
        if (str) {
          if (!Array.isArray(str)) {
            this.currentFilters.str = str.split(',').map(s => +s);
            console.log('str', this.currentFilters.str);
          }
        } else {
          this.currentFilters.str = [0, 0, 0];
        }

        let prm: any = this.currentFilters.prm;
        console.log(prm);
        if (prm) {
          if (!Array.isArray(prm)) {
            prm = prm.split(',');
            for (const p of prm) {
              let sw = false;
              for (const key of Object.keys(this.parameters)) {
                for (const param of this.parameters[key]) {
                  if (param.id === +p) {
                    sw = true;
                    param.checked = true;
                    break;
                  }
                }
                if (sw) {
                  break;
                }
              }
            }
          }
        } else {
          this.currentFilters.prm = [];
        }

        this.mm.closeLoadingDialog();
        // subscription.unsubscribe();

        this.map.centerChange.subscribe(center => {
          console.log(center);
          this.iLat = center.lat;
          this.iLng = center.lng;
        });
        this.map.zoomChange.subscribe(zoom => {
          this.zoom = zoom;
        });
      });

    this.cityFSbj.change.pipe(
      merge(this.positionFSbj.change, this.amountFSbj.change, this.iDateFSbj.change,
        this.eDateFSbj.change, this.productFSbj.change),
      switchMap(() => {
        this.mm.showLoadingDialog();
        return of<Warehouse[]>([]);
        // this.service.filterWarehouses({
        //   city_id: this.cityFSbj.value,
        //   position_type: this.positionFSbj.value,
        //   amount: this.amountFSbj.value,
        //   iDate: this.iDateFSbj.value,
        //   eDate: this.eDateFSbj.value,
        //   products: this.productFSbj.value
        // });
      }),
      tap((res: any) => {
        if (res.total_count) {
          return res.warehouses;
        }
        return [];
      }),
      catchError(() => {
        return of([]);
      })
    ).subscribe(data => {
      console.log('data', data);
      this.mm.closeLoadingDialog();
      this.warehouses = data;
      this.paginator.length = data.length;
    });
  }

  // filters() {
  //   this.mm.showWarehouseFiltersDialog({
  //     data: {
  //       storage: this.currentFilters.str,
  //       parameters: this.parameters,
  //     }
  //   }).subscribe(data => {
  //     if (data) {
  //       const filter: any = {
  //         cd: this.currentFilters.cd,
  //         up: this.currentFilters.up,
  //       };
  //       if (data.storage) {
  //         filter.str = data.storage.map(str => str ? 1 : 0);
  //       }
  //       if (data.parameters) {
  //         filter.prm = [];
  //         for (const params of Object.keys(data.parameters)) {
  //           filter.prm = filter.prm.concat(data.parameters[params].filter(p => p.checked).map(p => p.id));
  //         }
  //       }

  //       for (const f of Object.keys(filter)) {
  //         if (!filter[f] || (Array.isArray(filter[f]) && !filter[f].length)) {
  //           delete filter[f];
  //         }
  //       }
  //       console.log(filter);
  //       this.router.navigate(['.', filter], {
  //         relativeTo: this.route
  //       }).then(success => {
  //         if (success) {
  //           this.currentFilters = filter;
  //         }
  //       });

  //     }
  //   });
  // }

  ngOnDestroy() {
    AppConstants.isAtMap = false;
  }

  focusOn(warehouse: Warehouse) {
    this.focusedWarehouse = new Warehouse(this.warehouses[0]);
    this.iLat = warehouse.lat;
    this.iLng = warehouse.lng;
    this.zoom = 15;
  }

  markerClick(warehouse: Warehouse) {
    this.focusOn(warehouse);
  }

  clearFocus() {
    this.focusedWarehouse = undefined;
    this.iLat = 10.9838314;
    this.iLng = -74.8136909;
    this.zoom = 13;
  }

}
