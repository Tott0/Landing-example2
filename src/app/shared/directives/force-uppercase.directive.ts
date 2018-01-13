import { Directive, HostListener, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Directive({
  selector: '[appForceUppercase]'
})
export class ForceUppercaseDirective {

  @Input() formControl: AbstractControl;

  constructor() { }

  @HostListener('input') onInput() {
    this.formControl.setValue(this.formControl.value.toUpperCase());
  }

}
