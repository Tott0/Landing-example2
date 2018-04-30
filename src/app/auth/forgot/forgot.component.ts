import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Validators, FormBuilder, FormGroup, AbstractControl, FormGroupDirective } from '@angular/forms';

import { AuthService } from '../../../app/core/providers/auth.service';
import { StaticMethods } from '../../../app/utils/static-methods';
import { ModalManager } from '../../../app/core/providers/modal-manager';
import { CustomValidators } from '../../../app/shared/custom-validators';

import { MatSnackBar, MatSnackBarConfig } from '@angular/material';
import { ResultSnackbar } from '../../shared/dialogs/result-snackbar/result.snackbar';

@Component({
  selector: 'app-forgot',
  templateUrl: 'forgot.component.html',
  styleUrls: ['forgot.component.scss']
})
export class ForgotComponent implements OnInit {
  @ViewChild(FormGroupDirective) signupFormDir: FormGroupDirective;

  errors: any = {};
  form: FormGroup;
  get email() { return this.form.get('email'); }

  constructor(
    public router: Router,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private mm: ModalManager,
    private snackbar: MatSnackBar
  ) {
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, CustomValidators.email()]],
    });

  }

  onSubmit() {

    const account = {
      email: this.email.value,
    };

    this.mm.showLoadingDialog();
    this.authService.forgotPassword(account)
      .subscribe(acc => {

        this.mm.closeLoadingDialog();
        this.router.navigate(['/login']);

        this.mm.showResultSnackbar('Solicitud Exitósa');
      },
      (err) => {
        if (typeof err === 'string') {
          this.errors = {
            message: err
          };
        } else {
          this.errors = err;
          for (const control of Object.keys(this.errors)) {
            const formControl = this.form.get(control);
            if (formControl) {
              formControl.setErrors({ 'async': true });
            }
          }
        }

        this.mm.showResultSnackbar('Error en la solicitud', false);
      });
  }

  getErrorMessage(formControl: AbstractControl, error?) {
    if (error && error.length) {
      return error[0];
    } else {
      return StaticMethods.getFormError(formControl);
    }
  }
}
