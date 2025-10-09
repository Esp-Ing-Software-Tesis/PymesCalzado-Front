import { InputTableGeneral } from '../../../shared/tablaGeneral/tablaGeneral.interface';
import { InputsFormModal } from '../../../shared/formModal/formModal.interface';

export const TABLA_GENERAL: InputTableGeneral = {
  itemsPerPage: 10,
  context: 'ORDERGERENT-ADDARTICLE',
  // la tabla tiene un total de 1420px
  colums: [
    { name: 'Referencia', key: 'reference', width: '140px', align: 'center' },
    { name: 'Nombre', key: 'name', width: '220px', align: 'center' },
    { name: 'Imagen', key: 'image', width: '180px', align: 'center', isImage: true },
    { name: 'Categoría', key: 'category', width: '150px', align: 'center' },
    { name: 'Descripción', key: 'description', width: '600px', align: 'left', position: 'up' },
    { name: 'Acción', key: 'addArticle', width: '130px', align: 'center', isShowAddArticle: true },
  ],
};

export const FORMULARIO_CREACION_MODAL: InputsFormModal = {
  title: 'Añadir Articulo',
  text: '',
  inputsConfig: [
    { name: 'Cantidad', key: 'amount', obligatory: true, inputType: 'number', article: 'la' },
    { name: 'Color', key: 'name_color', obligatory: true, inputType: 'list', article: 'el', options: [] },
    { name: 'Talla', key: 'cod_size', obligatory: true, inputType: 'list', article: 'la', options: [] },
  ],
  textButtonConfirm: 'Añadir',
  context: 'ORDERGERENT-ADDARTICLE'
};