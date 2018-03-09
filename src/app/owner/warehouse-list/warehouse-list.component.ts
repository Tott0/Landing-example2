import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Validators, FormBuilder, FormGroup, AbstractControl } from '@angular/forms';
import { ModalManager } from '../../core/providers/modal-manager';
import { StaticMethods } from '../../utils/static-methods';
import { OwnerService } from '../owner.service';
import { MatStepper } from '@angular/material/stepper';

@Component({
  selector: 'app-warehouse-list',
  templateUrl: './warehouse-list.component.html',
  styleUrls: ['./warehouse-list.component.scss']
})
export class WarehouseListComponent implements OnInit {

  errors: any = {};
  basicInfoForm: FormGroup;
  storageForm: FormGroup;
  availabilityForm: FormGroup;

  @ViewChild(MatStepper) matStepper: MatStepper;

  parameters: any = {
    product: [],
    security: [],
    certifications: [],
    services: [],
  };

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private mm: ModalManager,
    private service: OwnerService
  ) { }

  ngOnInit() {
    this.route.data
    .subscribe((data: { parameters: any }) => {
      console.log(data);
      this.parameters = data.parameters;
      this.mm.closeLoadingDialog();
    });
  }

  onSubmit() {
    // this.mm.showLoadingDialog();

  }

  next() {
    console.log(this.matStepper.selectedIndex);
    this.matStepper.next();
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

}
