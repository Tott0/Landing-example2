import { Directive, ElementRef, HostListener, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Directive({
  selector: '[appForceValue]'
})
export class ForceValueDirective {

  @Input() formControl: AbstractControl;
  @Input() min;
  @Input() max;

  constructor(private el: ElementRef) { }

  @HostListener('input') onInput() {
    let value;
    if (this.formControl) {
      value = this.formControl.value;
    } else {
      value = this.el.nativeElement.value;
    }

    if (this.min && value < this.min) {
      value = this.min;
    } else if (this.max && value > this.max) {
      value = this.max;
    }

    if (this.formControl) {
      this.formControl.setValue(value);
    } else {
      this.el.nativeElement.value = value;
    }
  }

}
