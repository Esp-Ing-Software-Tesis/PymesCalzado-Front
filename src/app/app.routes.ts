import { Routes } from '@angular/router';
import { AuthGuard } from './services/auth.guard';
import { UsuariosPageComponent } from './pages/usuarios/usuarios.component';
import { LoginPageComponent } from './login/login.component';
import { PedidosAdministradorPageComponent } from './pages/pedidosAdministrador/pedidosAdministrador.component';
import { DiseñosCalzadoPageComponent } from './pages/diseñosCalzado/diseñosCalzado.component';
import { ShowDetailGeneralComponent } from './shared/showDetailGeneral/showDetailGeneral.component';
import { CrearDiseñosCalzadoPageComponent } from './pages/diseñosCalzado/crearDiseñoCalzado/crearDiseñoCalzado.component';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginPageComponent,
  },
  {
    path: 'usuarios',
    component: UsuariosPageComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'diseños-calzado',
    component: DiseñosCalzadoPageComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'detalle',
        component: ShowDetailGeneralComponent,
      },
      {
        path: 'create',
        component: CrearDiseñosCalzadoPageComponent,
      }
    ],
  },
  {
    path: 'pedidos-administrador',
    component: PedidosAdministradorPageComponent,
    canActivate: [AuthGuard],
  },

  // Redirige a login en caso de que la ruta este vacia
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },

  // Redirige a login en caso de que no exista la ruta
  {
    path: '**',
    redirectTo: 'login',
  },
];
