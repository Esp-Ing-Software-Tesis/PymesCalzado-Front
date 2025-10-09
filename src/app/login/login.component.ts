import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { Auth } from '../models/auth.model';


// Es solo miestras que se conecta al back
/*interface LoginForm {
  rol: string;
  username: string;
  productionLine: string | null;
  state: string;
}*/

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

  //datos para utilizar mock

  //loginForm: LoginForm | null = null;

  constructor(
    private authservice: AuthService,
    private router: Router,
  ) {}

  togglePasswordVisibility() {
    this.passwordVisible = !this.passwordVisible;
  }

  // Realizar Login
  login() {
    const consultToken: Auth = {
      docNumber: Number(this.inputDocument),
      password: this.inputPassword,
    };
    this.authservice.getAccessToken(consultToken).subscribe({
      next: (res) => {
        console.log(res);
        this.authservice.setRole('Gerente');
        this.authservice.setUsername('prueba nombre');
        this.authservice.setUserProductionLine('prueba linea de produccion');
        let redirectRoute = '';
        switch ('Gerente') {
          case 'Gerente':
            redirectRoute = '/usuarios';
            break;
          /*case 'Administrador':
          redirectRoute = '/pedidos-administrador';
          break;
        case 'Operario':
          redirectRoute = '/tareas';
          break;*/
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

  /*login() {
    this.loginForm = this.setMockLoginForm(this.inputDocument, this.inputPassword);
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
  }*/

  // Mock de formulario de inicio de sesión

  private setMockLoginForm(inputDocument: string, inputPassword: string) {
    if ( inputDocument === 'gerente@yopmail.com' && inputPassword === '123456') {
      return {
        rol: 'Gerente',
        username: 'Miguel Herrera',
        productionLine: null,
        state: 'Activo',
      };
    } else if (inputDocument === 'administrador@yopmail.com' && inputPassword === '654321') {
      return {
        rol: 'Administrador',
        username: 'Edwin Paez',
        productionLine: null,
        state: 'Activo',
      };
    } else if (inputDocument === 'operario@yopmail.com' && inputPassword === 'abc123') {
      return {
        rol: 'Operario',
        username: 'Natalia Herrera',
        productionLine: 'Corte',
        state: 'Activo',
      };
    } else if (inputDocument === 'inactivo@yopmail.com' && inputPassword === 'abc321') {
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


