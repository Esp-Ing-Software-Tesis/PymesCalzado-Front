import { ConfigTable, ArticlesDTO } from './crearPedido.interface';
import { InputAlertModal } from '../../../shared/alertModal/alertModal.interface';

export const TABLA_ARTICULOS: ConfigTable<ArticlesDTO>[] = [
  { name: 'Referencia', key: 'ref_design', width: '190px', align: 'center' },
  { name: 'Cantidad Pares', key: 'amount', width: '120px', align: 'center', isObligatory: true },
  { name: 'Color', key: 'name_color', width: '260px', align: 'center' },
  { name: 'Talla', key: 'cod_size', width: '130px', align: 'center' },
  { name: 'Eliminar', key: 'delete', width: '100px', align: 'center', isAction: true },
];

export const ALERTA_MODAL: InputAlertModal = {
  title: '',
  text: '',
};
