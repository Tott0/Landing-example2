import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { Validators, FormBuilder, FormGroup, AbstractControl } from '@angular/forms';
import { ModalManager } from '@core/providers/modal-manager';
import { StaticMethods } from '@core/static-methods';
import { OwnerService } from '../owner.service';
import { MatStepper } from '@angular/material/stepper';
import { Warehouse, Parameter } from '@shared/models/warehouse.model';
import { Departamento, Ciudad } from '@shared/models/shared.model';

import { StepBasicInfoComponent } from './step-basic-info/step-basic-info.component';
import { StepStorageComponent } from './step-storage/step-storage.component';
import { StepWarehouseInfoComponent } from './step-warehouse/step-warehouse-info.component';
import { StepServicesComponent } from './step-services/step-services.component';

export interface Completable {
  isComplete();
}

@Component({
  selector: 'app-create-warehouse',
  templateUrl: './create-warehouse.component.html',
  styleUrls: ['./create-warehouse.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CreateWarehouseComponent implements OnInit {

  @ViewChild('stepper') stepper;

  errors: any = {};
  warehouse: Warehouse = new Warehouse();

  @ViewChild(MatStepper) matStepper: MatStepper;

  @ViewChild(StepBasicInfoComponent) basicInfo: StepBasicInfoComponent;
  @ViewChild(StepWarehouseInfoComponent) warehouseInfo: StepWarehouseInfoComponent;
  @ViewChild(StepServicesComponent) servicesInfo: StepServicesComponent;
  @ViewChild(StepStorageComponent) storageInfo: StepStorageComponent;

  parameters: any = {
    product: [],
    security: [],
    certifications: [],
  };
  services: any;

  departamentos: Departamento[] = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private mm: ModalManager,
    private service: OwnerService
  ) { }

  ngOnInit() {
    this.route.data
      .subscribe((data: { parameters: any, services: any, departamentos: Departamento[] }) => {
        console.log(data);
        this.parameters = data.parameters;
        this.services = data.services;
        this.departamentos = data.departamentos;
        this.mm.closeLoadingDialog();
      });
  }

  onSubmit() {
    this.mm.showLoadingDialog();
    let parameters: Parameter[] = [];
    parameters = parameters.concat(this.parameters.product.filter((p: Parameter) => p.checked));
    parameters = parameters.concat(this.parameters.security.filter((p: Parameter) => p.checked));
    parameters = parameters.concat(this.parameters.certifications.filter((p: Parameter) => p.checked));
    const services = this.services.filter((p: Parameter) => p.checked);
    const requestParams = {
      name: this.warehouse.name,
      lat: this.warehouse.lat,
      lng: this.warehouse.lng,
      city_id: this.warehouse.city.id,
      address: this.warehouse.address,
      description: this.warehouse.description,

      workingDays: this.warehouse.workingDays,
      // workingTime: this.warehouse.workingTime,

      positions_attributes: this.warehouse.positions,

      warehouse_parameters_attributes: parameters.map(p => p.id),
      warehouse_services_attributes: services,

      attachment_attributes: this.warehouse.images,
    };
    this.service.createWarehouse(requestParams)
      .subscribe(res => {
        this.mm.closeLoadingDialog();
        this.router.navigate(['temproute_owner']);
      });
  }

  departamentoChanged(departamentoId) {

  }

  next() {
    console.log(this.matStepper.selectedIndex);
    if (this.matStepper.selectedIndex < 3) {
      this.matStepper.next();
    } else {
      this.onSubmit();
    }
    console.log(this.warehouse);
  }

  back() {
    console.log(this.matStepper.selectedIndex);
    this.matStepper.previous();
  }

  getErrorMessage(formControl: AbstractControl, error) {
    if (error && error.length) {
      return error[0];
    } else {
      return StaticMethods.getFormError(formControl);
    }
  }

  isComplete(step: Completable) {
    if (step) {
      return step.isComplete();
    }
    return false;
  }

}
