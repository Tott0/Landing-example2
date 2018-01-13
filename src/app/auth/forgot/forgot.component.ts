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
  forgotForm: FormGroup;
  get email() { return this.forgotForm.get('email'); }

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private mm: ModalManager,
    private snackbar: MatSnackBar
  ) {
  }

  ngOnInit() {
    this.forgotForm = this.formBuilder.group({
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

        this.snackbar.openFromComponent(ResultSnackbar, {
          data: {
            goodResult: true,
            message: 'Solicitud exitósa',
          },
          duration: 3000,
          horizontalPosition: 'right',
          verticalPosition: 'bottom',
          panelClass: 'result-snackbar'
        });
      },
      (err) => {
        this.errors = err;
        for (const control of Object.keys(this.errors)) {
          const formControl = this.forgotForm.get(control);
          if (formControl) {
            formControl.setErrors({ 'async': true });
          }
        }

        this.snackbar.openFromComponent(ResultSnackbar, {
          data: {
            goodResult: false,
            message: 'Error en la solicitud',
          },
          duration: 3000,
          horizontalPosition: 'right',
          verticalPosition: 'bottom',
          panelClass: 'result-snackbar'
        });
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
