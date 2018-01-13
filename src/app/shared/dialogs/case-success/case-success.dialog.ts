import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { MultaCode } from '../../shared.model';

@Component({
  templateUrl: 'case-success.dialog.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['case-success.dialog.scss']
})
export class CaseSuccessDialog {

  constructor(
    public dialogRef: MatDialogRef<CaseSuccessDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
