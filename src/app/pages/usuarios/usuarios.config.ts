import { InputsFormModal } from '../../shared/formModal/formModal.interface';
import { InputAlertModal } from '../../shared/alertModal/alertModal.interface';
import { InputTableGeneral } from '../../shared/tablaGeneral/tablaGeneral.interface';

export const TABLA_GENERAL: InputTableGeneral = {
  itemsPerPage: 20,
  context: 'USER',
  // la tabla tiene un total de 1420px
  colums: [
    { name: 'Nombre', key: 'name', width: '260px', align: 'left' },
    { name: 'Tipo de Documento', key: 'documentType', width: '100px', align: 'center' },
    { name: 'Número de Documento', key: 'document', width: '140px', align: 'center' },
    { name: 'Email', key: 'email', width: '280px', align: 'left' },
    { name: 'Teléfono', key: 'phone', width: '150px', align: 'center' },
    { name: 'Rol', key: 'rol', width: '150px', align: 'center' },
    { name: 'Línea de Producción', key: 'productionLine', width: '160px', align: 'center' },
    { name: 'Estado', key: 'state', width: '110px', isUser: true, align: 'center' },
  ],
};

export const FORMULARIO_CREACION_MODAL: InputsFormModal = {
  title: 'Registrar Usuario Nuevo',
  inputsConfig: [
    { name: 'Nombres', key: 'name', obligatory: true, inputType: 'text', article: 'los' },
    { name: 'Apellidos', key: 'lastname', obligatory: true, inputType: 'text', article: 'los' },
    { name: 'Tipo de Documento', key: 'documentType', obligatory: true, inputType: 'list', article: 'el', options: [] },
    { name: 'Número de Documento', key: 'document', obligatory: true, inputType: 'text', article: 'el' },
    { name: 'Email', key: 'email', obligatory: true, inputType: 'email', article: 'el' },
    { name: 'Teléfono', key: 'phone', obligatory: true, inputType: 'text', article: 'el' },
    { name: 'Rol', key: 'rol', obligatory: true, inputType: 'list', article: 'el', options: [] },
    { name: 'Línea de Producción', key: 'productionLine', 
        obligatory: true, inputType: 'list', article: 'la', options: [], 
        dependsOn: { key: 'rol', value: 'Operario' } },
    { name: 'Contraseña', key: 'password', obligatory: true, inputType: 'password', article: 'la' },
    { name: 'Confirmar Contraseña', key: 'confirmPassword', obligatory: true, inputType: 'password', article: 'nuevamente la' },
  ],
  textButtonConfirm: 'Crear',
  context: 'USER'
};

export const ALERTA_MODAL: InputAlertModal = {
  title: '',
  text: '',
};
