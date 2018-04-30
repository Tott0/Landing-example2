import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { AuthService } from '@app/core';
import { Router } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import { FromEventObservable } from 'rxjs/observable/FromEventObservable';
import { ModalManager } from './core/providers/modal-manager';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(
    private router: Router,
    private aService: AuthService,
    private mm: ModalManager
  ) {

  }

  ngOnInit() {
    const unloadSub = FromEventObservable.create(window, 'beforeunload').subscribe((event: BeforeUnloadEvent) => {
      console.log('beforeunloadsub');
      localStorage.removeItem(sessionStorage.getItem('sessionTag'));
      unloadSub.unsubscribe();
    });
    const loadSub = FromEventObservable.create(window, 'load').subscribe((event) => {
      console.log('loadsub');
      localStorage.setItem(sessionStorage.getItem('sessionTag'), 'true');
      loadSub.unsubscribe();
    });
    const subscription = FromEventObservable.create(window, 'storage').subscribe((event: StorageEvent) => {
      if (!event || !event.key || (!event.key.includes('session') && !event.key.includes('token'))) {
        return;
      }
      if (!sessionStorage.getItem('token')) {
        if (event.key.includes('token')) {
          if (event.newValue) {
            sessionStorage.setItem('token', event.newValue.split('_')[0]);
            localStorage.removeItem('token');
            this.aService.tabSessionSbj.next();
            this.aService.checkSessionToken().subscribe(res => {
              if (res) {
                this.mm.closeLoadingDialog();
              }
            });
          }
        }
      } else {
        if (event.key.includes('sessionTag_')) {
          if (event.newValue) {
            localStorage.setItem('token',
              sessionStorage.getItem('token') + '_' + new Date().getTime() + Math.round(Math.random() * 10000));
          }
        }
      }
    });

    const sc = 'sessionTag_' + new Date().getTime() + Math.round(Math.random() * 10000);
    localStorage.setItem(sc, 'true');
    sessionStorage.setItem('sessionTag', sc);
    if (sessionStorage.getItem('token')) {
      setTimeout(() => {
        this.aService.tabSessionSbj.next();
        this.aService.checkSessionToken().subscribe(res => {
          if (res) {
            this.mm.closeLoadingDialog();
          }
        });
      });
    }

    this.aService.logoutSbj.subscribe(() => {
      this.router.navigate(['/login']);
    }
    );
  }
}
