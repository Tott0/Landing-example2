import { Router, ActivatedRoute, ParamMap, ActivatedRouteSnapshot } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { AuthService } from '../core/providers/auth.service';
import { ModalManager } from '../core/providers/modal-manager';
import { UserType } from '../shared/models/user.model';


@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService,
    private mm: ModalManager
  ) { }

  ngOnInit() {

  }

}
