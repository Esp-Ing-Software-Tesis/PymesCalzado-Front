import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, ActivatedRoute, RouterOutlet } from '@angular/router';
import { ManageTaskDTO } from './gestionarTareasAdmin.interface';
import { TasksService } from '../../../../services/tareas.service';
import { TasksSharedService } from '../../../../services/tasksShared.service';

@Component({
  selector: 'app-gestionar-tareas-admin-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './gestionarTareasAdmin.component.html',
  styleUrls: ['./gestionarTareasAdmin.component.scss'],
})
export class GestionarTareasAdminPageComponent {
  // Variable para manejar los datos enviados desde el padre
  configManageTask: ManageTaskDTO | null = null;

  constructor(
    private tasksSharedService: TasksSharedService,
    private router: Router,
    private route: ActivatedRoute,
    private tasksService: TasksService,
  ) {}

  ngOnInit(): void {
    //Carga inicial de EP's
    this.configManageTask = this.tasksSharedService.getTaskManage();

    const context = localStorage.getItem('lastContext');
    const fromParent = localStorage.getItem('fromParentCreate');

    if (fromParent) {
      // Llegó desde el componente padre (crear pedido)
      localStorage.removeItem('fromParentCreate');
      return;
    }
    // Si recarga directamente o entra por URL manual
    if (context) {
      const fallback = this.getFallbackRoute(context);
      this.router.navigate(fallback);
    } else {
      this.router.navigate(['/']);
    }
  }

  //Devuelve la ruta a donde debe ir si se recarga o entra manualmente
  getFallbackRoute(context: string | null): string[] {
    switch (context) {
      case 'ORDERGERENTADMIN-TASK':
        localStorage.removeItem('lastContext');
        return ['/pedidos-tareas'];
      default:
        localStorage.removeItem('lastContext');
        return ['/'];
    }
  }

  //Acción de volver manualmente
  onBackAction(): void {
    this.router.navigate(['../'], { relativeTo: this.route });
  }
}
