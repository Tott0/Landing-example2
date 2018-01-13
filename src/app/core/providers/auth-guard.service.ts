import { Injectable } from '@angular/core';
import {
  CanActivate, Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';
import { AuthService } from './auth.service';

import { PersonType } from '../../shared/enums/person-type.enum';

const redirect = (user, router, which) => {
  if (user) {
    switch (user.type_user) {
      case PersonType.ABOGADO:
        router.navigate(['/abogado']);
        break;
      case PersonType.ADMIN:
        router.navigate(['/admin']);
        break;
      default:
        router.navigate(['/usuario']);
        break;
    }
  } else {
    router.navigate(['']);
  }
};

@Injectable()
export class LoginAuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private authService: AuthService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const url: string = state.url;

    return this.checkLogin(url);
  }

  checkLogin(url: string): boolean {
    if (this.authService.user) { return true; }

    this.authService.redirectUrl = url;

    redirect(this.authService.user, this.router, 1);

    return false;
  }
}

@Injectable()
export class LawyerAuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private authService: AuthService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const url: string = state.url;

    return this.checkLogin(url);
  }

  checkLogin(url: string): boolean {
    if (this.authService.user && this.authService.user.type_user === PersonType.ABOGADO) { return true; }

    this.authService.redirectUrl = url;

    redirect(this.authService.user, this.router, 2);

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

    return this.checkLogin(url);
  }

  checkLogin(url: string): boolean {
    if (this.authService.user && this.authService.user.type_user === PersonType.ADMIN) { return true; }

    this.authService.redirectUrl = url;

    redirect(this.authService.user, this.router, 3);

    return false;
  }
}

@Injectable()
export class PersonAuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private authService: AuthService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const url: string = state.url;

    return this.checkLogin(url);
  }

  checkLogin(url: string): boolean {
    if (this.authService.user &&
      (this.authService.user.type_user === PersonType.JURIDICA || this.authService.user.type_user === PersonType.NATURAL)) {
      return true;
    }

    this.authService.redirectUrl = url;

    redirect(this.authService.user, this.router, 4);

    return false;
  }
}
