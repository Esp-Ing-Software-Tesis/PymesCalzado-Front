import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { Auth } from '../models/auth.model';
import { jwtDecode } from 'jwt-decode';
import { JwtPayloadCustom } from './login.interface';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginPageComponent {
  inputDocument: string = '';
  inputPassword: string = '';
  passwordVisible: boolean = false;
  errorMessage: string | null = null;

  private readonly authservice = inject(AuthService);
  private readonly router = inject(Router);

  // Logica para acomodar los textos
  private capitalize(word: string): string {
    if (!word) return '';
    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
  }

  constructor() {}

  togglePasswordVisibility() {
    this.passwordVisible = !this.passwordVisible;
  }

  sortTexts(text: string): string {
    if (!text) return '';
    return text
      .split(' ')
      .map((word) => this.capitalize(word))
      .join(' ');
  }

  // Realizar Login
  login() {
    this.errorMessage = null;
    const consultToken: Auth = {
      docNumber: Number(this.inputDocument),
      password: this.inputPassword,
    };
    this.authservice.getAccessToken(consultToken).subscribe({
      next: (res) => {
        // Validar si la respuesta indica usuario inválido
        if (res?.success === false && res?.message?.includes('Usuario invalido')) {
          this.errorMessage =
            'Número de documento o contraseña incorrectos. Verifica que los datos ingresados sean correctos e inténtalo nuevamente.';
          return;
        }

        // Obtener el token normalmente
        const token = res?.data?.token;
        if (!token) {
          return;
        }

        // Decodificar el token
        const decoded = jwtDecode<JwtPayloadCustom>(token);
        const userId = decoded.userId;
        const username = this.sortTexts(decoded.username);
        const role = this.sortTexts(decoded.role);
        const sessionId = decoded.sessionId;
        let productionLine = decoded.productionLine ? this.sortTexts(decoded.productionLine) : null;

        // Solo para pruebas
        if (userId === 1024575050) {
          productionLine = 'Corte';
        }
        if (userId === 1024575051) {
          productionLine = 'Bordado';
        }

        // Guardar información en el servicio de autenticación
        this.authservice.setRole(role);
        this.authservice.setUsername(username);
        this.authservice.setUserProductionLine(productionLine);
        this.authservice.setSessionId(sessionId);
        this.authservice.setToken(token);
        this.authservice.setUserId(userId + '');

        // Redirigir según el rol
        let redirectRoute = '';
        switch (role) {
          case 'Gerente':
            redirectRoute = '/usuarios';
            break;
          case 'Administrador':
            redirectRoute = '/pedidos-tareas';
            break;
          case 'Operario':
            redirectRoute = '/tareas';
            break;
          default:
            redirectRoute = '/login';
        }

        this.router.navigate([redirectRoute]);
      },
      error: () => {
        this.errorMessage = 'Ocurrió un error al iniciar sesión. Inténtalo nuevamente.';
      },
    });
  }
}
