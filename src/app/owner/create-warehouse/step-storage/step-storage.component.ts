import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup, AbstractControl } from '@angular/forms';
import { StaticMethods } from '../../../utils/static-methods';

@Component({
  selector: 'app-step-storage',
  templateUrl: './step-storage.component.html',
  styleUrls: ['./step-storage.component.scss']
})
export class StepStorageComponent implements OnInit {

  errors: any = {};
  filterForm: FormGroup;
  get city() { return this.filterForm.get('city'); }
  get uPallet() { return this.filterForm.get('uPallet'); }

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit() {
    this.filterForm = this.formBuilder.group({
      city: ['', [Validators.required]],
      uPallet: ['', Validators.compose([Validators.required])]
    });
  }

  onSubmit() {
    // this.mm.showLoadingDialog();
  }

  getErrorMessage(formControl: AbstractControl, error) {
    if (error && error.length) {
      return error[0];
    } else {
      return StaticMethods.getFormError(formControl);
    }
  }

}
