import { HttpHeaders, HttpErrorResponse } from '@angular/common/http';

import { AuthService } from '@core/providers/auth.service';

import { AbstractControl, FormGroup, FormControl } from '@angular/forms';
import { ModalManager } from '@core/providers/modal-manager';

export function getErrorMessage(formControl: AbstractControl, error?) {
  if (error && error.length) {
    return error[0];
  } else {
    return StaticMethods.getFormError(formControl);
  }
}

export function getTimeBySlot(t) {
  let r = '';
  r += ('0' + Math.floor(t / 4)).slice(-2);
  r += ':';
  r += ('0' + (t % 4 * 15)).slice(-2);
  if (t < 12 * 4) {
    r += 'am.';
  } else if (t === 12 * 4) {
    r += 'm.';
  } else {
    r += 'pm.';
  }
  return r;
}

export class StaticMethods {

  static handleHttpResponseError(errorResponse: HttpErrorResponse) {
    console.log(errorResponse);
    if (errorResponse.status) {
      const error = errorResponse.error;
      let err;
        if (error.errors) {
          err = {};
          const keys = Object.keys(error.errors);
          for (const key of keys) {
            const e = error.errors[key];
            if (!Array.isArray(e)) {
              err[key] = [e];
            } else {
              err[key] = e;
            }
          }
        } else {
          err = error.message || error.error;
        }
        return err || 'Error de Conexión';
      } else {
      return 'Error';
    }
  }

  static getParams(options: object, append = false): string {
    if (!options) {
      return '';
    }
    let params = '';
    const keys = Object.keys(options);
    if (keys.length) {
      let first = true;
      let appender = append ? '&' : '?';
      for (const key of keys) {
        if (options[key] || options[key] === 0) {
          appender = first ? appender : '&';
          params += appender + key + '=' + options[key];
          first = false;
        }
      }
    }
    return params;
  }

  static getAge(dateString) {
    const today = new Date();
    const birthDate = new Date(dateString);
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    const d = today.getDate() - birthDate.getDate();
    if (m < 0 || (m === 0 && d < 0)) {
      age--;
    }
    return age;
  }

  static deepCopy(object: any): any {
    const copy = object instanceof Array ? [] : {};
    Object.keys(object).map((key, index) => {
      if (object[key] instanceof Object) {
        copy[key] = StaticMethods.deepCopy(object[key]);
      } else {
        copy[key] = object[key];
      }
    });
    return copy;
  }

  static round(value, decimals) {
    return Number(Math.round(Number(value + 'e' + decimals)) + 'e-' + decimals);
  }

  static setFormErrors(formGroup: FormGroup, errors: any) {
    for (const control of Object.keys(formGroup.controls)) {
      const ac = formGroup.get(control);
      if (ac instanceof FormControl) {
        if (errors[control]) {
          ac.markAsDirty();
          ac.markAsTouched();
          ac.setErrors({ 'async': true });
        }
      } else if (ac instanceof FormGroup) {
        StaticMethods.setFormErrors(ac as FormGroup, errors); // could be errors[control] also if it's nested
      }
    }
  }

  static getFormError(formControl: AbstractControl): string {
    if (formControl.hasError('required')) {
      return `Este campo es obligatorio`;
    }
    if (formControl.hasError('email')) {
      return `No es un correo electrónico válido`;
    }
    if (formControl.hasError('maxlength')) {
      return `Este campo debe tener máximo ${formControl.getError('maxlength')['requiredLength']} caracteres`;
    }
    if (formControl.hasError('minlength')) {
      return `Este campo debe tener mínimo ${formControl.getError('minlength')['requiredLength']} caracteres`;
    }
    if (formControl.hasError('min')) {
      return `El valor mínimo es ${formControl.hasError('min')['min']}`;
    }
    if (formControl.hasError('max')) {
      return `El valor máximo es ${formControl.hasError('max')['max']}`;
    }
    if (formControl.hasError('alphanumeric')) {
      return `Este campo sólo admite números y letras`;
    }
    if (formControl.hasError('fullname')) {
      return `Este campo sólo admite letras y espacios`;
    }
    if (formControl.hasError('numeric')) {
      return `Este campo sólo admite números`;
    }
    if (formControl.hasError('invalidUrl')) {
      return `Dirección no válida`;
    }
    if (formControl.hasError('mismatch')) {
      return `Las contraseñas no coinciden`;
    }
    if (formControl.hasError('range')) {
      return `Valor Final debe ser mayor al valor Inicial`;
    }
  }

  static separateByCapital(text: string): string {
    const regex = /([^\s])([A-Z])/g;
    return text.replace(regex, '$1 $2');
  }
}

