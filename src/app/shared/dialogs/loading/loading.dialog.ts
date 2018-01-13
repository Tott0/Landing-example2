import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
  templateUrl: 'loading.dialog.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['loading.dialog.scss']
})
export class LoadingDialog {

  motive = '';

  constructor(
    public dialogRef: MatDialogRef<LoadingDialog>) { }
}
