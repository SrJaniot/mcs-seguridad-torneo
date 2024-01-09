import {Entity, model, property} from '@loopback/repository';

@model()
export class FunInsertJugadorDatospersonales extends Entity {
  @property({
    type: 'number',
    required: true,
  })
  edad_jugador: number;

  @property({
    type: 'string',
  })
  foto_perfil_jugador?: string;

  @property({
    type: 'number',
    required: true,
  })
  id_ciudad: number;

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


  constructor(data?: Partial<FunInsertJugadorDatospersonales>) {
    super(data);
  }
}

export interface FunInsertJugadorDatospersonalesRelations {
  // describe navigational properties here
}

export type FunInsertJugadorDatospersonalesWithRelations = FunInsertJugadorDatospersonales & FunInsertJugadorDatospersonalesRelations;
