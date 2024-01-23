import {Model, model, property} from '@loopback/repository';

@model()
export class PermisosRolMenu2 extends Model {
  @property({
    type: 'string',
    required: true,
  })
  idRol: string;

  @property({
    type: 'string',
    required: true,
  })
  idMenu: string;

  @property({
    type: 'string',
    required: true,
  })
  accion: string;


  constructor(data?: Partial<PermisosRolMenu2>) {
    super(data);
  }
}

export interface PermisosRolMenu2Relations {
  // describe navigational properties here
}

export type PermisosRolMenu2WithRelations = PermisosRolMenu2 & PermisosRolMenu2Relations;
