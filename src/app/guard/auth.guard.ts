import {CanActivateFn, Router} from '@angular/router';
import {AuthService} from "../service/auth-service.service";
import {inject} from "@angular/core";

export const authGuard: CanActivateFn = (route, state) => {
  const authService: AuthService = inject(AuthService);
  const router = inject(Router);

  if (authService.getAuthStatus()) {
    return true;
  } else {
    alert("Sem permissão")
    router.navigate(['/login']);
    return false;
  }

};
