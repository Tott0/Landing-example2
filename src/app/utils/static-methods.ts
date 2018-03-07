import { HttpHeaders, HttpErrorResponse } from '@angular/common/http';

import { AuthService } from '../../app/core/providers/auth.service';

import { AbstractControl } from '@angular/forms';
import { ModalManager } from '../core/providers/modal-manager';

export class StaticMethods {

  static handleHttpResponseError(error: HttpErrorResponse) {
    console.log(error);
    let err;
    if (!error.status) {
      // non request related error
      return 'Error';
    } else {
      if (error.error instanceof Error) {
        // A client-side or network error occurred. Handle it accordingly.
        console.error('An error occurred:', error.error.message);
        return 'Error de Conexión';
      } else {
        if (error.error) {
          if (error.error.errors) {
            err = {};
            const keys = Object.keys(error.error.errors);
            for (const key of keys) {
              const e = error.error.errors[key];
              if (!Array.isArray(e)) {
                err[key] = [e];
              } else {
                err[key] = e;
              }
            }
          } else if (error.error.message) {
            err = error.error.message;
          }
        } else {
          err = 'Error de Conexión';
        }
        return err;
      }
    }
  }

  static handleErrorAlerts(mm: ModalManager, error: any, showErrors = true): boolean {
    console.error(error);
    if (error.status >= 500) {
      mm.showMessageDialog({
        data: {
          title: 'Error',
          message: 'Error de Conexión'
        }
      });
      return false;
    } else if (showErrors) {
      mm.showMessageDialog({
        data: {
          title: 'Error',
          message: StaticMethods.handleHttpResponseError(error)
        }
      });
      return true;
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
    const copy = {};
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
