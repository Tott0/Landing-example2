import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { MultaCode } from '../../shared.model';

import { Observable } from 'rxjs/Observable';
import { startWith, map } from 'rxjs/operators';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';

@Component({
  templateUrl: 'case-reject.dialog.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['case-reject.dialog.scss']
})
export class CaseRejectDialog implements OnInit {

  motive = '';
  title = '';
  showMotive: boolean;

  multaCodes: MultaCode[] = [];
  filteredMultaCodes: Observable<MultaCode[]>;
  mcControl: FormControl = new FormControl();

  constructor(
    public dialogRef: MatDialogRef<CaseRejectDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.title = data.title;
    this.showMotive = data.showMotive;
    this.multaCodes = data.multaCodes;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
    this.filteredMultaCodes = this.mcControl.valueChanges
      .pipe(
      startWith(null),
      // map(val => this.filter(val))
      map(mc => mc && typeof mc === 'object' ? mc.type_multa : mc),
      map(type => type ? this.filter(type) : this.multaCodes.slice())
      );
  }

  filter(type_multa: string) {
    return this.multaCodes.filter(mc =>
      mc.type_multa.toLowerCase().indexOf(type_multa.toLowerCase()) === 0);
  }

  mcDisplayFn(mc: MultaCode) {
    return mc ? mc.type_multa : mc;
  }
}
