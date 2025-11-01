import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Users, UserCreateDTO, UserUpdateDTO, UsersByProductionLine } from '../models/usuario.model';

@Injectable({ providedIn: 'root' })
export class UsersService {
  constructor() {}

  // Mock de get Users
  getUsers(): Observable<Users[]> {
    const usersMock: Users[] = this.setMockUsersOptions();
    return of(usersMock);
  }

  // Mock de update estado user
  updateUser(usuario: UserUpdateDTO): Observable<UserUpdateDTO> {
    return of(usuario);
  }

  // Mock de create user
  postUser(usuario: UserCreateDTO): Observable<UserCreateDTO> {
    const nuevoUsuario = { ...usuario };
    return of(nuevoUsuario);
  }

  // Mock de get Users por linea de produccion
  getUsersByProductionLine(productionLine: string): Observable<UsersByProductionLine[]> {
    const usersMockProductionLine: UsersByProductionLine[] = this.setMockUsersByProductionLine(productionLine);
    return of(usersMockProductionLine);
  }

  // Data Mock Users
  private setMockUsersOptions(): Users[] {
    const dataUser: Users[] = [
      {
        name: 'Laura Fernanda',
        lastname: 'Gómez Ríos',
        documentType: 'CC',
        document: 1044567123,
        email: 'laura.fgomez@pymecalzado.com',
        phone: 3124567890,
        rol: 'Administrador',
        productionLine: 'No aplica',
        state: true,
      },
      {
        name: 'Valentina Sofía',
        lastname: 'Rincón Lozano',
        documentType: 'CC',
        document: 1066331789,
        email: 'valentina.srincon@pymecalzado.com',
        phone: 3168899001,
        rol: 'Operario',
        productionLine: 'Corte',
        state: true,
      },
      {
        name: 'Miguel Ángel',
        lastname: 'Restrepo Londoño',
        documentType: 'CC',
        document: 1032445678,
        email: 'miguel.restrepo@pymecalzado.com',
        phone: 3149888776,
        rol: 'Operario',
        productionLine: 'Guarnición',
        state: true,
      },
      {
        name: 'Andrés Mauricio',
        lastname: 'Torres Medina',
        documentType: 'CE',
        document: 2033876459,
        email: 'andres.mtorres@pymecalzado.com',
        phone: 3209876543,
        rol: 'Administrador',
        productionLine: 'No aplica',
        state: false,
      },
      {
        name: 'Camilo Javier',
        lastname: 'Rodríguez Mejía',
        documentType: 'TI',
        document: 1112345987,
        email: 'camilo.jrodriguez@pymecalzado.com',
        phone: 3012345678,
        rol: 'Operario',
        productionLine: 'Bordado',
        state: false,
      },
      {
        name: 'Ana Isabel',
        lastname: 'Díaz Patiño',
        documentType: 'CE',
        document: 1021999888,
        email: 'ana.idiaz@pymecalzado.com',
        phone: 3182341122,
        rol: 'Operario',
        productionLine: 'Corte',
        state: false,
      },
      {
        name: 'Esteban Felipe',
        lastname: 'Cárdenas Ruiz',
        documentType: 'CC',
        document: 1087903012,
        email: 'esteban.fcardenas@pymecalzado.com',
        phone: 3123498756,
        rol: 'Operario',
        productionLine: 'Emplantillado',
        state: true,
      },
      {
        name: 'Laura Camila',
        lastname: 'Herrera Bonilla',
        documentType: 'CC',
        document: 1099283467,
        email: 'laura.cherrera@pymecalzado.com',
        phone: 3012299887,
        rol: 'Operario',
        productionLine: 'Solador',
        state: true,
      },
      {
        name: 'Santiago Tomás',
        lastname: 'Beltrán Ríos',
        documentType: 'CC',
        document: 1055122334,
        email: 'santiago.tbeltran@pymecalzado.com',
        phone: 3127765443,
        rol: 'Operario',
        productionLine: 'Emplantillado',
        state: true,
      },
      {
        name: 'Diego Alejandro',
        lastname: 'Peña Castaño',
        documentType: 'CE',
        document: 1078934221,
        email: 'diego.apena@pymecalzado.com',
        phone: 3102223344,
        rol: 'Operario',
        productionLine: 'Estampado',
        state: true,
      },
      {
        name: 'Mariana Juliana',
        lastname: 'Castro Romero',
        documentType: 'TI',
        document: 1022668910,
        email: 'mariana.jcastro@pymecalzado.com',
        phone: 3113459987,
        rol: 'Operario',
        productionLine: 'Solador',
        state: true,
      },
      {
        name: 'Juliana Teresa',
        lastname: 'Vargas León',
        documentType: 'CE',
        document: 1080765321,
        email: 'juliana.tvargas@pymecalzado.com',
        phone: 3052233445,
        rol: 'Operario',
        productionLine: 'Corte',
        state: true,
      },
      {
        name: 'Natalia Andrea',
        lastname: 'Vargas Suárez',
        documentType: 'CC',
        document: 1055678324,
        email: 'natalia.avargas@pymecalzado.com',
        phone: 3158765432,
        rol: 'Operario',
        productionLine: 'Termofijado',
        state: true,
      },
      {
        name: 'Andrea Marcela',
        lastname: 'Quiroga',
        documentType: 'CC',
        document: 1071882431,
        email: 'andrea.mquiroga@pymecalzado.com',
        phone: 3118877445,
        rol: 'Operario',
        productionLine: 'Solador',
        state: true,
      },
      {
        name: 'Sebastián',
        lastname: 'Jiménez Carvajal',
        documentType: 'CC',
        document: 1091223665,
        email: 'sebas.ejimenez@pymecalzado.com',
        phone: 3197765432,
        rol: 'Operario',
        productionLine: 'Guarnición',
        state: true,
      },
      {
        name: 'Felipe Andrés',
        lastname: 'Morales Silva',
        documentType: 'CC',
        document: 1061773245,
        email: 'felipe.amorales@pymecalzado.com',
        phone: 3137654321,
        rol: 'Operario',
        productionLine: 'Guarnición',
        state: true,
      },
      {
        name: 'Luisa Daniela',
        lastname: 'Paredes Gómez',
        documentType: 'CC',
        document: 1067821344,
        email: 'luisa.dparedes@pymecalzado.com',
        phone: 3009988776,
        rol: 'Operario',
        productionLine: 'Corte',
        state: true,
      },
      {
        name: 'Juan Pablo',
        lastname: 'Ortiz Aguirre',
        documentType: 'TI',
        document: 1033564876,
        email: 'juan.portiz@pymecalzado.com',
        phone: 3175566778,
        rol: 'Operario',
        productionLine: 'Guarnición',
        state: true,
      },
      {
        name: 'Mateo Iván',
        lastname: 'Mendoza Velasco',
        documentType: 'CC',
        document: 1066337789,
        email: 'mateo.imendoza@pymecalzado.com',
        phone: 3203214567,
        rol: 'Operario',
        productionLine: 'Emplantillado',
        state: true,
      },
      {
        name: 'Paula Ximena',
        lastname: 'Barrios Gaitán',
        documentType: 'TI',
        document: 1099455222,
        email: 'paula.xbarrios@pymecalzado.com',
        phone: 3091234567,
        rol: 'Operario',
        productionLine: 'Solador',
        state: true,
      },
      {
        name: 'Camila Fernanda',
        lastname: 'Ríos',
        documentType: 'CC',
        document: 1088991123,
        email: 'camila.frios@pymecalzado.com',
        phone: 3125678901,
        rol: 'Operario',
        productionLine: 'Bordado',
        state: true,
      },
      {
        name: 'Esteban Andrés',
        lastname: 'López',
        documentType: 'CE',
        document: 1023345567,
        email: 'esteban.alopez@pymecalzado.com',
        phone: 3187654321,
        rol: 'Operario',
        productionLine: 'Corte',
        state: true,
      },
      {
        name: 'Valeria',
        lastname: 'Jiménez Torres',
        documentType: 'CC',
        document: 1078899012,
        email: 'valeria.jtorres@pymecalzado.com',
        phone: 3176543210,
        rol: 'Operario',
        productionLine: 'Termofijado',
        state: true,
      },
      {
        name: 'Andrés Felipe',
        lastname: 'Martínez',
        documentType: 'CC',
        document: 1092233445,
        email: 'andres.fmartinez@pymecalzado.com',
        phone: 3123456789,
        rol: 'Operario',
        productionLine: 'Solador',
        state: true,
      },
      {
        name: 'Gabriela',
        lastname: 'Moreno Ríos',
        documentType: 'CC',
        document: 1067889912,
        email: 'gabriela.moreno@pymecalzado.com',
        phone: 3112345678,
        rol: 'Operario',
        productionLine: 'Bordado',
        state: true,
      },
    ];
    return dataUser;
  }

  // Data Mock Users By Production Line
  private setMockUsersByProductionLine(productionLine: string): UsersByProductionLine[] {
    const dataUserByProductionLineCorte: UsersByProductionLine[] = [
      { name: 'Valentina Sofía', lastname: 'Rincón Lozano', document: 1066331789 },
      { name: 'Ana Isabel', lastname: 'Díaz Patiño', document: 1021999888 },
      { name: 'Juliana Teresa', lastname: 'Vargas León', document: 1080765321 },
      { name: 'Luisa Daniela', lastname: 'Paredes Gómez', document: 1067821344 },
      { name: 'Esteban Andrés', lastname: 'López García', document: 1023345567 },
    ];

    const dataUserByProductionLineBordado: UsersByProductionLine[] = [
      { name: 'Laura', lastname: 'Torres Acosta', document: 1078987654 },
      { name: 'Mónica', lastname: 'Gómez Pardo', document: 1052231987 },
      { name: 'Ricardo', lastname: 'Valbuena Ortiz', document: 1045678991 },
      { name: 'Carolina', lastname: 'Mejía Duarte', document: 1077345632 },
    ];

    const dataUserByProductionLineTermofijado: UsersByProductionLine[] = [
      { name: 'Carlos', lastname: 'Gómez Hernández', document: 1034778123 },
      { name: 'Nicolás', lastname: 'Pérez Quintero', document: 1049987122 },
      { name: 'Tatiana', lastname: 'Rojas Ramírez', document: 1022778123 },
    ];

    const dataUserByProductionLineEstampado: UsersByProductionLine[] = [
      { name: 'David', lastname: 'Rojas Prieto', document: 1014567899 },
      { name: 'Andrés', lastname: 'Martínez López', document: 1093345566 },
      { name: 'Camila', lastname: 'Mendoza Torres', document: 1088776655 },
    ];

    const dataUserByProductionLineGuarnicion: UsersByProductionLine[] = [
      { name: 'Miguel Ángel', lastname: 'Restrepo Londoño', document: 1032445678 },
      { name: 'Sebastián', lastname: 'Jiménez Carvajal', document: 1091223665 },
      { name: 'Felipe Andrés', lastname: 'Morales Silva', document: 1061773245 },
      { name: 'Daniela', lastname: 'Montoya Zapata', document: 1083112245 },
    ];

    const dataUserByProductionLineSolador: UsersByProductionLine[] = [
      { name: 'Juan Esteban', lastname: 'García Soto', document: 1045567812 },
      { name: 'Sara', lastname: 'Valencia Gómez', document: 1076543221 },
      { name: 'Mateo', lastname: 'Londoño Pérez', document: 1067885433 },
    ];

    const dataUserByProductionLineEmplantillado: UsersByProductionLine[] = [
      { name: 'Diana', lastname: 'Cortés Ramírez', document: 1089987765 },
      { name: 'Julio', lastname: 'Castro Mejía', document: 1026655432 },
      { name: 'Natalia', lastname: 'López Herrera', document: 1032245567 },
    ];

    switch (productionLine) {
      case 'corte':
        return dataUserByProductionLineCorte;
      case 'bordado':
        return dataUserByProductionLineBordado;
      case 'termofijado':
        return dataUserByProductionLineTermofijado;
      case 'estampado':
        return dataUserByProductionLineEstampado;
      case 'guarnicion':
        return dataUserByProductionLineGuarnicion;
      case 'solador':
        return dataUserByProductionLineSolador;
      case 'emplantillado':
        return dataUserByProductionLineEmplantillado;
      default:
        return [];
    }
  }
}
