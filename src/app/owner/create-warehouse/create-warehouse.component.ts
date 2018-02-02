import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Validators, FormBuilder, FormGroup, AbstractControl } from '@angular/forms';
import { ModalManager } from '../../core/providers/modal-manager';
import { StaticMethods } from '../../utils/static-methods';
import { OwnerService } from '../owner.service';
import { MatStepper } from '@angular/material/stepper';

@Component({
  selector: 'app-create-warehouse',
  templateUrl: './create-warehouse.component.html',
  styleUrls: ['./create-warehouse.component.scss']
})
export class CreateWarehouseComponent implements OnInit {

  errors: any = {};
  basicInfoForm: FormGroup;
  storageForm: FormGroup;
  availabilityForm: FormGroup;

  @ViewChild(MatStepper) matStepper: MatStepper;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private mm: ModalManager,
    private service: OwnerService
  ) { }

  ngOnInit() {

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
