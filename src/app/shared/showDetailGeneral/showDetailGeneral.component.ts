import { Router, ActivatedRoute } from '@angular/router';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputShowDetailGeneral, DataTableDetail } from './showDetailGeneral.interface';
import { DetailConfigService } from '../../services/detailConfig.service';

@Component({
  selector: 'app-shoe-detail-general',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './showDetailGeneral.component.html',
  styleUrls: ['./showDetailGeneral.component.scss'],
})
export class ShowDetailGeneralComponent {
  inputsConfigPage!: InputShowDetailGeneral;

  constructor(
    private detailConfigService: DetailConfigService,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    // Extarer informacion enviada desde el padre
    this.detailConfigService.config$.subscribe((config) => {
      if (config) {
        this.inputsConfigPage = config;
      } else {
        const context = localStorage.getItem('lastContext');
        this.router.navigate([this.getFallbackRoute(context)]);
      }
    });
  }

  // metodo por si se recarga la pagina redirija al padre
  getFallbackRoute(context: string | null): string {
    switch (context) {
      case 'SHOEDESIGN':
        return '/diseños-calzado';
      default:
        return '/';
    }
  }

  // Extraer strings para llenar la tabla
  getValue(item: DataTableDetail, key: string): string {
    const value = item[key as keyof DataTableDetail];
    return value !== undefined ? String(value) : '';
  }

  // Accion para regresar al padre
  onBackAction() {
    localStorage.removeItem('lastContext');
    this.detailConfigService.clearConfig();
    this.router.navigate(['/diseños-calzado'], { relativeTo: this.route });
  }
}
