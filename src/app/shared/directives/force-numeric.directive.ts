import { Directive, ElementRef, HostListener, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Directive({
  selector: '[appForceNumeric]'
})
export class ForceNumericDirective {

  @Input() formControl: AbstractControl;

  constructor(private el: ElementRef) { }

  @HostListener('input') onInput() {
    if (this.formControl) {
      this.formControl.setValue(this.formControl.value.replace(/[^0-9]/g, ''));
    } else {
      this.el.nativeElement.value = this.el.nativeElement.value.replace(/[^0-9]/g, '');
    }
  }

}
