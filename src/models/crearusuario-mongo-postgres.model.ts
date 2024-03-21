import {Model, model, property} from '@loopback/repository';

@model()
export class CrearusuarioMongoPostgres extends Model {
  @property({
    type: 'string',
    required: true,
  })
  nombre: string;

  @property({
    type: 'number',
    required: true,
  })
  edad: number;

  @property({
    type: 'string',
    required: true,
  })
  celular: string;

  @property({
    type: 'string',
    required: true,
  })
  correo: string;

  @property({
    type: 'string',
    required: true,
  })
  foto_perfil_jugador: string;

  @property({
    type: 'number',
    required: true,
  })
  id_ciudad: number;

  @property({
    type: 'number',
    required: true,
  })
  id_tipo_documento: number;

  @property({
    type: 'string',
    required: true,
  })
  num_documento: string;



  @property({
    type: 'string',
    required: true,
  })
  nickname_jugador: string;

  @property({
    type: 'string',
    required: true,
  })
  liga_jugador: string;

  @property({
    type: 'string',
    required: true,
  })
  link_cuenta_jugador: string;

  @property({
    type: 'number',
    required: true,
  })
  id_game: number;

  @property({
    type: 'string',
    required: true,
  })
  clave: string;


  constructor(data?: Partial<CrearusuarioMongoPostgres>) {
    super(data);
  }
}

export interface CrearusuarioMongoPostgresRelations {
  // describe navigational properties here
}

export type CrearusuarioMongoPostgresWithRelations = CrearusuarioMongoPostgres & CrearusuarioMongoPostgresRelations;
