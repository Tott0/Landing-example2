import { Component, OnInit, ViewChild } from '@angular/core';
import { Validators, FormBuilder, FormGroup, AbstractControl, FormGroupDirective } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

import { AuthService } from '../../../app/core/providers/auth.service';
import { StaticMethods } from '../../../app/utils/static-methods';
import { ModalManager } from '../../../app/core/providers/modal-manager';
import { CustomValidators } from '../../../app/shared/custom-validators';

import { MatSnackBar, MatSnackBarConfig } from '@angular/material';
import { ResultSnackbar } from '../../shared/dialogs/result-snackbar/result.snackbar';

@Component({
  selector: 'app-recover',
  templateUrl: 'recover.component.html',
  styleUrls: ['recover.component.scss']
})
export class RecoverComponent implements OnInit {
  @ViewChild(FormGroupDirective) signupFormDir: FormGroupDirective;

  errors: any = {};
  recoverForm: FormGroup;
  get password() { return this.recoverForm.get('password'); }
  get password_confirmation() { return this.recoverForm.get('password_confirmation'); }

  token: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private mm: ModalManager,
    private snackbar: MatSnackBar
  ) {
  }

  ngOnInit() {
    this.token = this.route.snapshot.paramMap.get('token');

    if (!this.token) {
      this.router.navigate(['']);
    }

    this.recoverForm = this.formBuilder.group({
      password: ['', [Validators.required, Validators.minLength(8)]],
      password_confirmation: ['', [Validators.required, Validators.minLength(8)]],
    }, { validator: CustomValidators.matchPasswords });
  }

  onSubmit() {

    const account = {
      recovery: {
        token: this.token,
        password: this.password.value,
        password_confirmation: this.password_confirmation.value,
      }
    };

    this.mm.showLoadingDialog();
    this.authService.recoverPassword(account)
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
          const formControl = this.recoverForm.get(control);
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