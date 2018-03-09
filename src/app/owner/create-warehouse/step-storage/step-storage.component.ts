import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Component, OnInit, Input } from '@angular/core';
import { Validators, FormBuilder, FormGroup, AbstractControl } from '@angular/forms';
import { StaticMethods } from '../../../utils/static-methods';
import { ModalManager } from '../../../core/providers/modal-manager';

import { MatTableDataSource } from '@angular/material';
import { Position, MeasureType, PositionType } from '../../../shared/models/warehouse.model';

@Component({
  selector: 'app-step-storage',
  templateUrl: './step-storage.component.html',
  styleUrls: ['./step-storage.component.scss']
})
export class StepStorageComponent implements OnInit {

  @Input() parameters: any;

  storageColumns = ['number', 'unit', 'space', 'price', 'height', 'weight', 'actions'];
  storageDataSource = new MatTableDataSource();

  newPosition: Position = new Position();

  PositionType = PositionType;
  MeasureType = MeasureType;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private mm: ModalManager,
  ) { }

  ngOnInit() {
    this.storageDataSource.data = [];
  }

  onSubmit() {
    // this.mm.showLoadingDialog();
  }

  addPosition() {

  }
  isNewPositionInvalid() {
    return true;
  }

}
