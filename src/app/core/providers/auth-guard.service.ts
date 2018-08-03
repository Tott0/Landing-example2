import { Injectable } from '@angular/core';
import {
  CanActivate, Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';
import { AuthService } from './auth.service';
import { UserType } from '@shared/models/user.model';
import { ModalManager } from './modal-manager';

@Injectable()
export class LoginAuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private authService: AuthService,
    private mm: ModalManager) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const url: string = state.url;

    return this.checkLogin(url);
  }

  checkLogin(url: string): boolean {
    if (this.authService.user) { return true; }

    console.log('#LoginAuthGuard');
    this.authService.redirectUrl = url;

    this.mm.showLoadingDialog();
    this.authService.check()
      .subscribe(res => {
        console.log('#LoginAuthGuard#succ');
        this.router.navigate([this.authService.redirectUrl]);
      }, err => {
        console.log('#LoginAuthGuard#err');
        this.router.navigate(['/login']);
      }, () => {
        this.mm.closeLoadingDialog();
      });

    return false;
  }
}

@Injectable()
export class AdminAuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private authService: AuthService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const url: string = state.url;

    return this.isAdmin(url);
  }

  isAdmin(url: string): boolean {
    if (this.authService.user.role === UserType.ADMIN) { return true; }

    this.authService.redirectUrl = url;

    this.router.navigate(['']);

    return false;
  }
}
