import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { Parameter } from '../../models/warehouse.model';

@Component({
  templateUrl: 'warehouse-filters.dialog.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['warehouse-filters.dialog.scss']
})
// tslint:disable-next-line:component-class-suffix
export class WarehouseFiltersDialog implements OnInit {

  storage: boolean[];
  parameters: any;

  constructor(
    public dialogRef: MatDialogRef<WarehouseFiltersDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.storage = data.storage.map(str => str === 0 ? false : true);
    this.parameters = data.parameters;
    console.log('qqqq', this.parameters);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
  }
}
