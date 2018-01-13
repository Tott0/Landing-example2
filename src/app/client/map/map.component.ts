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
  results: any[] = [
    {
      name: 'Bodega 1',
      address: 'Calle c Kra 2',
      lat: 11.020699,
      lng: -74.842199,
    },
    {
      name: 'Bodega 2',
      address: 'Via 40 720',
      lat: 11.01746,
      lng: -74.7952625
    },
    {
      name: 'Bodega 3',
      address: 'Kra 40 Calle C',
      lat: 10.989747,
      lng: -74.774055
    },
    {
      name: 'Bodega 4',
      address: 'Avenida 80 Esquina',
      lat: 10.905396,
      lng:  -74.813534
    },
    {
      name: 'Bodega 5',
      address: 'Calle calle Kra kra',
      lat: 10.9388873,
      lng: -74.767401
    },
  ];

  ngOnInit() {
  }

}
