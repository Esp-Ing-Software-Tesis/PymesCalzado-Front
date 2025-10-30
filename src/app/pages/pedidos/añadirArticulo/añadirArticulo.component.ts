import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { TablaGeneralComponent } from '../../../shared/tablaGeneral/tablaGeneral.component';
import { SinInformacionComponent } from '../../../shared/sinInformacion/sinInformacion.component';
import { FormModalComponent } from '../../../shared/formModal/formModal.component';
import { TABLA_GENERAL } from './añadirArticulo.config';
import { FORMULARIO_CREACION_MODAL } from './añadirArticulo.config';
import { ShoeDesignDTO } from './añadirArticulo.interface';
import { ValueChangedEvent } from '../../../shared/tablaGeneral/tablaGeneral.interface';
import { ShoeDesignService } from '../../../services/diseñoCalzado.service';
import { ArticlesSharedService } from '../../../services/articlesShared.service';
import { ShoeColors } from '../../../models/diseñosCalzado.model';
import { ArticlesDTO } from '../crearPedido/crearPedido.interface';
import { map } from 'rxjs';

@Component({
  selector: 'app-añadir-articulo-page',
  standalone: true,
  imports: [CommonModule, TablaGeneralComponent, SinInformacionComponent, FormModalComponent],
  templateUrl: './añadirArticulo.component.html',
  styleUrls: ['./añadirArticulo.component.scss'],
})
export class AñadirArticuloPageComponent implements OnInit {
  //Variable para manejar los diseños de calzado
  shoeDesings: ShoeDesignDTO[] = [];
  //Variables para manejar datos del diseño
  colors: ShoeColors[] = [];
  sizes: string[] = [];
  // manejo de configuraciones iniciales para la tabla general
  tableGeneralConfig = structuredClone(TABLA_GENERAL);

  //Manejo de configuraciones de entrada para el modal del formulario
  formModalConfig = structuredClone(FORMULARIO_CREACION_MODAL);
  showFormModal: boolean = false;

  //Datos ingresados desde el formulario
  setDataForm: { [key: string]: string } = {};

  // contador de errores
  numErrors: number = 0;

  // Variable para ver los articulos ya existentes
  articles: ArticlesDTO[] = [];

  constructor(
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly shoeDesignService: ShoeDesignService,
    private readonly articlesSharedService: ArticlesSharedService,
  ) {}

  ngOnInit(): void {
    //Carga inicial de EP's
    if (this.shoeDesings.length === 0) {
      this.loadShoeDesigns();
    }

    this.articles = this.articlesSharedService.getArticlesList();

    const context = localStorage.getItem('lastContext');
    const fromParent = localStorage.getItem('fromParentCreate');

    if (fromParent) {
      // Llegó desde el componente padre (crear pedido)
      localStorage.removeItem('fromParentCreate');
      return;
    }
    // Si recarga directamente o entra por URL manual
    if (context) {
      this.router.navigateByUrl(this.getFallbackRoute(context));
    } else {
      this.router.navigateByUrl('/');
    }
  }

  //Devuelve la ruta a donde debe ir si se recarga o entra manualmente
  getFallbackRoute(context: string | null): string {
    if (context === 'ORDERGERENT') {
      localStorage.removeItem('lastContext');
      return '/pedidos';
    }
    localStorage.removeItem('lastContext');
    return '/';
  }

  //Acción de volver manualmente
  onBackAction(): void {
    // Volvemos un nivel arriba (crear pedido)
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  // Recibe el item del que se quiere añadir
  getArticleOrder(event: ValueChangedEvent<ShoeDesignDTO>) {
    if (event.context === 'ORDERGERENT-ADDARTICLE') {
      if (event.key === 'addArticle') {
        const getShoeItem = this.shoeDesings.find((u) => u.reference === event.item.reference);
        if (getShoeItem) {
          this.onFormModal(getShoeItem.reference);
        }
      }
    }
  }

  // Logica de formulario
  // abrir modal de creacion y poblar selects
  onFormModal(reference: string) {
    // Ejecutar EP's de consulta
    this.loadShoeDesignsDetail(reference);
    // Poner la referencia
    this.formModalConfig.text = `Referencia: ${reference}`;

    //Logica para colores por lo que no es un array
    const optionsColor = this.colors.map((c) => c.name);
    // Cargar datos en  data de input de la tabla
    this.formModalConfig.inputsConfig.find((i) => i.key === 'name_color')!.options = optionsColor;
    this.formModalConfig.inputsConfig.find((i) => i.key === 'cod_size')!.options = this.sizes;
    this.setDataForm = { ...this.setDataForm, ['ref_design']: reference };
    //ejecutar el modal
    this.showFormModal = true;
  }

  //Validar errores de los campos con el boton
  validateErrors(values: { [key: string]: string }) {
    //eliminar error general si existe
    if (this.formModalConfig.error) {
      this.formModalConfig.error = undefined;
    }

    // Almacenar data de forma dinamica
    this.setDataForm = {
      ...this.setDataForm,
      ...values,
    };

    // Validar que no exista duplicidad de articulos
    if (
      this.articles.some(
        (a) =>
          a.ref_design === this.setDataForm['ref_design'] &&
          a.name_color === this.setDataForm['name_color'] &&
          a.cod_size === Number(this.setDataForm['cod_size']),
      )
    ) {
      this.formModalConfig.error =
        'Ya existe un artículo con esa referencia, color y talla en el pedido. Puede modificar la cantidad si lo necesita.';
    }

    // Limpiar errores
    this.cleanErrors();

    // Validar obligarotio
    this.formModalConfig.inputsConfig.forEach((i) => {
      if (i.obligatory) {
        const value = this.setDataForm[i.key];
        if (!value) {
          i.error = 'Este campo es obligatorio';
        }
      }
    });

    // LLamar a errores de logica de negocio para confirmar
    this.validateErrorBusinessLogic(values);

    // Validar si hay errores internos
    this.formModalConfig.inputsConfig.forEach((i) => {
      if (i.error) {
        this.numErrors++;
      }
    });

    //validar si hay error global
    if (this.formModalConfig.error) {
      this.numErrors++;
    }

    // Enviar a creacion
    if (this.numErrors === 0) {
      // Agergar el id del color escogido
      const selectedColor = this.colors.find((c) => c.name === this.setDataForm['name_color']);
      if (selectedColor) {
        this.setDataForm = {
          ...this.setDataForm,
          cod_color: String(selectedColor.id),
        };
      }
      const newArticle: ArticlesDTO = {
        ref_design: this.setDataForm['ref_design'],
        amount: Number(this.setDataForm['amount']),
        cod_color: Number(this.setDataForm['cod_color']),
        name_color: this.setDataForm['name_color'],
        cod_size: Number(this.setDataForm['cod_size']),
      };
      this.articlesSharedService.sendNewArticle(newArticle);
      this.closeFormModal();
      this.onBackAction();
    }
  }

  // Limpiar los errores
  cleanErrors() {
    this.numErrors = 0;
    this.formModalConfig.inputsConfig.forEach((i) => {
      i.error = '';
    });
  }

  // Logica para cambios en selects
  onOptionSelected(change: { key: string; value: string }) {
    // Eliminacion de errores globales si hay cambios
    if (this.formModalConfig.error) {
      if (
        this.formModalConfig.error ===
          'Ya existe un artículo con esa referencia, color y talla en el pedido. Puede modificar la cantidad si lo necesita.' &&
        ((change.key === 'name_color' && this.setDataForm['name_color'] !== change.value) ||
          (change.key === 'cod_size' && this.setDataForm['cod_size'] !== change.value))
      ) {
        this.formModalConfig.error = undefined;
      }
    }

    this.setDataForm[change.key] = change.value;
    this.cleanErrors();
  }

  // Validar dinamicamente los errores de logica de negocio
  validateField({ key, value }: { key: string; value: string }) {
    // actualizacion del formulario
    this.setDataForm = { ...this.setDataForm, [key]: value };

    this.cleanErrors();
    this.validateErrorBusinessLogic(this.setDataForm);
  }

  // Errores de Logica de negocio
  validateErrorBusinessLogic(values: { [key: string]: string }) {
    Object.entries(values).forEach(([key, value]) => {
      const input = this.formModalConfig.inputsConfig.find((i) => i.key === key);

      if (!input) {
        return;
      }

      switch (key) {
        case 'amount':
          if (Number(value) < 1) {
            input.error = 'Debe ingresar una cantidad válida mayor a 0';
          }
          break;
      }
    });
  }

  // Cerrar el modal del formulario
  closeFormModal() {
    this.showFormModal = false;
    this.cleanErrors();
    this.setDataForm = {};
    this.formModalConfig.error = undefined;
  }
  // Fin de logica dd formulario de creacion

  // Ejecucion de EP's
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
          this.shoeDesings = res;
        },
        error: (err) => {
          this.shoeDesings = [];
        },
      });
  }

  // Get Shoe Detail
  loadShoeDesignsDetail(reference: string) {
    this.shoeDesignService.getShoeDesignDetail(reference).subscribe({
      next: (res) => {
        this.colors = res.colors;
        this.sizes = res.sizes.map((u) => '' + u.id);
      },
      error: (err) => {},
    });
  }
}
