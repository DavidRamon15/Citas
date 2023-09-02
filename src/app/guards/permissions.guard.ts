

import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanLoad } from '@angular/router';
import { LoginService } from '../services/login.service';
import { map, catchError, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class permissionsGuard {
  constructor(private _loginService: LoginService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this._loginService.isUserAllowedToAccessRoute()
      .pipe(
        tap(response => {
          if (!response) {
            this.router.navigate(['/login'])

          }
        })
      )

  }

}
