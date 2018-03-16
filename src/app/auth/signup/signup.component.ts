import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup, AbstractControl } from '@angular/forms';

import { AuthService } from '../../../app/core/providers/auth.service';
import { StaticMethods } from '../../../app/utils/static-methods';
import { ModalManager } from '../../../app/core/providers/modal-manager';
import { CustomValidators } from '../../../app/shared/custom-validators';

import { MatSnackBar, MatSnackBarConfig } from '@angular/material';
import { ResultSnackbar } from '../../shared/dialogs/result-snackbar/result.snackbar';

import { PersonType } from '../../shared/models/user.model';

@Component({
  selector: 'app-signup',
  templateUrl: 'signup.component.html',
  styleUrls: ['signup.component.scss']
})
export class SignupComponent implements OnInit {

  PersonType = PersonType;
  willRent = false;

  errors: any = {};
  userForm: FormGroup;
  get email() { return this.userForm.get('email'); }
  get personType() { return this.userForm.get('personType'); }
  get passwords() { return this.userForm.get('passwords'); }
  get password() { return this.passwords.get('password'); }
  get password_confirmation() { return this.passwords.get('password_confirmation'); }

  get person() { return this.userForm.get('person'); }

  get pName() { return this.person.get('pName'); }
  get pLastName() { return this.person.get('pLastName'); }
  get pIdentification() { return this.person.get('pIdentification'); }
  get pPhoneNumber() { return this.person.get('pPhoneNumber'); }

  get company() { return this.userForm.get('company'); }
  get cName() { return this.company.get('cName'); }
  get cNit() { return this.company.get('cNit'); }

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private mm: ModalManager,
  ) { }

  ngOnInit() {
    this.userForm = this.formBuilder.group({
      email: ['prueba@prueba.com', [Validators.required, CustomValidators.email()]],
      passwords: this.formBuilder.group({
        password: ['12345678', [Validators.required, Validators.minLength(8)]],
        password_confirmation: ['12345678', [Validators.required, Validators.minLength(8)]],
      }, { validator: [CustomValidators.matchPasswords] }),
      person: this.formBuilder.group({
        pName: ['Nombre Prueba', [Validators.required]],
        pLastName: ['Apellido Prueba', [Validators.required]],
        pIdentification: ['1140890987', [Validators.required, Validators.minLength(6)]],
        pPhoneNumber: ['3109878765', [Validators.required, Validators.minLength(7)]],
      }),
      company: this.formBuilder.group({
        cName: ['Empresa de Prueba', [Validators.required]],
        cNit: ['800000000', [Validators.required]],
      }),
      personType: [PersonType.NATURAL, [Validators.required]],
    });
  }

  onSubmit() {
    this.mm.showLoadingDialog();
    const u = {
      email: this.email.value,
      password: this.password.value,
      password_confirmation: this.password_confirmation.value,
      person: this.personType.value === PersonType.NATURAL ? {
        name: this.pName.value,
        last_name: this.pLastName.value,
        identification: this.pIdentification.value,
        phone_number: this.pPhoneNumber.value,
      } : undefined,
      company: this.personType.value === PersonType.JURIDICA ? {
        name: this.cName.value,
        nit: this.cNit.value
      } : undefined,
      renter: this.willRent ? {

      } : undefined
    };
    this.authService.signup(u)
      .subscribe(res => {
        this.mm.closeLoadingDialog();
        this.router.navigate([this.authService.redirectUrl ? this.authService.redirectUrl : '']);
      },
        (err) => {
          this.mm.closeLoadingDialog();

          if (typeof err === 'string') {
            this.errors = {
              message: err
            };
          } else {
            this.errors = err;
            for (const control of Object.keys(this.userForm.controls)) {
              this.userForm.get(control).markAsDirty();
              this.userForm.get(control).markAsTouched();
            }
          }
        });
  }

  getErrorMessage(formControl: AbstractControl, error?) {
    if (error && error.length) {
      return error[0];
    } else {
      return StaticMethods.getFormError(formControl);
    }
  }

  renterChange(ev) {
    console.log(ev);
  }
}
