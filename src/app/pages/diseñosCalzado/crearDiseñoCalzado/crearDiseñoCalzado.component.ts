import { CommonModule } from '@angular/common';
import { Component, HostListener, ViewChild, ElementRef, OnInit, AfterViewChecked } from '@angular/core';
import { Router } from '@angular/router';
import { ShoeDesignCreateDTO } from '../../../models/diseñosCalzado.model';
import { ShoeCategorys } from '../../../models/categoriasCalzado.model';
import { ShoeCategorysService } from '../../../services/categoriasCalzado.service';
import { TABLA_LIENAS_PRODUCCION } from '../crearDiseñoCalzado/crearDiseñoCalzado.config';
import { DataTable } from './crearDiseñoCalzado.interface';
import { ProductionLines } from '../../../models/lineasProduccion.model';
import { ProductionLinesService } from '../../../services/lineasProduccion.service';
import { FormsModule } from '@angular/forms';
import { ShoeColors } from '../../../models/coloresCalzado.model';
import { ShoeColorsService } from '../../../services/coloresCalzado.service';
import { ShoeSizes } from '../../..//models/tallasCalzado.model';
import { ShoeSizesService } from '../../../services/tallasCalzado.service';
import { ShoeDesignService } from '../../../services/diseñoCalzado.service';

@Component({
  selector: 'app-diseños-calzado-page',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './crearDiseñoCalzado.component.html',
  styleUrls: ['./crearDiseñoCalzado.component.scss'],
})
export class CrearDisenosCalzadoPageComponent implements OnInit, AfterViewChecked {
  // Variable que contiene los datos ingresados en el formulario
  newShoeDesign: ShoeDesignCreateDTO = {
    name: '',
    image: '',
    category_id: 0,
    description: '',
    productionLines: [],
    colors: [],
    sizes: [],
  };

  //Variable para manejar los errores de validacion
  shoeDesignErrors = {
    name_error: '',
    image_error: '',
    category_id_error: '',
    description_error: '',
    productionLines_error: '',
    colors_error: '',
    sizes_error: '',
  };
  counterErrors = 0;
  //variable para manejar error general
  generalError = '';

  // Data de la tabla de lineas de produccion
  dataTable: DataTable[] = [];

  // configuraciones para la tabla lineas de produccion y costos
  tableConfig = structuredClone(TABLA_LIENAS_PRODUCCION);

  // variables para alamacenar dara de EP's
  shoeCategorys: ShoeCategorys[] = [];
  productionLines: ProductionLines[] = [];
  shoeColors: ShoeColors[] = [];
  shoeSizes: ShoeSizes[] = [];

  // Variables para el manejo de select personalizado
  openCategory = false;
  openColors = false;
  openSizes = false;

  // variable para manejar el total de costos
  totalCost: string = '$0';

  //Formateador de moneda
  currencyFormatter = new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0,
  });
  //Variables para scroll automatico al error
  private hasScrolled = false;

  constructor(
    private readonly router: Router,
    private readonly shoeCategorysService: ShoeCategorysService,
    private readonly productionLinesService: ProductionLinesService,
    private readonly shoeColorsService: ShoeColorsService,
    private readonly shoeSizesService: ShoeSizesService,
    private readonly shoeDesignService: ShoeDesignService,
  ) {}

  ngOnInit(): void {
    // cargar datos de entrada desde los servicios
    this.getShoeCategorys();
    this.getProducionLines();
    this.getShoeColors();
    this.getShoeSizes();
    //Logica para recibir y almacenar los datos para la tabla de lineas de produccion
    if (this.productionLines) {
      this.updateDataTable();
    }
    // logica para manejar si se recarga la pagina o se accede directamente
    const context = localStorage.getItem('lastContext');
    const fromParent = localStorage.getItem('fromParentCreate');
    if (fromParent) {
      // Llegó desde el padre normalmente
      localStorage.removeItem('fromParentCreate');
      return;
    }
    // No llegó desde el padre en esta sesión -> recarga o acceso directo
    if (context) {
      this.router.navigateByUrl(this.getFallbackRoute(context));
    } else {
      this.router.navigateByUrl('/');
    }
  }

  getFallbackRoute(context: string | null): string {
    if (context === 'SHOEDESIGN') {
      localStorage.removeItem('lastContext');
      return '/diseños-calzado';
    }
    localStorage.removeItem('lastContext');
    return '/';
  }

  // Logica para manejar la tabla de lineas de produccion y costos
  updateDataTable() {
    this.dataTable = this.productionLines.map((line) => ({
      id: line.id,
      productionLine: line.nombre,
      apply: line.isObligatory,
      costPerPair: '',
      isObligatory: line.isObligatory,
    }));
  }

  // Logica para cuando se genere un error global lo lleve al mensaje
  @ViewChild('errorDiv') errorDiv!: ElementRef;
  ngAfterViewChecked() {
    if (this.generalError && this.errorDiv && !this.hasScrolled) {
      this.errorDiv.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      this.hasScrolled = true;
    }
    // Resetear cuando desaparece el error
    if (!this.generalError) {
      this.hasScrolled = false;
    }
  }

  // Logica para obtener y almacenar el id de la linea de produccion y costo por par
  syncProductionLines() {
    this.newShoeDesign.productionLines = this.dataTable
      .filter((item) => item.apply)
      .map((item) => ({
        id: item.id,
        costPerPair: Number(item.costPerPair.replaceAll(/\D/g, '')) || 0,
      }));

    // calcular total
    const total = this.newShoeDesign.productionLines.reduce((acc, line) => acc + line.costPerPair, 0);
    this.totalCost = this.currencyFormatter.format(total);

    // Validar errores dinámicamente
    this.validateErrorsTableProductionLines();
  }

  // Formatear el valor ingresado en el input de costo
  formatCurrency(value: any): string {
    if (value == null || value === '') return '';
    // Si el valor ya viene como string con símbolos, limpiamos primero
    const clean = String(value).replaceAll(/\D/g, '');
    if (!clean) return '';
    return '$' + new Intl.NumberFormat('es-CO').format(Number(clean));
  }

  // Manejar el cambio en el input de costo
  onCostChange(value: string, item: any) {
    // limpiar lo que no sea número
    const clean = value.replaceAll(/\D/g, '');
    item.costPerPair = clean;
    // recalcular producción
    this.syncProductionLines();
  }

  // Permite solo números y teclas de control como Backspace, Delete, Arrow Keys
  allowOnlyNumbers(event: KeyboardEvent) {
    const allowedKeys = ['Backspace', 'Tab', 'ArrowLeft', 'ArrowRight', 'Delete', 'Enter'];

    if (!/\d/.test(event.key) && !allowedKeys.includes(event.key)) {
      event.preventDefault();
    }
  }

  // Accion para regresar al padre
  onBackAction() {
    localStorage.removeItem('lastContext');
    this.newShoeDesign = {
      name: '',
      image: '',
      category_id: 0,
      description: '',
      productionLines: [],
      colors: [],
      sizes: [],
    };
    this.router.navigate(['/diseños-calzado']);
  }

  // Almacenar los datos del formulario
  // Almacenar los datos del formulario
  onFormChange(eventOrValue: Event | number | string, key: keyof ShoeDesignCreateDTO): void {
    const value = this.extractValue(eventOrValue);
    (this.newShoeDesign as any)[key] = value;

    if (key === 'name') {
      this.clearDuplicateNameError();
    }

    if (key === 'name' || key === 'description') {
      this.onFileChange(key, value);
    } else {
      this.validateDynamicField(key, value);
    }

    if (key === 'category_id') {
      this.openCategory = false;
    }
  }

  private extractValue(eventOrValue: Event | number | string): any {
    return eventOrValue instanceof Event ? (eventOrValue.target as HTMLInputElement).value : eventOrValue;
  }

  private clearDuplicateNameError(): void {
    if (this.generalError?.includes('Ya existe un diseño')) {
      this.generalError = '';
    }
  }

  private validateDynamicField(key: keyof ShoeDesignCreateDTO, value: any): void {
    const errorKey = `${key}_error`;

    if (errorKey in this.shoeDesignErrors) {
      const typedKey = errorKey as keyof typeof this.shoeDesignErrors;
      const currentError = this.shoeDesignErrors[typedKey];

      if (!currentError) return;

      if (Array.isArray(value)) {
        this.shoeDesignErrors[typedKey] = value.length ? '' : currentError;
      } else if (value) {
        this.shoeDesignErrors[typedKey] = '';
      }
    }
  }

  toggleCategory() {
    this.openCategory = !this.openCategory;
  }

  @HostListener('document:click', ['$event'])
  clickOut(event: Event) {
    const target = event.target as HTMLElement;
    if (!target.closest('.custom-select-container')) {
      this.openCategory = false;
      this.openColors = false;
      this.openSizes = false;
    }
  }

  // Obtener el nombre de la opción seleccionada o un mensaje por defecto
  getOptionName<T extends { id: number; nombre: string }>(list: T[], id: number, defaultMessage: string): string {
    const option = list.find((item) => item.id === id);
    return option ? option.nombre : defaultMessage;
  }

  //Logica para manejar el input imagen
  // Función para validar archivo y errores
  private validateImage(file: File): boolean {
    const validFormats = ['image/jpeg', 'image/jpg', 'image/png'];

    if (!validFormats.includes(file.type)) {
      this.shoeDesignErrors.image_error = 'Solo se permiten formatos .jpg, .jpeg o .png';
      return false;
    }

    if (file.size > 2 * 1024 * 1024) {
      this.shoeDesignErrors.image_error = 'La imagen debe pesar máximo 2 MB';
      return false;
    }

    // Limpiar error si pasa validación
    this.shoeDesignErrors.image_error = '';
    return true;
  }

  // Logica para manejar el input imagen
  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];

    if (file) {
      if (!this.validateImage(file)) return;

      const reader = new FileReader();
      reader.onload = () => {
        this.newShoeDesign.image = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  // Manejar drag & drop
  onDrop(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();

    const file = event.dataTransfer?.files?.[0];

    if (file) {
      if (!this.validateImage(file)) return;

      const reader = new FileReader();
      reader.onload = () => {
        this.newShoeDesign.image = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
  }

  // Eliminar la imagen
  removeImage() {
    this.newShoeDesign.image = '';
    this.shoeDesignErrors.image_error = '';
  }
  // aqui termina la logica del input imagen
  // Logica para manejar el select multiple de colores
  // Alternar apertura
  toggleColors() {
    this.openColors = !this.openColors;
  }

  // Seleccionar o deseleccionar un color
  toggleColor(colorId: number) {
    const index = this.newShoeDesign.colors.indexOf(colorId);

    if (index === -1) {
      this.newShoeDesign.colors.push(colorId);
    } else {
      this.newShoeDesign.colors.splice(index, 1);
    }
    this.shoeDesignErrors.colors_error = this.newShoeDesign.colors.length ? '' : 'Debe seleccionar al menos una opción';
    this.openColors = false;
  }

  // Mostrar nombres de los colores seleccionados
  getSelectedColorsNames(): string {
    if (!this.newShoeDesign.colors.length) return 'Seleccione los colores';

    return this.shoeColors
      .filter((c) => this.newShoeDesign.colors.includes(c.id))
      .map((c) => c.nombre)
      .join(', ');
  }

  // Quitar un color desde los cards
  removeColor(colorId: number) {
    this.newShoeDesign.colors = this.newShoeDesign.colors.filter((id) => id !== colorId);
  }
  // Finaliza la logica de colores
  // Logica para manejar el select multiple de tallas

  // Alternar apertura del dropdown
  toggleSizes() {
    this.openSizes = !this.openSizes;
  }

  // Seleccionar o deseleccionar una talla
  toggleSize(sizeId: number) {
    const index = this.newShoeDesign.sizes.indexOf(sizeId);

    if (index === -1) {
      this.newShoeDesign.sizes.push(sizeId);
    } else {
      this.newShoeDesign.sizes.splice(index, 1);
    }
    this.shoeDesignErrors.sizes_error = this.newShoeDesign.sizes.length ? '' : 'Debe seleccionar al menos una opción';
    this.openSizes = false;
  }

  // Mostrar nombres de las tallas seleccionadas
  getSelectedSizesNames(): string {
    if (!this.newShoeDesign.sizes.length) return 'Seleccione tallas';

    return this.shoeSizes
      .filter((s) => this.newShoeDesign.sizes.includes(s.id))
      .map((s) => s.id)
      .join(', ');
  }

  // Quitar una talla desde los cards
  removeSize(sizeId: number) {
    this.newShoeDesign.sizes = this.newShoeDesign.sizes.filter((id) => id !== sizeId);
  }
  // Finaliza la logica de tallas

  //Validacion de errores al crear el diseño
  onSubmit() {
    this.resetGeneralErrorIfNeeded();
    this.runValidations();

    if (this.hasNoErrors()) {
      this.createNewShoeDesign();
    }
  }

  private resetGeneralErrorIfNeeded() {
    if (this.generalError && !this.generalError.includes('Ya existe un diseño')) {
      this.generalError = '';
    }
  }

  private runValidations() {
    this.clearErrors();
    this.validateRequiredFields();
    this.validateErrorsTableProductionLines();
    this.validateDynamicFields();
    this.countErrors();
  }

  private validateDynamicFields() {
    this.onFileChange('name', this.newShoeDesign.name);
    this.onFileChange('description', this.newShoeDesign.description);
  }

  private countErrors() {
    this.counterErrors = Object.values(this.shoeDesignErrors).filter(Boolean).length;
  }

  private hasNoErrors(): boolean {
    return this.counterErrors === 0;
  }

  //limpiar errores
  clearErrors() {
    this.shoeDesignErrors = {
      name_error: '',
      image_error: '',
      category_id_error: '',
      description_error: '',
      productionLines_error: '',
      colors_error: '',
      sizes_error: '',
    };
    this.counterErrors = 0;
  }

  //Validacion de errores campos obligatorios
  validateRequiredFields() {
    this.shoeDesignErrors = {
      name_error: this.newShoeDesign.name ? '' : 'Este campo es obligatorio',
      category_id_error: this.newShoeDesign.category_id ? '' : 'Este campo es obligatorio',
      description_error: this.newShoeDesign.description ? '' : 'Este campo es obligatorio',
      colors_error: this.newShoeDesign.colors.length ? '' : 'Debe seleccionar al menos una opción',
      sizes_error: this.newShoeDesign.sizes.length ? '' : 'Debe seleccionar al menos una opción',
      image_error: this.newShoeDesign.image ? '' : 'Este campo es obligatorio',
      productionLines_error: this.shoeDesignErrors.productionLines_error, // mantener el error de la tabla
    };
  }

  //Validar errores para la tabla de lineas de produccion
  validateErrorsTableProductionLines() {
    const invalidLines = this.dataTable.filter((item) => item.apply && (!item.costPerPair || item.costPerPair.trim() === ''));

    this.shoeDesignErrors = {
      ...this.shoeDesignErrors,
      productionLines_error: invalidLines.length ? 'Debe diligenciar el costo de todas las líneas de produccion seleccionadas' : '',
    };
  }

  //Validar errores dinamicos
  onFileChange(key: keyof ShoeDesignCreateDTO, value: any) {
    switch (key) {
      case 'name':
        if (!value || value.trim() === '') {
          this.shoeDesignErrors.name_error = 'Este campo es obligatorio';
        } else if (value.length < 4 || value.length > 50) {
          this.shoeDesignErrors.name_error = 'Debe tener entre 4 y 50 caracteres';
        } else {
          this.shoeDesignErrors.name_error = '';
        }
        break;

      case 'description':
        if (!value || value.trim() === '') {
          this.shoeDesignErrors.description_error = 'Este campo es obligatorio';
        } else if (value.length < 4 || value.length > 100) {
          this.shoeDesignErrors.description_error = 'Debe tener entre 4 y 100 caracteres';
        } else {
          this.shoeDesignErrors.description_error = '';
        }
        break;
    }
  }

  //Consulta de EP's
  // get categorias de calzado
  getShoeCategorys() {
    this.shoeCategorysService.getShoesCategory().subscribe({
      next: (res) => {
        this.shoeCategorys = res;
      },
      error: (err) => {},
    });
  }
  // get lineas de produccion
  getProducionLines() {
    this.productionLinesService.getProductionLines().subscribe({
      next: (res) => {
        this.productionLines = res;
      },
      error: (err) => {},
    });
  }
  // get colores de calzado
  getShoeColors() {
    this.shoeColorsService.getShoeColors().subscribe({
      next: (res) => {
        this.shoeColors = res;
      },
      error: (err) => {},
    });
  }
  // get tallas de calzado
  getShoeSizes() {
    this.shoeSizesService.getShoeSizes().subscribe({
      next: (res) => {
        this.shoeSizes = res;
      },
      error: (err) => {},
    });
  }
  // crear diseño de calzado
  createNewShoeDesign() {
    this.shoeDesignService.postCreateShowDesign(this.newShoeDesign).subscribe({
      next: (res) => {
        this.onBackAction();
      },
      error: (err) => {
        if (err.description === 'diseño de calzado ya existente') {
          this.generalError = 'Ya existe un diseño de calzado con ese nombre. El nombre debe ser único.';
        } else {
          this.generalError = 'No se pudo realizar la creación, intentelo nuevamente.';
        }
      },
    });
  }
}
