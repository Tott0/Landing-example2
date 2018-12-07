import { Component, OnInit, OnDestroy } from '@angular/core';
import { AppConstants } from '@app/app-constants';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  selectedService = 0;

  constructor() { }

  ngOnInit() {
    AppConstants.isAtHome = true;
  }

  ngOnDestroy() {
    AppConstants.isAtHome = false;
  }

}
