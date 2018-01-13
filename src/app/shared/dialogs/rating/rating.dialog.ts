import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { MultaCode } from '../../shared.model';

@Component({
  templateUrl: 'rating.dialog.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['rating.dialog.scss']
})
export class RatingDialog {

  rating: number;
  message: string;

  constructor(
    public dialogRef: MatDialogRef<RatingDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.rating = data.rating;
    this.message = data.message;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
