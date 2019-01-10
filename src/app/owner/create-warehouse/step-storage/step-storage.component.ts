import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { Validators, FormBuilder, FormGroup, AbstractControl } from '@angular/forms';
import { StaticMethods } from '@core/static-methods';
import { ModalManager } from '@core/providers/modal-manager';

import { MatTableDataSource } from '@angular/material';
import { Position, MeasureType, PositionType, Warehouse, ServiceType, ServiceParameter } from '@shared/models/warehouse.model';
import { Completable } from '../create-warehouse.component';

// TODO services with cost
@Component({
  selector: 'app-step-storage',
  templateUrl: './step-storage.component.html',
  styleUrls: ['./step-storage.component.scss']
})
export class StepStorageComponent implements OnInit, Completable {
  @ViewChild('additionalServicesContent', { read: ElementRef }) additionalServicesContent: ElementRef;

  @Input() warehouse: Warehouse;
  @Input() services: any;
  additionalServices: any;

  storageColumns = ['number', 'unit', 'space', 'price', 'height', 'weight', 'actions'];
  storageDataSource = new MatTableDataSource<Position>();

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

    this.additionalServices = this.services.filter((s: ServiceParameter) => {
      let show = s.typeService === ServiceType.ADDITIONAL;
      show = show && s.checked;
      return show;
    });
    if (this.additionalServicesContent) {
      this.additionalServicesContent.nativeElement.style.setProperty('--rows-number', this.additionalServices.length * 2);
    }

  }

  onSubmit() {
    // this.mm.showLoadingDialog();
  }

  addPosition() {
    this.storageDataSource.data = [...this.storageDataSource.data, this.newPosition];
    this.warehouse.positions = this.storageDataSource.data;
    this.newPosition = new Position();
  }

  remove(position) {
    this.storageDataSource.data = this.storageDataSource.data.splice(position, 1);
    this.warehouse.positions = this.storageDataSource.data;
  }

  isNewPositionInvalid() {
    return !this.newPosition.typePosition ||
      !this.newPosition.amount ||
      !this.newPosition.price_per_unit ||
      !this.newPosition.max_height ||
      !this.newPosition.max_weight;
  }

  getMeasure(type?) {
    switch (type || this.newPosition.typePosition) {
      case PositionType.FLOOR_CLOSED:
        return 'm<sup>2</sup>';
      case PositionType.FLOOR_OPEN:
        return 'm<sup>2</sup>';
      case PositionType.RACK:
        return 'pallet(s)';
      case PositionType.BOX:
        return 'caja(s)';
      default:
        return '';
    }
  }

  isComplete() {
    return true;
  }

}
