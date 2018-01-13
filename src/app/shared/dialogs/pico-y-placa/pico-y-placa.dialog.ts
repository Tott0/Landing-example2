import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { AppConstants } from '../../../app-constants';
import { PicoYPlacaDia } from '../../shared.model';

@Component({
  templateUrl: 'pico-y-placa.dialog.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['pico-y-placa.dialog.scss']
})
export class PicoYPlacaDialog {

  monthNames = AppConstants.dateTranslation.monthNames;

  day: PicoYPlacaDia;
  selectedJornada = 0;

  constructor(
    public dialogRef: MatDialogRef<PicoYPlacaDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.day = data.day;
  }
}
