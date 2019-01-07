import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup, AbstractControl } from '@angular/forms';
import { ModalManager } from '../../core/providers/modal-manager';
import { StaticMethods, getErrorMessage } from '@core/static-methods';
import { ClientService } from '../client.service';
import { Ciudad } from '@app/shared/models';
import { Observable, of } from 'rxjs';
import { debounceTime, map, switchMap, distinctUntilChanged, catchError } from 'rxjs/operators';
import { SharedService } from '@app/core/providers/shared.service';

@Component({
  selector: 'app-warehouse-search',
  templateUrl: './warehouse-search.component.html',
  styleUrls: ['./warehouse-search.component.scss']
})
export class WarehouseSearchComponent implements OnInit {

  errors: any = {};
  warehouseForm: FormGroup;
  get city() { return this.warehouseForm.get('city'); }
  get pallets() { return this.warehouseForm.get('pallets'); }
  getErrorMessage = getErrorMessage;

  iLat = 10.9838119;
  iLng = -74.8180175;
  zoom = 13;

  filteredCities: Observable<Ciudad[]>;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private mm: ModalManager,
    private cService: ClientService,
    private sharedService: SharedService,
  ) { }

  ngOnInit() {
    this.warehouseForm = this.formBuilder.group({
      city: ['', [Validators.required]],
      pallets: ['', [Validators.required, Validators.min(0)]],
    });

    navigator.geolocation.getCurrentPosition((position) => {
      console.log(position);
      this.iLat = position.coords.latitude;
      this.iLng = position.coords.longitude;
    });

    this.filteredCities = this.city.valueChanges
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        switchMap(value => {
          return this.sharedService.searchCities({
            name: value
          });
        }),
        catchError(err => {
          return of([{
            id: 1,
            name: 'Barranquilla',
            department: {
              id: 1,
              name: 'Atlantico'
            }
          }]);
        })
      );
  }

  cityDisplayFn(city?: Ciudad): string | undefined {
    return city ? city.name : undefined;
  }

  searchWarehouses() {
    const u = {
      cd: this.city.value,
      up: this.pallets.value,
    };

    console.log(u);

    // setTimeout(() => {
    this.router.navigate(['/temproute_client/temproute_map', u]).then(
      success => this.errors.message = success ? '' : 'No se encontraton bodegas con los parametros seleccionados',
      err => console.error(err)
    );
    // }, 500);
  }
}
