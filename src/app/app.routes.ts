import { Routes } from '@angular/router';
import { AuthGuard } from './services/auth.guard';
import { UsuariosPageComponent } from './pages/usuarios/usuarios.component';
import { LoginPageComponent } from './login/login.component';
import { PedidosPageComponent } from './pages/pedidos/pedidos.component';
import { DiseñosCalzadoPageComponent } from './pages/diseñosCalzado/diseñosCalzado.component';
import { ShowDetailGeneralComponent } from './shared/showDetailGeneral/showDetailGeneral.component';
import { CrearDiseñosCalzadoPageComponent } from './pages/diseñosCalzado/crearDiseñoCalzado/crearDiseñoCalzado.component';
import { CrearPedidosPageComponent } from './pages/pedidos/crearPedido/crearPedido.component';
import { AñadirArticuloPageComponent } from './pages/pedidos/añadirArticulo/añadirArticulo.component';
import { TareasAdministradorPageComponent } from './pages/tareasAdministrador/tareasAdministrador.component';
import { CrearEditarTareasComponent } from './pages/tareasAdministrador/crearEditarTareas/crearEditarTareas.component';
import { VerTareasPageComponent } from './pages/tareasAdministrador/verTareas/verTareas.component';
import { GestionarTareasAdminPageComponent } from './pages/tareasAdministrador/verTareas/gestionarTareasAdmin/gestionarTareasAdmin.component';

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
      },
    ],
  },
  {
    path: 'pedidos',
    component: PedidosPageComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'detalle',
        component: ShowDetailGeneralComponent,
      },
      {
        path: 'crear',
        component: CrearPedidosPageComponent,
        children: [
          {
            path: 'añadir-articulo',
            component: AñadirArticuloPageComponent,
          },
        ],
      },
    ],
  },
  {
    path: 'pedidos-tareas',
    component: TareasAdministradorPageComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'detalle',
        component: ShowDetailGeneralComponent,
        children: [
          {
            path: 'crear-editar-tareas',
            component: CrearEditarTareasComponent,
          },
          {
            path: 'detalle-tareas',
            component: VerTareasPageComponent,
            children: [
              {
                path: 'gestionar-tareas',
                component: GestionarTareasAdminPageComponent,
              },
            ]
          },
        ],
      },
    ],
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
