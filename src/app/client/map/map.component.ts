import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalManager } from '../../core/providers/modal-manager';

import { AgmMap, MouseEvent } from '@agm/core';
import { WareHouse } from '../../shared/models/warehouse.model';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { switchMap, catchError, debounceTime, distinctUntilChanged } from 'rxjs/operators';

import { ClientService } from '../client.service';
import { Ciudad } from '../../shared/models/shared.model';


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  @ViewChild(AgmMap) map: AgmMap;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private mm: ModalManager,
    private cService: ClientService,
  ) {
    // this.route.
  }

  iLat = 10.9838314;
  iLng = -74.8136909;
  zoom = 14;
  warehouses: any[] = [];
  parameters: any;

  selectedCityId: number;
  uPallets: number;
  currentFilters: any;
  focusedWareHouse: WareHouse;

  ngOnInit() {
    const subscription = this.route.data
      .subscribe((data: { warehouses: WareHouse[], parameters: any }) => {
        console.log(data);
        this.warehouses = data.warehouses;
        this.parameters = data.parameters;
        if (!this.currentFilters) {
          this.currentFilters = {
            cd: +this.route.snapshot.paramMap.get('cd'),
            up: +this.route.snapshot.paramMap.get('up'),
            str: this.route.snapshot.paramMap.get('str'),
            prm: this.route.snapshot.paramMap.get('prm'),
          };
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

    // this.route.paramMap.pipe(
    //   switchMap(params => {
    //     // console.log(params);
    //     this.selectedCityId = +params.get('cd');
    //     this.currentFilters.cd = this.selectedCityId;
    //     this.uPallets = +params.get('up');
    //     this.currentFilters.up = this.uPallets;
    //     this.mm.showLoadingDialog();
    //     return this.cService.filterWarehouses(params);
    //   }),
    //   catchError(err => {
    //     return Observable.of<WareHouse[]>([]);
    //   }),
    // )
    //   .subscribe(warehouses => {
    //     this.warehouses = warehouses;
    //     setTimeout(() => {

    //       this.mm.closeLoadingDialog();
    //     }, 300);
    //   });
  }

  filters() {
    this.mm.showWarehouseFiltersDialog({
      data: {
        storage: this.currentFilters.str,
        parameters: this.parameters,
      }
    }).subscribe(data => {
      if (data) {
        const filter: any = {
          cd: this.selectedCityId,
          up: this.uPallets,
        };
        if (data.storage) {
          filter.str = data.storage.map(str => str ? 1 : 0);
        }
        if (data.parameters) {
          filter.prm = [];
          for (const params of Object.keys(data.parameters)) {
            filter.prm = filter.prm.concat(data.parameters[params].filter(p => p.checked).map(p => p.id));
          }
        }

        for (const f of Object.keys(filter)) {
          if (!filter[f] || (Array.isArray(filter[f]) && !filter[f].length)) {
            delete filter[f];
          }
        }
        console.log(filter);
        this.router.navigate(['.', filter], {
          relativeTo: this.route
        }).then(success => {
          if (success) {
            this.currentFilters = filter;
          }
        });

      }
    });
  }

  focusOn(warehouse: WareHouse) {
    this.focusedWareHouse = warehouse;
    this.iLat = warehouse.lat;
    this.iLng = warehouse.lng;
    this.zoom = 15;
  }

}
