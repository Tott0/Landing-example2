import { Router, ActivatedRoute, ParamMap, ActivatedRouteSnapshot } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { AuthService } from '../core/providers/auth.service';
import { ModalManager } from '../core/providers/modal-manager';

import { PersonType } from '../shared/enums/person-type.enum';

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
    setTimeout(() => {
      this.authService.check()
        .then((res) => {
          this.mm.closeLoadingDialog();
          if (this.authService.redirectUrl) {
            this.router.navigate([this.authService.redirectUrl]);
            this.authService.redirectUrl = undefined;
          } else {
            this.goToHome();
          }
        })
        .catch((err) => {
          this.mm.closeLoadingDialog();
          this.router.navigate(['/login']);
        });
      this.mm.showLoadingDialog();
    });
  }

  goToHome() {
    switch (this.authService.user.type_user) {
      case PersonType.ABOGADO:
        this.router.navigate(['/abogado']);
        break;
      case PersonType.ADMIN:
        this.router.navigate(['/admin']);
        break;
      default:
        this.router.navigate(['/usuario']);
        break;
    }
  }

}
