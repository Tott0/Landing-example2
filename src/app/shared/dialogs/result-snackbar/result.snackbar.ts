import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { MAT_SNACK_BAR_DATA } from '@angular/material';


@Component({
  templateUrl: 'result.snackbar.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['result.snackbar.scss']
})
// tslint:disable-next-line:component-class-suffix
export class ResultSnackbar {

  goodResult: boolean;
  message: string;

  constructor( @Inject(MAT_SNACK_BAR_DATA) public data: any) {
    this.goodResult = data.goodResult;
    this.message = data.message;
  }

}
