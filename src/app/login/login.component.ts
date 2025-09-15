import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

interface LoginForm {
  rol: string;
  username: string;
  productionLine: string | null;
  state: string;
}

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginPageComponent {
  inputEmail: string = '';
  inputPassword: string = '';
  loginForm: LoginForm | null = null;
  passwordVisible: boolean = false;
  errorMessage: string | null = null;

  constructor(
    private authservice: AuthService,
    private router: Router,
  ) {}

  togglePasswordVisibility() {
    this.passwordVisible = !this.passwordVisible;
  }

  login() {
    this.loginForm = this.setMockLoginForm(this.inputEmail, this.inputPassword);
    if (this.loginForm) {
        if (this.loginForm.state === 'Inactivo') {
            this.errorMessage = 'Tu usuario se encuentra inactivo. Por favor, contacta al administrador del sistema para más información.';
            return;
        }
      this.authservice.setRole(this.loginForm.rol);
      this.authservice.setUsername(this.loginForm.username);
      this.authservice.setUserProductionLine(this.loginForm.productionLine);

      // Redirigir según el rol (o a una ruta común)
      let redirectRoute = '';
      switch (this.loginForm.rol) {
        case 'Gerente':
          redirectRoute = '/usuarios';
          break;
        case 'Administrador':
          redirectRoute = '/pedidos-administrador';
          break;
        case 'Operario':
          redirectRoute = '/tareas';
          break;
        default:
          redirectRoute = '/login';
      }
      this.router.navigate([redirectRoute]);
    } else if (!this.loginForm) {
      this.errorMessage = 'Correo o contraseña incorrectos. Verifica que los datos ingresados sean correctos e inténtalo nuevamente.';
    }
  }

  // Mock de formulario de inicio de sesión

  private setMockLoginForm(inputEmail: string, inputPassword: string) {
    if (inputEmail === 'gerente@yopmail.com' && inputPassword === '123456') {
      return {
        rol: 'Gerente',
        username: 'Miguel Herrera',
        productionLine: null,
        state: 'Activo',
      };
    } else if (inputEmail === 'administrador@yopmail.com' && inputPassword === '654321') {
      return {
        rol: 'Administrador',
        username: 'Edwin Paez',
        productionLine: null,
        state: 'Activo',
      };
    } else if (inputEmail === 'operario@yopmail.com' && inputPassword === 'abc123') {
      return {
        rol: 'Operario',
        username: 'Natalia Herrera',
        productionLine: 'Corte',
        state: 'Activo',
      };
    } else if (inputEmail === 'inactivo@yopmail.com' && inputPassword === 'abc321') {
      return {
        rol: 'Operario',
        username: 'Natalia Herrera',
        productionLine: 'Corte',
        state: 'Inactivo',
      };
    } else {
      return null;
    }
  }
}
