import { Directive, ElementRef, HostListener, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Directive({
  selector: '[appForceTimeValue]'
})
export class ForceTimeValueDirective {

  @Input() formControl: AbstractControl;

  constructor(private el: ElementRef) { }

  @HostListener('input') onInput() {
    if (this.formControl) {
      let val = this.formControl.value;
      if (typeof +val === 'number') {
        val = ('0' + val).slice(-2);
      }
      this.formControl.setValue(val);
    } else {
      let val = this.el.nativeElement.value;
      if (typeof +val === 'number') {
        val = ('0' + val).slice(-2);
      }
      this.el.nativeElement.value = val;
    }
  }

}
