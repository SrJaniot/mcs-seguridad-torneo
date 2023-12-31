import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Usuario} from './usuario.model';

@model()
export class Login extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  _id?: string;

  @property({
    type: 'string',
    required: true,
  })
  codigo_2fa: string;

  @property({
    type: 'boolean',
    required: true,
  })
  estado_codigo2fa: boolean;

  @property({
    type: 'string',
  })
  token?: string;

  @property({
    type: 'boolean',
    required: true,
  })
  estado_token: boolean;

  @belongsTo(() => Usuario)
  usuarioId: string;

  constructor(data?: Partial<Login>) {
    super(data);
  }
}

export interface LoginRelations {
  // describe navigational properties here
}

export type LoginWithRelations = Login & LoginRelations;
