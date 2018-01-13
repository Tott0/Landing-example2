import { AbstractControl, ValidatorFn, FormGroup } from '@angular/forms';

export class CustomValidators {

  static forbiddenNameValidator(nameRe: RegExp): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
      const forbidden = nameRe.test(control.value);
      return forbidden ? { 'forbiddenName': { value: control.value } } : null;
    };
  }

  static email(): ValidatorFn {
    const nameRe = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,3}$/;
    return (control: AbstractControl): { [key: string]: any } => {
      const email = control.value ? nameRe.test(control.value) : true;
      return !email ? { 'email': { value: control.value } } : null;
    };
  }
  static matchPasswords(g: FormGroup) {
    const password = g.controls.password;
    const password_confirmation = g.controls.password_confirmation;
    if (password.pristine || !password.touched) {
      return null;
    }
    if (password_confirmation.pristine || !password_confirmation.touched) {
      return null;
    }

    if (password.value.length < 8 && password_confirmation.value.length < 8) {
      return null;
    }
    const error = password.value === password_confirmation.value ?
      null : { mismatch: true };

    if (error) {
      password_confirmation.setErrors(['mismatch']);
    }
    return error;
  }

  static youtubeUrl(g: AbstractControl) {
    if (!g.value) {
      return null;
    }
    const regex = /watch\?v=(.+)/;
    const url: string = g.value;
    return url.match(regex) ? null : { invalidUrl: true };
  }
}

