import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup, AbstractControl } from '@angular/forms';
import { ModalManager } from '../../core/providers/modal-manager';
import { StaticMethods } from '../../utils/static-methods';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.scss']
})
export class StartComponent implements OnInit {

  errors: any = {};
  filterForm: FormGroup;
  get city() { return this.filterForm.get('city'); }
  get uPallet() { return this.filterForm.get('uPallet'); }

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private mm: ModalManager,
  ) { }

  ngOnInit() {
    this.filterForm = this.formBuilder.group({
      city: ['', [Validators.required]],
      uPallet: ['', Validators.compose([Validators.required])]
    });
  }

  onSubmit() {
    // this.mm.showLoadingDialog();
    const u = {
      city: this.city.value,
      uPallet: this.uPallet.value,
    };
    // this.authService.filter(u)
    //   .subscribe(res => {
    //     this.mm.closeLoadingDialog();
    //     switch (res.user.type_user) {
    //       case PersonType.ABOGADO:
    //         this.router.navigate(['/abogado']);
    //         break;
    //       case PersonType.ADMIN:
    //         this.router.navigate(['/admin']);
    //         break;
    //       default:
    //         this.router.navigate(['/usuario']);
    //         break;
    //     }
    //   },
    //   (err) => {
    //     this.mm.closeLoadingDialog();

    //     if (typeof err === 'string') {
    //       this.errors = {
    //         message: err
    //       };
    //     } else {
    //       this.errors = err;
    //       for (const control of Object.keys(this.filterForm.controls)) {
    //         this.filterForm.get(control).markAsDirty();
    //         this.filterForm.get(control).markAsTouched();
    //       }
    //     }
    //   });

    this.router.navigate(['temproute_map'], {
      relativeTo: this.route
    });
  }

  getErrorMessage(formControl: AbstractControl, error) {
    if (error && error.length) {
      return error[0];
    } else {
      return StaticMethods.getFormError(formControl);
    }
  }

}
