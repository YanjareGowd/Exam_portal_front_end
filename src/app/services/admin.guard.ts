
import { CanActivateFn, Router } from '@angular/router';
import { LoginService } from './login.service';
import { inject } from '@angular/core';
import { LoginComponent } from '../pages/login/login.component';

export const adminGuard: CanActivateFn = (route, state) => {

  const router=inject(Router);
  const login=inject(LoginService)

  if (login.isLoggedIn() == true && login.getUserRole()=='ADMIN') 
    {
      return true
    }

    router.navigate(['login']);

    return false;
  }



/*
import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
  UrlTree,
  CanActivateFn,
} from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from './login.service';
@Injectable({
  providedIn: 'root',
})
export class adminGuard {
  constructor(private login:LoginService, private router:Router) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | UrlTree | boolean {

    if (this.login.isLoggedIn() == true && this.login.getUserRole()=='ADMIN') 
    {
      return true
    }

    this.router.navigate(['login']);

    return false;
  }
}
*/