import { Component, input, Output, EventEmitter, HostListener, effect, ViewChild, ElementRef, AfterViewChecked } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputsFormModal, PasswordConditions } from './formModal.interface';

@Component({
  selector: 'app-form-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './formModal.component.html',
  styleUrls: ['./formModal.component.scss'],
})
export class FormModalComponent implements AfterViewChecked {
  inputsFormModal = input.required<InputsFormModal>();

  // Variables tipo password
  passwordVisible: { [key: string]: boolean } = {
    password: false,
    confirmPassword: false,
  };

  //Valores de respuesta
  formValues: { [key: string]: string } = {};

  // Inicio select dinamico
  // Guarda la "llave" del select actualmente abierto
  openSelect: string | null = null;

  //Variables para scroll automatico al error
  private hasScrolled = false;

  constructor() {
    // Logica para campos dependientes
    effect(() => {
      const key = this.inputsFormModal().clearFieldKey;
      if (key) {
        //limpiar el valor local
        this.formValues[key] = '';

        //Cerrar el select si era ese
        if (this.openSelect === key) this.openSelect = null;
      }
    });
  }

  // Logica para cuando se genere un error global lo lleve al mensaje
  @ViewChild('errorDiv') errorDiv!: ElementRef;
  ngAfterViewChecked() {
    if (this.inputsFormModal().error && this.errorDiv && !this.hasScrolled) {
      this.errorDiv.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      this.hasScrolled = true;
    }
    // Resetear cuando desaparece el error
    if (!this.inputsFormModal().error) {
      this.hasScrolled = false;
    }
  }

  // Abrir o cerrar el select
  toggleSelect(key: string) {
    this.openSelect = this.openSelect === key ? null : key;
  }

  // Si hay un click externo cierra el bloque de opciones
  @HostListener('document:click', ['$event'])
  clickOut(event: Event) {
    const target = event.target as HTMLElement;
    if (!target.closest('.custom-select')) {
      this.openSelect = null;
    }
  }
  // Fin del select dinamico

  // Validar si el campo es dependiente a otro
  isFieldVisible(input: any): boolean {
    if (!input.dependsOn) return true;
    const { key, value } = input.dependsOn;
    return this.formValues[key] === value;
  }

  @Output() fieldChange = new EventEmitter<{ key: string; value: string }>();

  // Guardar dato del input
  onInputChange(event: Event, key: string) {
    const target = event.target as HTMLInputElement;
    this.formValues[key] = target.value;
    this.fieldChange.emit({ key, value: target.value });
  }

  @Output() optionSelected = new EventEmitter<{ key: string; value: string }>();

  // Guardar dato del selector
  selectOption(key: string, option: string) {
    this.formValues[key] = option;
    this.openSelect = null;
    this.optionSelected.emit({ key, value: option });
  }

  @Output() resultsForm = new EventEmitter<{ [key: string]: string }>();

  // Enviar data para validar y crear
  setResultsForm(event: Event) {
    event.preventDefault();
    this.resultsForm.emit(this.formValues);
  }

  // Limpiar formulario para campos dependientes
  clearDependentField() {
    const key = this.inputsFormModal().clearFieldKey;
    if (key) {
      delete this.formValues[key];
      // indicar al padre que ya no esta el campo
      this.resultsForm.emit({ ...this.formValues });
      // opcional: limpiar la propiedad para que no se borre otra vez
      this.inputsFormModal().clearFieldKey = undefined;
    }
  }

  @Output() close = new EventEmitter<void>();

  // Accion de cerrar
  onCloseClick() {
    this.close.emit();
  }

  // Logica de input tipo password
  togglePasswordVisibility(key: string) {
    this.passwordVisible[key] = !this.passwordVisible[key];
  }

  // Validar errores para cuando el error es una lista
  isPasswordConditions(error: string | PasswordConditions | undefined): error is PasswordConditions {
    return !!error && typeof error !== 'string';
  }
}
