import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Component, OnInit, Input } from '@angular/core';
import { Validators, FormBuilder, FormGroup, AbstractControl } from '@angular/forms';
import { StaticMethods } from '../../../utils/static-methods';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-step-basic-info',
  templateUrl: './step-basic-info.component.html',
  styleUrls: ['./step-basic-info.component.scss']
})
export class StepBasicInfoComponent implements OnInit {

  daysSelected: boolean[] = Array(7).fill(false);
  daysEnabled = true;

  timeRange = ['6', 'am', '6', 'pm', '00', '00'];
  timeEnabled = true;

  photos: any[] = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private domSanitizer: DomSanitizer
  ) { }

  ngOnInit() {
  }

  onSubmit() {
    // this.mm.showLoadingDialog();
  }

  getErrorMessage(formControl: AbstractControl, error) {
    if (error && error.length) {
      return error[0];
    } else {
      return StaticMethods.getFormError(formControl);
    }
  }

  dayModeChaged(ev) {
    console.log(this.daysSelected);
    switch (+ev) {
      case 1:
        this.daysEnabled = true;
        break;
      case 2:
        this.daysSelected = Array(7).fill(true);
        this.daysEnabled = false;
        break;
    }
    console.log(this.daysSelected);

  }
  timeModeChanged(ev) {
    switch (+ev) {
      case 1:
        this.timeEnabled = true;
        break;
      case 2:
        this.timeRange = ['00', 'am', '00', 'am', '00', '00'];
        this.timeEnabled = false;
        break;
    }
  }

  onFile(files) {
    console.log(files);
    if (this.photos.length + files.length > 5) {
      this.errors.photos = 'Solo se pueden seleccionar máximo 5 archivos';
    } else {
      for (let f of files) {
        f = {
          file: f,
          url: URL.createObjectURL(f),
        };
        this.photos = this.photos.concat(f);
      }
    }
    console.log(this.photos);
  }

}
