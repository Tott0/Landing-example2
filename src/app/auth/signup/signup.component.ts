import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup, AbstractControl, FormControl } from '@angular/forms';

import { AuthService } from '@core/providers/auth.service';
import { StaticMethods } from '@core/static-methods';
import { ModalManager } from '@core/providers/modal-manager';
import { CustomValidators } from '@shared/custom-validators';

import { MatSnackBar, MatSnackBarConfig } from '@angular/material';
import { ResultSnackbar } from '@shared/dialogs/result-snackbar/result.snackbar';

import { PersonType } from '@shared/models/user.model';
import { DocumentFile } from '@shared/models/shared.model';

@Component({
  selector: 'app-signup',
  templateUrl: 'signup.component.html',
  styleUrls: ['signup.component.scss']
})
export class SignupComponent implements OnInit {

  loadedUser = false;

  PersonType = PersonType;
  willRent = false;

  errors: any = {};
  userForm: FormGroup;
  get email() { return this.userForm.get('email'); }
  get phoneNumber() { return this.userForm.get('phone_number'); }
  get cellphoneNumber() { return this.userForm.get('cell_phone'); }
  get personType() { return this.userForm.get('personType'); }
  get passwords() { return this.userForm.get('passwords'); }
  get password() { return this.passwords.get('password'); }
  get password_confirmation() { return this.passwords.get('password_confirmation'); }

  get person() { return this.userForm.get('person'); }

  get pName() { return this.person.get('name'); }
  get pLastName() { return this.person.get('last_name'); }
  get pIdentification() { return this.person.get('identification'); }

  get company() { return this.userForm.get('company'); }
  get cName() { return this.company.get('name'); }
  get cNit() { return this.company.get('nit'); }
  get cRlName() { return this.company.get('rl_name'); }
  get cRlLastName() { return this.company.get('rl_last_name'); }
  get cRlIdentification() { return this.company.get('rl_identification'); }

  get renterForm() { return this.userForm.get('renter'); }
  get matInmobiliaria() { return this.renterForm.get('matricula_inmobiliaria'); }
  bankReference: DocumentFile;
  certLibTra: DocumentFile;
  rut: DocumentFile;

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
      phone_number: ['3109878765', [Validators.minLength(7)]],
      cell_phone: ['31052458547', [Validators.required, Validators.minLength(7)]],
      passwords: this.formBuilder.group({
        password: ['12345678', [Validators.required, Validators.minLength(8)]],
        password_confirmation: ['12345678', [Validators.required, Validators.minLength(8)]],
      }, { validator: [CustomValidators.matchPasswords] }),

      person: this.formBuilder.group({
        name: ['Nombre Prueba', [Validators.required]],
        last_name: ['Apellido Prueba', [Validators.required]],
        identification: ['1140890987', [Validators.required, Validators.minLength(6)]],
      }),

      company: this.formBuilder.group({
        name: ['Empresa de Prueba', [Validators.required]],
        nit: ['800000000', [Validators.required]],
        rl_name: ['800000000', [Validators.required]],
        rl_last_name: ['800000000', [Validators.required]],
        rl_identification: ['800000000', [Validators.required, Validators.minLength(6)]],
      }),
      personType: [PersonType.NATURAL, [Validators.required]],

      renter: this.formBuilder.group({
        matricula_inmobiliaria: ['8asdsd4a6s5f4qaw896gf5q', [Validators.required]]
      })
    });
  }

  onSubmit() {
    this.mm.showLoadingDialog();
    let requestParams;
    if (this.personType.value === PersonType.NATURAL) {
      requestParams = {
        person: {
          type_document: 1, // always CC,
          identification: this.pIdentification.value,
          name: this.pName.value,
          last_name: this.pLastName.value,
          phone_number: this.phoneNumber.value,
          cell_phone: this.cellphoneNumber.value,
          user_attributes: {
            email: this.email.value,
            password: this.password.value,
            password_confirmation: this.password_confirmation.value
          }
        }
      };
    } else {
      requestParams = {
        company: {
          nit: this.cNit.value,
          phone_number: this.phoneNumber.value,
          cell_phone: this.cellphoneNumber.value,
          name: this.cName.value,
          person_attributes: {
            type_document: 1,
            identification: this.cRlIdentification.value,
            name: this.cRlName.value,
            last_name: this.cRlLastName.value,
          },
          user_attributes: {
            email: this.email.value,
            password: this.password.value,
            password_confirmation: this.password_confirmation.value
          }
        }
      };
    }
    if (this.willRent) {
      const child = requestParams.company || requestParams.person;
      child.renter_attributes = {
        bank_reference: this.bankReference,
        certificado_libertad_tradicion: this.certLibTra,
        rut: this.rut,
        matricula_inmobiliaria: this.matInmobiliaria.value,
      };
    }
    this.authService.signup(requestParams)
      .subscribe(res => {
        this.mm.closeLoadingDialog();
        this.router.navigate(['login']);
      },
        (err) => {
          console.log(err);

          if (typeof err === 'string') {
            this.errors = {
              message: err
            };
          } else {
            this.errors = err;
            StaticMethods.setFormErrors(this.userForm, this.errors);
          }
        });
  }

  onFile(file, i) {
    console.log(file);
    if (!file.name.includes('pdf')) {
      this.mm.showResultSnackbar('Extensión de Archivo inválida', false);
      return;
    }
    const f = {
      file: file,
      name: file.name,
      url: URL.createObjectURL(file)
    };
    switch (i) {
      case 0:
        this.bankReference = f;
        break;
      case 1:
        this.certLibTra = f;
        break;
      case 2:
        this.rut = f;
        break;
    }
  }

  getErrorMessage(formControl: AbstractControl, error?) {
    if (error && error.length) {
      console.log(error[0]);
      return error[0];
    } else {
      return StaticMethods.getFormError(formControl);
    }
  }

  invalidRenter() {
    if (!this.willRent) {
      return false;
    }
    return this.renterForm.valid &&
      this.bankReference &&
      this.certLibTra &&
      this.rut;
  }

  onWillRentchange(accordion) {
    this.renterForm.reset();
    this.bankReference = undefined;
    this.certLibTra = undefined;
    this.rut = undefined;
    this.willRent ? accordion.open() : accordion.close();
    console.log(this.willRent);
  }
}
