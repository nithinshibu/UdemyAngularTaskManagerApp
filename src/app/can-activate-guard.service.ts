import { inject } from '@angular/core';
import { LoginService } from './login.service';
import { CanActivateFn, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

export const CanActivateGuardService: CanActivateFn = (route, state) => {
  const jwtService = inject(JwtHelperService);
  var token = sessionStorage.getItem('currentuser')
    ? JSON.parse(sessionStorage.getItem('currentuser') as string).token
    : null;
  const loginService = inject(LoginService);
  const router = inject(Router);
  const expectedRole = route.data['expectedRole'];
  if (
    !loginService.isAuthenticated() &&
    jwtService.decodeToken(token).role != expectedRole
  ) {
    router.navigate(['login']);
    return false;
  }
  return true;
};
