import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup, AbstractControl } from '@angular/forms';

import { AuthService } from '../../../app/core/providers/auth.service';
import { StaticMethods } from '../../../app/utils/static-methods';
import { ModalManager } from '../../../app/core/providers/modal-manager';
import { CustomValidators } from '../../../app/shared/custom-validators';

import { MatSnackBar, MatSnackBarConfig } from '@angular/material';
import { ResultSnackbar } from '../../shared/dialogs/result-snackbar/result.snackbar';

@Component({
  selector: 'app-signup',
  templateUrl: 'signup.component.html',
  styleUrls: ['signup.component.scss']
})
export class SignupComponent implements OnInit {

  errors: any = {};
  userForm: FormGroup;
  get email() { return this.userForm.get('email'); }
  get passwords() { return this.userForm.get('passwords'); }
  get password() { return this.passwords.get('password'); }
  get password_confirmation() { return this.passwords.get('password_confirmation'); }

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private mm: ModalManager,
  ) { }

  ngOnInit() {
    this.userForm = this.formBuilder.group({
      email: ['', [Validators.required]],
      passwords: this.formBuilder.group({
        password: ['', [Validators.required, Validators.minLength(8)]],
        password_confirmation: ['', [Validators.required, Validators.minLength(8)]],
      }, { validator: [CustomValidators.matchPasswords] })
    });
  }

  onSubmit() {
    this.mm.showLoadingDialog();
    const u = {
      email: this.email.value,
      password: this.password.value
    };
    // this.authService.user(u)
    //   .subscribe(res => {
    //     this.mm.closeLoadingDialog();
    //     this.router.navigate([this.authService.redirectUrl ? this.authService.redirectUrl : '']);
    //   },
    //     (err) => {
    //       this.mm.closeLoadingDialog();

    //       if (typeof err === 'string') {
    //         this.errors = {
    //           message: err
    //         };
    //       } else {
    //         this.errors = err;
    //         for (const control of Object.keys(this.userForm.controls)) {
    //           this.userForm.get(control).markAsDirty();
    //           this.userForm.get(control).markAsTouched();
    //         }
    //       }
    //     });
  }

  getErrorMessage(formControl: AbstractControl, error?) {
    if (error && error.length) {
      return error[0];
    } else {
      return StaticMethods.getFormError(formControl);
    }
  }
}
