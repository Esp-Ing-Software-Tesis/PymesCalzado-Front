import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    const role = sessionStorage.getItem('role'); // verifica si hay rol guardado

    if (role) {
      // si hay rol, permite entrar
      return true;
    } else {
      localStorage.clear();
      // si no hay rol, redirige a login y bloquea ruta
      this.router.navigate(['/login']);
      return false;
    }
  }
}