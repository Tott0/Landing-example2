import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Validators, FormBuilder, FormGroup, AbstractControl, FormGroupDirective } from '@angular/forms';

import { AuthService } from '../../../app/core/providers/auth.service';
import { StaticMethods } from '../../../app/utils/static-methods';
import { ModalManager } from '../../../app/core/providers/modal-manager';
import { CustomValidators } from '../../../app/shared/custom-validators';

import { PersonType } from '../../../app/shared/enums/person-type.enum';

import { MatSnackBar, MatSnackBarConfig } from '@angular/material';
import { ResultSnackbar } from '../../shared/dialogs/result-snackbar/result.snackbar';

@Component({
  selector: 'app-signup',
  templateUrl: 'signup.component.html',
  styleUrls: ['signup.component.scss']
})
export class SignupComponent implements OnInit {
  PersonType = PersonType;
  @ViewChild(FormGroupDirective) signupFormDir: FormGroupDirective;

  errors: any = {};
  signupForm: FormGroup;
  get type_user() { return this.signupForm.get('type_user'); }
  get name() { return this.signupForm.get('name'); }
  get identification() { return this.signupForm.get('identification'); }
  get phone_number() { return this.signupForm.get('phone_number'); }
  get address() { return this.signupForm.get('address'); }
  get email() { return this.signupForm.get('email'); }
  get password() { return this.signupForm.get('password'); }
  get agreement() { return this.signupForm.get('agreement'); }

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private mm: ModalManager,
    private snackbar: MatSnackBar
  ) {
  }

  ngOnInit() {
    this.signupForm = this.formBuilder.group({
      type_user: [PersonType.NATURAL, [Validators.required]],
      name: ['', [Validators.required]],
      identification: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(11)]],
      phone_number: ['', [Validators.required, Validators.minLength(7), Validators.maxLength(10)]],
      address: ['', [Validators.required]],
      email: ['', [Validators.required, CustomValidators.email()]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      agreement: [false]
    });

  }

  onSubmit() {

    const account = {
      name: this.name.value,
      email: this.email.value,
      identification: this.identification.value,
      contact_phone: this.phone_number.value,
      type_user: this.type_user.value,
      password: this.password.value,
      address: this.address.value
    };

    this.mm.showLoadingDialog();
    this.authService.signup(account)
      .subscribe(acc => {

        this.mm.closeLoadingDialog();
        this.router.navigate(['/login']);

        this.snackbar.openFromComponent(ResultSnackbar, {
          data: {
            goodResult: true,
            message: 'Usuario creado exitósamente',
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
          const formControl = this.signupForm.get(control);
          if (formControl) {
            formControl.setErrors({ 'async': true });
          }
        }

        this.snackbar.openFromComponent(ResultSnackbar, {
          data: {
            goodResult: false,
            message: 'Error al crear Usuario',
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
