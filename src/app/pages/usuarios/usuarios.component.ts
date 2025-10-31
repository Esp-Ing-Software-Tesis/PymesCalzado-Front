import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SinInformacionComponent } from '../../shared/sinInformacion/sinInformacion.component';
import { TablaGeneralComponent } from '../../shared/tablaGeneral/tablaGeneral.component';
import { UsersEventDTO } from './usuarios.interface';
import { ValueChangedEvent } from '../../shared/tablaGeneral/tablaGeneral.interface';
import { AlertModalComponent } from '../../shared/alertModal/alertModal.component';
import { FormModalComponent } from '../../shared/formModal/formModal.component';
import { FORMULARIO_CREACION_MODAL, ALERTA_MODAL, TABLA_GENERAL } from './usuarios.config';
import { PasswordConditions } from '../../shared/formModal/formModal.interface';
import { UsersService } from '../../services/usuario.service';
import { RolsService } from '../../services/roles.service';
import { DocumentTypeService } from '../../services/tiposDocumento.service';
import { ProductionLinesService } from '../../services/lineasProduccion.service';
import { map } from 'rxjs';
import { UserCreateDTO, UserUpdateDTO } from '../../models/usuario.model';

@Component({
  selector: 'app-usuario-page',
  standalone: true,
  imports: [CommonModule, SinInformacionComponent, TablaGeneralComponent, AlertModalComponent, FormModalComponent],
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss'],
})
export class UsuariosPageComponent implements OnInit {
  //Almacenar datos de entrada
  users: UsersEventDTO[] = [];
  documentTypeNames: string[] = [];
  rolNames: string[] = [];
  productionLineNames: string[] = [];

  // manejo de configuraciones iniciales para la tabla general
  tableGeneralConfig = structuredClone(TABLA_GENERAL);

  // manejo de configuraciones de entrada para el modal de alerta
  alertModalConfig = structuredClone(ALERTA_MODAL);
  showAlertModal: boolean = false;

  // Variable para almacenar data momentanea para actualizar estado
  dataUpdateState: UserUpdateDTO = {
    document: 0,
    state: false,
  };

  //Manejo de configuraciones de entrada para el modal del formulario
  formModalConfig = structuredClone(FORMULARIO_CREACION_MODAL);
  showFormModal: boolean = false;

  //Datos ingresados desde el formulario
  setDataForm: { [key: string]: string } = {};

  // contador de erroresa
  numErrors: number = 0;

  constructor(
    private readonly usersService: UsersService,
    private readonly documentTypeService: DocumentTypeService,
    private readonly rolsService: RolsService,
    private readonly productionLinesService: ProductionLinesService,
  ) {}

  //Poblar data inicial en la tabla
  ngOnInit(): void {
    this.loadUsers();
  }

  // abrir modal de creacion y poblar selects
  onFormModal() {
    // Ejecutar EP's de consulta
    if (this.documentTypeNames.length === 0) {
      this.loadDocumentTypes();
    }
    if (this.rolNames.length === 0) {
      this.loadRols();
    }

    // Cargar datos en  data de input de la tabla
    this.formModalConfig.inputsConfig.find((i) => i.key === 'documentType')!.options = this.documentTypeNames;
    this.formModalConfig.inputsConfig.find((i) => i.key === 'rol')!.options = this.rolNames;

    //ejecutar el modal
    this.showFormModal = true;
  }

  // Si se selecciona el operario para que se consulten las lineas de produccion
  onOptionSelected(change: { key: string; value: string }) {
    //Logica para eliminar error global del modal si cambia un campo dependiente
    if (this.formModalConfig.error) {
      if (
        this.formModalConfig.error === 'Ya existe un usuario con el rol de administrador en estado activo. Solo puede haber uno a la vez.' &&
        this.setDataForm['rol'] !== change.value &&
        change.key === 'rol'
      ) {
        this.formModalConfig.error = undefined;
      }
    }

    this.setDataForm[change.key] = change.value;
    this.cleanErrors();

    // Validar que si se selecciona operario salga lineas de produccion

    if (change.key === 'rol' && change.value === 'Operario') {
      // solo consumir el back la primera vez
      if (this.productionLineNames.length === 0) {
        this.loadProductionLines();
      }
      const dataLineaProduccion = this.productionLineNames;
      const productionLineSelect = this.formModalConfig.inputsConfig.find((i) => i.key === 'productionLine');
      if (productionLineSelect) {
        productionLineSelect.options = dataLineaProduccion;
      }
      // borra si no se tiene nada
      if (this.setDataForm['productionLine'] === undefined || this.setDataForm['productionLine'] === '') {
        this.setDataForm['productionLine'] = '';
      }
    } else if (change.key === 'rol') {
      // limpiar solo cuando no es operario
      delete this.setDataForm['productionLine'];
      this.formModalConfig = {
        ...this.formModalConfig,
        clearFieldKey: 'productionLine',
      };
    }
  }

  //Validar errores de los campos con el boton
  validateErrors(values: { [key: string]: string }) {
    //eliminar error general si existe
    if (this.formModalConfig.error) {
      this.formModalConfig.error = undefined;
    }

    //Limpiar los campos que no esten si hay dependientes
    for (const key of Object.keys(this.setDataForm)) {
      if (key in values === false) {
        delete this.setDataForm[key];
      }
    }

    // Almacenar data de forma dinamica
    this.setDataForm = {
      ...this.setDataForm,
      ...values,
    };

    // Limpiar errores
    this.cleanErrors();

    // Validar obligarotio
    for (const i of this.formModalConfig.inputsConfig) {
      if (i.obligatory) {
        const visible = i.dependsOn ? this.setDataForm[i.dependsOn.key] === i.dependsOn.value : true;
        if (visible) {
          const value = this.setDataForm[i.key];
          if (!value) {
            i.error = 'Este campo es obligatorio';
          }
        }
      }
    }

    // LLamar a errores de logica de negocio para confirmar
    this.validateErrorBusinessLogic(values);

    // Validar si hay errores
    for (const i of this.formModalConfig.inputsConfig) {
      if (i.error) {
        this.numErrors++;
      }
    }

    // Enviar a creacion
    if (this.numErrors === 0) {
      this.createNewUser();
    }
  }

  // Limpiar los errores
  cleanErrors() {
    this.numErrors = 0;
    for (const i of this.formModalConfig.inputsConfig) {
      i.error = '';
    }
  }

  // Validar dinamicamente los errores de logica de negocio
  validateField({ key, value }: { key: string; value: string }) {
    //Logica para eliminar error global del modal si cambia un campo dependiente
    if (this.formModalConfig.error) {
      if (
        this.formModalConfig.error === 'Ya existe un usuario registrado con este número de documento. Verifica los datos ingresados.' &&
        this.setDataForm['document'] !== value &&
        key === 'document'
      ) {
        this.formModalConfig.error = undefined;
      }
    }

    // actualizar valores
    this.setDataForm = { ...this.setDataForm, [key]: value };

    // limpiar errores solo de confirmPassword cuando cambia algo relacionado
    if (key === 'password' || key === 'confirmPassword') {
      const confirmInput = this.formModalConfig.inputsConfig.find((i) => i.key === 'confirmPassword');
      if (confirmInput) {
        confirmInput.error = '';
      }
    } else {
      this.cleanErrors();
    }

    this.validateErrorBusinessLogic(this.setDataForm);
  }

  // Errores de Logica de negocio
  validateErrorBusinessLogic(values: { [key: string]: string }) {
    for (const [key, value] of Object.entries(values)) {
      const input = this.formModalConfig.inputsConfig.find((i) => i.key === key);
      if (!input) continue;

      switch (key) {
        case 'name':
          this.validateNameField(input, value);
          break;
        case 'document':
          this.validateDocumentField(input, value);
          break;
        case 'email':
          this.validateEmailField(input, value);
          break;
        case 'phone':
          this.validatePhoneField(input, value);
          break;
        case 'password':
          this.validatePasswordField(input, value);
          break;
        case 'confirmPassword':
          this.validateConfirmPasswordField(input, values['password'], value);
          break;
      }
    }
  }

  private validateNameField(input: any, value: string) {
    if (value.length < 5 || value.length > 100) {
      input.error = 'Debe tener entre 5 y 100 caracteres';
    } else if (!/^[A-Za-zÁÉÍÓÚáéíóúñÑ\s]+$/.test(value)) {
      input.error = 'El campo solo debe contener letras';
    } else {
      input.error = undefined;
    }
  }

  private validateDocumentField(input: any, value: string) {
    if (value.length < 6 || value.length > 10) {
      input.error = 'Debe tener entre 6 y 10 dígitos';
    } else if (!/^\d+$/.test(value)) {
      input.error = 'El campo solo debe contener números';
    } else {
      input.error = undefined;
    }
  }

  private validateEmailField(input: any, value: string) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.(com|co|es)$/i;
    input.error = emailRegex.test(value) ? undefined : 'Ingrese un correo válido';
  }

  private validatePhoneField(input: any, value: string) {
    if (value.length !== 10) {
      input.error = 'Debe tener 10 dígitos';
    } else if (!/^[0-9]+$/.test(value)) {
      input.error = 'El campo solo debe contener números';
    } else {
      input.error = undefined;
    }
  }

  private validatePasswordField(input: any, value: string) {
    const conditions: PasswordConditions = {
      length: value.length >= 8,
      uppercase: /[A-Z]/.test(value),
      number: /\d/.test(value),
      symbol: /[!@#$%^&*(),.?":{}|<>]/.test(value),
    };
    const isValid = Object.values(conditions).every(Boolean);
    input.error = isValid ? undefined : conditions;
  }

  private validateConfirmPasswordField(input: any, password: string, confirmPassword: string) {
    input.error = confirmPassword !== password ? 'Las contraseñas no coinciden' : undefined;
  }

  // Cerrar el modal del formulario
  closeFormModal() {
    this.showFormModal = false;
    this.cleanErrors();
    this.formModalConfig.error = undefined;
  }

  // Recibe nuevo estado de la tabla
  onValueStateChanged(event: ValueChangedEvent<UsersEventDTO>) {
    if (event.context === 'USER') {
      if (event.key === 'state') {
        const getUser = this.users.find((u) => u.document === event.item.document);
        if (getUser) {
          this.onAlertModal(getUser.state);
          this.dataUpdateState.document = getUser.document;
          this.dataUpdateState.state = event.value;
        }
      }
    }
  }

  // Abrir y poblar modal de alerta

  onAlertModal(currentState: boolean) {
    this.showAlertModal = true;
    this.alertModalConfig.error = '';
    if (currentState) {
      this.alertModalConfig.title = '¿Desea inactivar este usuario?';
      this.alertModalConfig.text = 'Podrá volver a activarlo en cualquier momento desde esta misma sección.';
    } else {
      this.alertModalConfig.title = '¿Desea activar este usuario?';
      this.alertModalConfig.text = 'Al activar este usuario, podrá volver a ingresar al sistema con sus credenciales.';
    }
  }

  // cerrar el modal de alerta
  closeAlertModal() {
    this.showAlertModal = false;
    this.dataUpdateState.document = 0;
    this.dataUpdateState.state = false;
  }

  //Consulta de EP's

  // Get Users
  loadUsers() {
    this.usersService
      .getUsers()
      .pipe(
        map((response) =>
          response.map((u) => ({
            name: `${u.name} ${u.lastname}`,
            documentType: u.documentType,
            document: u.document,
            email: u.email,
            phone: u.phone,
            rol: u.rol,
            productionLine: u.productionLine || 'No aplica',
            state: u.state,
          })),
        ),
      )
      .subscribe({
        next: (res) => {
          this.users = res;
        },
        error: (err) => {
          this.users = [];
        },
      });
  }

  // Get DocumentTypes
  loadDocumentTypes() {
    this.documentTypeService.getDocumentsType().subscribe({
      next: (res) => {
        this.documentTypeNames = res.map((d) => d.codigo + ' - ' + d.nombre);
      },
      error: (err) => {
        this.users = [];
      },
    });
  }

  // Get Rols
  loadRols() {
    this.rolsService.getRols().subscribe({
      next: (res) => {
        this.rolNames = res.map((d) => d.nombre);
      },
      error: (err) => {
        this.users = [];
      },
    });
  }

  // Get lineas de Produccion
  loadProductionLines() {
    this.productionLinesService.getProductionLines().subscribe({
      next: (res) => {
        this.productionLineNames = res.map((d) => d.nombre);
      },
      error: (err) => {
        this.users = [];
      },
    });
  }

  // Create usuario nuevo
  createNewUser() {
    const dataSendCreate: UserCreateDTO = {
      name: this.setDataForm['name'],
      lastname: this.setDataForm['lastname'],
      documentType: this.setDataForm['documentType'].split(' - ')[0],
      document: Number(this.setDataForm['document']),
      email: this.setDataForm['email'],
      phone: Number(this.setDataForm['phone']),
      rol: this.setDataForm['rol'],
      password: this.setDataForm['password'],
      ...(this.setDataForm['productionLine'] && { productionLine: this.setDataForm['productionLine'] }),
    };
    this.usersService.postUser(dataSendCreate).subscribe({
      next: (res) => {
        // Insertar el nuevo usuario en el front sin consultar el Back
        const newuser: UsersEventDTO = {
          name: `${dataSendCreate.name} ${dataSendCreate.lastname}`,
          documentType: dataSendCreate.documentType,
          document: dataSendCreate.document,
          email: dataSendCreate.email,
          phone: dataSendCreate.phone,
          rol: dataSendCreate.rol,
          productionLine: dataSendCreate.productionLine || 'No aplica',
          state: true,
        };
        this.users = [...this.users, newuser];
        this.closeFormModal();
      },
      error: (err) => {
        if (err.description === 'Ya existe un administrador activo') {
          this.formModalConfig.error = 'Ya existe un usuario con el rol de administrador en estado activo. Solo puede haber uno a la vez.';
        } else if (err.description === 'Usuario ya existente') {
          this.formModalConfig.error = 'Ya existe un usuario registrado con este número de documento. Verifica los datos ingresados.';
        } else {
          this.formModalConfig.error = 'No se pudo realizar la creación, intentelo nuevamente.';
        }
      },
    });
  }

  // Uptade estado del usuario
  updtateStateUser() {
    if (this.dataUpdateState.document !== 0) {
      const updateData: UserUpdateDTO = {
        document: this.dataUpdateState.document,
        state: this.dataUpdateState.state,
      };

      this.usersService.updateUser(updateData).subscribe({
        next: (res) => {
          // Actualizar el estado ya existente en el front
          this.users = this.users.map((u) =>
            u.document === this.dataUpdateState.document ? { ...u, state: this.dataUpdateState.state ?? false } : { ...u },
          );
          this.closeAlertModal();
        },
        error: (err) => {
          if (err.description === 'Ya existe un administrador activo') {
            this.alertModalConfig.error = 'No se pudo activar el usuario. Ya existe otro usuario con rol de Administrador en estado activo.';
          } else {
            this.alertModalConfig.error = 'No se pudo realizar la actualización, intentelo nuevamente.';
          }
        },
      });
    }
  }
}
