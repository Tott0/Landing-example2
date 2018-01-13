import { Component, Input, OnInit } from '@angular/core';
import { ValidatorFn, AbstractControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-form-error-message',
  templateUrl: './form-errors.component.html'
})
export class FormErrorMessageComponent {
  @Input() formControl: AbstractControl;
  @Input() errors: any[];

  constructor () { }
}
