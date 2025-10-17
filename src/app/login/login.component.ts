import { Component } from '@angular/core';
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

  // Logica para acomodar los textos
  private capitalize(word: string): string {
    if (!word) return '';
    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
  }

  constructor(
    private authservice: AuthService,
    private router: Router,
  ) {}

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
    const consultToken: Auth = {
      docNumber: Number(this.inputDocument),
      password: this.inputPassword,
    };
    this.authservice.getAccessToken(consultToken).subscribe({
      next: (res) => {
        // Obtener el token
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
        const productionLine = decoded.productionLine ? this.sortTexts(decoded.productionLine) : null;

        this.authservice.setRole(role);
        this.authservice.setUsername(username);
        this.authservice.setUserProductionLine(productionLine);
        this.authservice.setSessionId(sessionId);
        this.authservice.setToken(token);
        this.authservice.setUserId(userId + '')

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
      error: (err) => {
        console.log(err);
      },
    });
  }
}
