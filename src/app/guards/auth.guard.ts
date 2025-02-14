import {CanActivateFn, Router} from '@angular/router';
import {inject} from '@angular/core';
import {AuthService} from '../service/auth/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isAuthenticated()) {
    return true; // User is authenticated, allow access
  }

  // Redirect to login page with a return URL
  return router.createUrlTree(['/login'], { queryParams: { returnUrl: state.url } });
};
