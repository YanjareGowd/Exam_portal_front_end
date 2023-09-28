import { CanActivateFn, Router } from '@angular/router';
import { LoginService } from './login.service';
import { inject } from '@angular/core';

export const normalGuard: CanActivateFn = (route, state) => {


  const router=inject(Router);
  const login=inject(LoginService);
  
  if (login.isLoggedIn() == true && login.getUserRole()=='NORMAL') 
    {
      return true
    }

    router.navigate(['login']);

    return false;

 
};
