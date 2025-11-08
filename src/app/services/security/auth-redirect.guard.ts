import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';

export const AuthRedirectGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isAuthenticated()) {
    router.navigate(['/view/home']);
  } else {
    router.navigate(['/login']);
  }

  return false; // Cancelamos la ruta raíz porque ya redirigimos
};
