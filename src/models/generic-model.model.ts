import {Entity, model, property} from '@loopback/repository';

@model()
export class GenericModel extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;


  constructor(data?: Partial<GenericModel>) {
    super(data);
  }
}

export interface GenericModelRelations {
  // describe navigational properties here
}

export type GenericModelWithRelations = GenericModel & GenericModelRelations;
