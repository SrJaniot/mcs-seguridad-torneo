import {Entity, model, property} from '@loopback/repository';

@model()
export class MenuRol extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  _id?: string;

  @property({
    type: 'boolean',
    required: true,
  })
  listar: boolean;

  @property({
    type: 'boolean',
    required: true,
  })
  guardar: boolean;

  @property({
    type: 'boolean',
    required: true,
  })
  elminar: boolean;

  @property({
    type: 'boolean',
    required: true,
  })
  editar: boolean;

  @property({
    type: 'boolean',
    required: true,
  })
  buscar_id: boolean;



  @property({
    type: 'string',
  })
  rolId?: string;

  @property({
    type: 'string',
  })
  menuId?: string;

  constructor(data?: Partial<MenuRol>) {
    super(data);
  }
}

export interface MenuRolRelations {
  // describe navigational properties here
}

export type MenuRolWithRelations = MenuRol & MenuRolRelations;
