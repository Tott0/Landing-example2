import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { AuthService } from '../core/providers/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService
  ) { }

  ngOnInit() {

  }

  isLoggedIn() {
    return this.authService.user;
  }

  home() {
    this.router.navigate(['/']);
  }
}
