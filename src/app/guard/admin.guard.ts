import {CanActivateFn, Router} from '@angular/router';
import {AuthService} from '../service/auth-service.service';
import {inject} from "@angular/core";

export const adminGuard: CanActivateFn = (route, state) => {
  const authService: AuthService = inject(AuthService);
  const router = inject(Router);

  if (authService.isAutenticado) {
    if (authService.isAdmin) {
      return true;
    } else {
      alert("Você não tem permissão")
      router.navigate(['/dashboard']);
      return false;
    }
  } else {
    console.log('Você não esta autenticado');
    router.navigate(['/login']);
    return false;
  }
};
