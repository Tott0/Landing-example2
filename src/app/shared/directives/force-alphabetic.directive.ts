import { Directive, HostListener, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Directive({
  selector: '[appForceAlphabetic]'
})
export class ForceAlphabeticDirective {

  @Input() formControl: AbstractControl;
  @Input() allowSpace = true;

  constructor() { }

  @HostListener('input') onInput() {
    let regex = /[^a-záéíóúñ]/gi;
    if (this.allowSpace) {
      regex = /[^a-záéíóúñ\s]/gi;
    }
    this.formControl.setValue(this.formControl.value.replace(regex, ''));
  }

}
