import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup, AbstractControl } from '@angular/forms';

import { AuthService } from '../../app/core/providers/auth.service';
import { StaticMethods } from '../../app/utils/static-methods';
import { ModalManager } from '../../app/core/providers/modal-manager';
import { CustomValidators } from '../../app/shared/custom-validators';
import { UserType, User } from '../shared/models/user.model';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: [
    './auth.component.scss'
  ]
})
export class AuthComponent implements OnInit {

  errors: any = {};
  loginForm: FormGroup;
  get email() { return this.loginForm.get('email'); }
  get password() { return this.loginForm.get('password'); }

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private mm: ModalManager,
  ) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required]],
      password: ['', Validators.compose([Validators.required, Validators.minLength(8)])]
    });
  }

  onSubmit() {
    this.mm.showLoadingDialog();
    const u = {
      email: this.email.value,
      password: this.password.value
    };
    this.authService.login(u)
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
            for (const control of Object.keys(this.loginForm.controls)) {
              this.loginForm.get(control).markAsDirty();
              this.loginForm.get(control).markAsTouched();
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

}

