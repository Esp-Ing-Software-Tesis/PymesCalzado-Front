import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { Observable } from 'rxjs';
import { MenuOption } from './header.interface';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  role$: Observable<string | null>;
  username$: Observable<string | null>;
  productionLine$: Observable<string | null>;
  menuOptions: MenuOption[] = [];
  isOpen: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {
    this.role$ = this.authService.userRole$;
    this.username$ = this.authService.username$;
    this.productionLine$ = this.authService.userProductionLine$;
    this.role$.subscribe((role) => {
      this.setOptionsMenu(role);
    });
  }

  // Logout
  logout() {
    this.authService.clearAll();
    this.router.navigate(['/login']);
  }

  // Toogle menu mobile
  toogleMenu() {
    this.isOpen = !this.isOpen;
  }

  // Informacion de pantallas
  private setOptionsMenu(role: string | null) {
    if (role === 'Gerente') {
      this.menuOptions = [
        { label: 'Usuarios', route: '/usuarios', icon: 'headerAndFooter-user' },
        { label: 'Diseños de Calzado', route: '/diseños-calzado', icon: 'headerAndFooter-shoe' },
        { label: 'Pedidos', route: '/pedidos', icon: 'headerAndFooter-pedido' },
      ];
    } else if (role === 'Administrador') {
      this.menuOptions = [{ label: 'Pedidos', route: '/pedidos-tareas', icon: 'headerAndFooter-pedido' }];
    } else if (role === 'Operario') {
      this.menuOptions = [{ label: 'Tareas', route: '/tareas', icon: 'headerAndFooter-task' }];
    } else {
      this.menuOptions = [];
    }
  }
}
