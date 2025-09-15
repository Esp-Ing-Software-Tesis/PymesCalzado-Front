import { ConfigTable } from './crearDiseñoCalzado.interface';

export const TABLA_LIENAS_PRODUCCION: ConfigTable[] = [
    // la tabla tiene un total de 800px
    { name: 'Línea de Producción', key: 'productionLine', width: '300px', align: 'center' },
    { name: 'Aplica', key: 'apply', width: '100px', align: 'center' },
    { name: 'Costo por Par (COP)', key: 'costPerPair', width: '300px', align: 'center', isObligatory: true },
];