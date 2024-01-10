export namespace ConfiguracionSeguridad{
  //-------------------------jwt -------------------------------------
  export const claveJWT: string = "52252779";
  //-------------------------menus -------------------------------------
  export const menu_ADMINISTAR_UsuarioID="659d0da41b1f206c3c146b94";
  export const menuRolID="659d0db11b1f206c3c146b95";
  export const menuTorneoID="659d0dc81b1f206c3c146b96";
  //-------------------------acciones -------------------------------------
  export const listarAccion="listar";
  export const guardarAccion="guardar";
  export const eliminarAccion="eliminar";
  export const editarAccion="editar";

  //-------------------------roles -------------------------------------
  export const rolAdministradorID="6594c9c83be1024aa881a5a3";
  export const rolJugadorID="659904a09622df3580b5c275";





  //-------------------------funciones  SQL -------------------------------------
  export const funcionInsertarUsuarioJugadorDatosPersonales='SELECT fun_insert_jugador_datospersonales($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)';

}
