import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './services/auth.service';

export const authGuard = (target: 'login' | 'home' = 'home'): CanActivateFn => {
  return () => {
    const auth = inject(AuthService);
    const router = inject(Router);
    const loggedIn = auth.isLoggedIn();

    if (target === 'login') {
      return loggedIn ? router.createUrlTree(['/home']) : true;
    }
    return loggedIn ? true : router.createUrlTree(['/login']);
  };
};