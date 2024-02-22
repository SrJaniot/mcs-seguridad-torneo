import {Model, model, property} from '@loopback/repository';

@model()
export class PermisosIdPostgres extends Model {
  @property({
    type: 'string',
    required: true,
  })
  token: string;


  constructor(data?: Partial<PermisosIdPostgres>) {
    super(data);
  }
}

export interface PermisosIdPostgresRelations {
  // describe navigational properties here
}

export type PermisosIdPostgresWithRelations = PermisosIdPostgres & PermisosIdPostgresRelations;
