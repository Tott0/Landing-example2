import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { MultaCode } from '../../shared.model';

import { Observable } from 'rxjs/Observable';
import { startWith, map } from 'rxjs/operators';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';

@Component({
  templateUrl: 'message.dialog.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['message.dialog.scss']
})
export class MessageDialog implements OnInit {

  message = '';
  title = '';

  constructor(
    public dialogRef: MatDialogRef<MessageDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.title = data.title;
    this.message = data.message;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
  }
}
