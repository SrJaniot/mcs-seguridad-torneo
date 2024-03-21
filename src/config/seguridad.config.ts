export namespace ConfiguracionSeguridad {
  //-------------------------jwt -------------------------------------
  export const claveJWT = process.env.CLAVE_JWT;
  //-------------------------menus -------------------------------------
  export const menu_ADMINISTAR_UsuarioID = "659d0da41b1f206c3c146b94";
  export const menuRolID = "659d0db11b1f206c3c146b95";
  export const menuTorneoID = "659d0dc81b1f206c3c146b96";
  //-------------------------acciones -------------------------------------
  export const listarAccion = "listar";
  export const guardarAccion = "guardar";
  export const eliminarAccion = "eliminar";
  export const editarAccion = "editar";
  export const buscarAccion_id = "buscar_id";

  //-------------------------roles -------------------------------------
  export const rolAdministradorID = "6594c9c83be1024aa881a5a3";
  export const rolJugadorID = "659904a09622df3580b5c275";





  //-------------------------funciones  SQL -------------------------------------
  export const funcionInsertarUsuarioJugadorDatosPersonales = 'SELECT fun_insert_jugador_datospersonales($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)';
  export const fun_retornar_id_jugador_apartir_correo = 'SELECT fun_retornar_id_jugador($1)';


  //------------------------variables de entorno-------------------------------------
  //instalar el paquete dotenv npm i dotenv para poder leer variables de entorno  y importar en application.ts require('dotenv').config();
  export const connection_user_postgres = process.env.CONNECTION_USER_POSTGRES ;
  export const connection_password_postgres = process.env.CONNECTION_PASSWORD_POSTGRES ;
  export const connection_database_postgres = process.env.CONNECTION_DATABASE_POSTGRES ;

}
