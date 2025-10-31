import { Injectable, inject } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  private readonly router = inject(Router);

  canActivate(): boolean {
    const role = sessionStorage.getItem('role'); // verifica si hay rol guardado

    if (role) {
      // si hay rol, permite entrar
      return true;
    } else {
      sessionStorage.clear();
      localStorage.clear();
      // si no hay rol, redirige a login y bloquea ruta
      this.router.navigate(['/login']);
      return false;
    }
  }
}
