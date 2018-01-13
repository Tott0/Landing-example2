import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalManager } from '../../core/providers/modal-manager';

import { AgmMap, MouseEvent } from '@agm/core';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  @ViewChild(AgmMap) map: AgmMap;
  constructor(
    private mm: ModalManager,
  ) { }

  iLat = 10.9838314;
  iLng = -74.8136909;
  zoom = 14;

  ngOnInit() {
  }

}
