import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Component, OnInit, Input } from '@angular/core';
import { Validators, FormBuilder, FormGroup, AbstractControl } from '@angular/forms';
import { StaticMethods } from '@core/static-methods';
import { ModalManager } from '@core/providers/modal-manager';

import { MatTableDataSource } from '@angular/material';
import { Position, MeasureType, PositionType, Warehouse, ServiceParameter, ServiceType } from '@shared/models/warehouse.model';

// TODO services with cost
@Component({
  selector: 'app-step-services',
  templateUrl: './step-services.component.html',
  styleUrls: ['./step-services.component.scss']
})
export class StepServicesComponent implements OnInit {

  @Input() warehouse: Warehouse;
  @Input() services: any;
  additionalServices: any;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private mm: ModalManager,
  ) { }

  ngOnInit() {

    this.additionalServices = this.services.filter((s: ServiceParameter) => s.typeService === ServiceType.ADDITIONAL);
  }

  onSubmit() {
    // this.mm.showLoadingDialog();
  }

  isComplete() {
    return false;
  }

}
