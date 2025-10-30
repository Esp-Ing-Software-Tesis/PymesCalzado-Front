import { Router, ActivatedRoute, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Component, ChangeDetectorRef, OnInit } from '@angular/core';
import { TABLA_GENERAL, SHOW_DETAIL_GENERAL } from './diseñosCalzado.config';
import { TablaGeneralComponent } from '../../shared/tablaGeneral/tablaGeneral.component';
import { SinInformacionComponent } from '../../shared/sinInformacion/sinInformacion.component';
import { ShoeDesignService } from '../../services/diseñoCalzado.service';
import { ShoeDesignDTO } from './diseñosCalzado.interface';
import { DataTableDetailShoeDesign } from '../../shared/showDetailGeneral/showDetailGeneral.interface';
import { map } from 'rxjs';
import { ValueChangedEvent } from '../../shared/tablaGeneral/tablaGeneral.interface';
import { DetailConfigService } from '../../services/detailConfig.service';

@Component({
  selector: 'app-diseños-calzado-page',
  standalone: true,
  imports: [CommonModule, TablaGeneralComponent, SinInformacionComponent, RouterOutlet],
  templateUrl: './diseñosCalzado.component.html',
  styleUrls: ['./diseñosCalzado.component.scss'],
})
export class DiseñosCalzadoPageComponent implements OnInit {
  //Almacenar datos de entrada
  shoesDesign: ShoeDesignDTO[] = [];

  // manejo de configuraciones iniciales para la tabla general
  tableGeneralConfig = structuredClone(TABLA_GENERAL);

  // manejo de configuraciones iniciales para la tabla de ver detalle general
  showDetailGeneralConfig = structuredClone(SHOW_DETAIL_GENERAL);

  // manejo de datos del detalle del diseño de calzado
  viewPageChildren = false;
  productionLinesDetail: DataTableDetailShoeDesign[] = [];
  colorsDetail: string[] = [];
  sizesDetail: string[] = [];

  //Formateador de moneda
  currencyFormatter = new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0,
  });

  constructor(
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly shoeDesignService: ShoeDesignService,
    private readonly detailConfigService: DetailConfigService,
    private readonly cdr: ChangeDetectorRef,
  ) {}

  //Poblar data inicial en la tabla
  ngOnInit(): void {
    // volver a la pagina padre si esta en algun hijo
    this.router.events.subscribe(() => {
      const url = this.router.url;
      this.viewPageChildren = url.includes('detalle') || url.includes('create');
      this.cdr.detectChanges();
    });
    // cargar los diseños de calzado
    this.loadShoeDesigns();
  }

  // Recibe el item del que se quiere consultar el detalle
  getReferenceShoe(event: ValueChangedEvent<ShoeDesignDTO>) {
    if (event.context === 'SHOEDESIGN') {
      if (event.key === 'showDetails') {
        const getShoeItem = this.shoesDesign.find((u) => u.reference === event.item.reference);
        if (getShoeItem) {
          this.openShowDetailPage(getShoeItem.reference);
        }
      }
    }
  }

  // abrir pantalla de detalle
  openShowDetailPage(reference: string) {
    //ejecutar EP
    this.loadShoeDesignsDetail(reference);
    // asignar data a la informacion que sera enviada al detalle
    this.showDetailGeneralConfig.reference = 'Referencia: ' + reference;
    //guardar datos para poblar la tabla
    if (this.showDetailGeneralConfig.datatable) {
      this.showDetailGeneralConfig.datatable = [
        {
          dataTableDetailShoeDesign: this.productionLinesDetail.map((item) => ({
            ...item,
            costPerPairFormatted: this.currencyFormatter.format(Number(item.costPerPair)),
          })),
        },
      ];
    }
    if (this.showDetailGeneralConfig.dataColors) {
      this.showDetailGeneralConfig.dataColors = this.colorsDetail;
    }
    if (this.showDetailGeneralConfig.dataSizes) {
      this.showDetailGeneralConfig.dataSizes = this.sizesDetail;
    }
    // Sumar los costos para mostrarlos en la tabla
    if (this.showDetailGeneralConfig.footTable) {
      const totalAmount = this.productionLinesDetail.reduce((acc, item) => acc + item.costPerPair, 0);
      this.showDetailGeneralConfig.footTable.amountFormatted = this.currencyFormatter.format(totalAmount);
    }
    //Guardar en el local storage la pantalla actual
    localStorage.setItem('lastContext', this.showDetailGeneralConfig.context);

    // Enviar la configuración al servicio
    this.detailConfigService.setConfig(this.showDetailGeneralConfig);

    // navegar al hijo
    this.router.navigate(['detalle'], { relativeTo: this.route });
  }

  // abrir pantalla de creacion
  openCreatePage() {
    // guardar contexto
    localStorage.setItem('lastContext', this.showDetailGeneralConfig.context);
    localStorage.setItem('fromParentCreate', '1');
    // navegar pasando state para identificar que viene del padre
    this.router.navigate(['create'], { relativeTo: this.route });
  }

  //Consulta de EP's

  // Get Shoe Designs
  loadShoeDesigns() {
    this.shoeDesignService
      .getShoeDesign()
      .pipe(
        map((response) =>
          response.map((u) => ({
            reference: u.reference,
            name: u.name,
            image: u.image,
            category: u.category.name,
            description: u.description,
          })),
        ),
      )
      .subscribe({
        next: (res) => {
          this.shoesDesign = res;
        },
        error: (err) => {
          this.shoesDesign = [];
        },
      });
  }

  // Get Shoe Detail
  loadShoeDesignsDetail(reference: string) {
    this.shoeDesignService.getShoeDesignDetail(reference).subscribe({
      next: (res) => {
        this.productionLinesDetail = res.productionLines.map((u) => ({
          productionLine: u.name,
          costPerPair: u.costPerPair,
        }));
        this.colorsDetail = res.colors.map((u) => u.name);
        this.sizesDetail = res.sizes.map((u) => '' + u.id);
      },
      error: (err) => {
      },
    });
  }
}
