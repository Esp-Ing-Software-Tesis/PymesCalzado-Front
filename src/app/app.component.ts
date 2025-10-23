import { Component, OnInit } from '@angular/core';
import { RouterOutlet, NavigationEnd, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './core/header/header.component';
import { FooterComponent } from './core/footer/footer.component';
import { LoaderComponent } from './shared/loader/loader.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, HeaderComponent, FooterComponent, LoaderComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'Pymes de Calzado';
  mostrarheaderandfooter = true;

  constructor(
    private router: Router,
  ) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        const rutaActual = event.urlAfterRedirects.split('?')[0].split(';')[0];
        this.mostrarheaderandfooter = rutaActual !== '/login';
        if (rutaActual === '/login') {
          document.body.classList.add('is-login');
        } else {
          document.body.classList.remove('is-login');
        }
      }
    });
  }
}
