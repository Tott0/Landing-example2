
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup, AbstractControl } from '@angular/forms';
import { ModalManager } from '@core/providers/modal-manager';
import { StaticMethods } from '@core/static-methods';
import { ClientService } from './client.service';
import { AuthService } from '@app/core/providers/auth.service';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss']
})
export class ClientComponent implements OnInit {

  errors: any = {};

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private mm: ModalManager,
    private cService: ClientService,
    public authService: AuthService
  ) { }

  ngOnInit() {
  }

}

