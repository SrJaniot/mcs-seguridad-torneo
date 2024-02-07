// Uncomment these imports to begin using these cool features!
import {HttpErrors, getModelSchemaRef, post, requestBody, response} from '@loopback/rest';
import {CrearusuarioMongoPostgres, Credenciales, FactorDeAutenticacionPorCodigo,  GenericModel, Login, Usuario} from '../models';
import {DefaultCrudRepository, juggler, repository} from '@loopback/repository';
import {LoginRepository, UsuarioRepository} from '../repositories';
import {inject, service} from '@loopback/core';
import {NotificacionesService, SeguridadService} from '../services';
import {ConfiguracionSeguridad} from '../config/seguridad.config';
import {ConfiguracionNotificaciones} from '../config/notificaciones.config';

// import {inject} from '@loopback/core';


export class DmlPostgresMongoController {
  private genericRepository: DefaultCrudRepository <GenericModel , typeof GenericModel.prototype.id>;

  constructor(
    //repotorios------------------------------------------------------------------------
    //llamado al repositorio de usuario para poder insertar en la base de datos mongo
    @repository(UsuarioRepository)
    public usuarioRepository: UsuarioRepository,
    //llamado al repositorio de login para poder insertar en la base de datos mongo
    @repository(LoginRepository)
    public loginRepository: LoginRepository,
    //inyeccion para poder generar el repositorio generico ejemplo aca estoy llamando al datasource postgres
    @inject('datasources.postgres') dataSource: juggler.DataSource,



    //servicios-------------------------------------------------------------------------
    //inyeccion para poder utilizar el servicio de seguridad
    @service(SeguridadService)
    public seguridadService: SeguridadService,
    //inyeccion para poder utilizar el servicio de notificaciones
    @service(NotificacionesService)
    public notificacionesService: NotificacionesService,



  ) {
    this.genericRepository = new DefaultCrudRepository<any, any>(
      GenericModel,
      dataSource,
    );


  }

  // @post('/fun-insert-jugador-datospersonales', {
  //METODO POST PARA INSERTAR DATOS PERSONALES DE UN JUGADOR EN LA BASE DE DATOS POSTGRES Y MONGO
  @post('/funcion-inserta-usuario-jugador-datos-personales')
  @response(200, {
    description: 'Combinación de db postgres y mongo',
    content: {
      'application/json': {
        schema: getModelSchemaRef(CrearusuarioMongoPostgres),
      },
    },
  })
  async miMetodo(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(CrearusuarioMongoPostgres),
        },
      },
    })
    data: CrearusuarioMongoPostgres ,
  ): Promise<object> {
    try {
      const sql =ConfiguracionSeguridad.funcionInsertarUsuarioJugadorDatosPersonales;
      const params = [
        data.nombre,
        data.edad,
        data.celular,
        data.correo,
        data.foto_perfil_jugador,
        data.id_ciudad,
        data.nickname_jugador,
        data.liga_jugador,
        data.link_cuenta_jugador,
        data.id_game,
      ];


      //CREAR UN OBJETO DE TIPO USUARIO PARA INSERTARLO EN LA BASE DE DATOS MONGO
      let usuario: Usuario = new Usuario();
      usuario.nombre = data.nombre;
      usuario.correo = data.correo;
      usuario.celular = data.celular;
      //ROL USUARIO
      usuario.rolId=ConfiguracionSeguridad.rolJugadorID;
      //CIFRAR LA CONTRASEÑA
      let clavecifrada = this.seguridadService.encriptartexto(data.clave);
      //ASIGNAR LA CLAVE CIFRADA AL USUARIO
      usuario.clave = clavecifrada;
      //console.log(params);

      //IF QUE PERMITE SABER SI EL CORREO YA EXISTE EN LA BASE DE DATOS MONGO
      let existeCorreo = await this.usuarioRepository.findOne({
        where: {
          correo: usuario.correo
        }
      });
      if (existeCorreo) {
        return {
          "CODIGO": 3,
          "MENSAJE": "El correo ya existe en la base de datos",
          "DATOS": "El correo ya existe en la base de datos"
        };
      }
      //IF QUE ME PERMITE SABER SI POSTGRES ACEPTO LA INSERCION DE LOS DATOS PERSONALES DEL JUGADOR
      const resultPostgres = await this.genericRepository.execute(sql, params);
      if (resultPostgres[0].fun_insert_jugador_datospersonales === false) {
        return {
          "CODIGO": 2,
          "MENSAJE": "Error al insertar datos  del jugador en la funcion de postgres",
          "DATOS": "Error al insertar datos  del jugador en la funcion de postgres"
        };
      }

      const resultMongoDB = await this.usuarioRepository.create(usuario);
      //ENVIAR CORREO ELECTRONICO DE CONFIRMACION
      let datosCorreo ={
        correoDestino:usuario.correo,
        nombreDestino:usuario.nombre,
        contenidoCorreo:'Bienvenido a la plataforma de jugadores de la liga de videojuegos, su registro ha sido exitoso',
        asuntoCorreo:'Registro exitoso',
      }
      let urlCorreo = ConfiguracionNotificaciones.urlCorreoBienvenida;
      this.notificacionesService.EnviarCorreoElectronico(datosCorreo,urlCorreo);
      //ENVIAR MENSAJE DE WHATSAPP DE CONFIRMACION
      let datosWhatsapp ={
        message:`¡Bienvenid@ ${usuario.nombre} ! 🤩
¡Estamos encantados de que formes parte de nuestra comunidad de gamers! Prepárate para vivir la emoción de los torneos y descubrir tu potencial. ¡Qué cada partida sea un paso hacia la grandeza! 🎮🕹️`,
        phone:`57${usuario.celular}`,
      }
      let urlWhatsapp = ConfiguracionNotificaciones.urlWhatsapp;
      this.notificacionesService.EnviarMensajeWhatsapp(datosWhatsapp,urlWhatsapp);



      return {
        "CODIGO": 200,
        "MENSAJE": "Operación exitosa",
        "DATOS": {resultPostgres ,resultMongoDB}
      };
    } catch (err) {
      throw {
        "CODIGO": 500,
        "MENSAJE": `Error al realizar las operaciones: ${err}`,
        "DATOS": `Error al realizar las operaciones: ${err}`
      };
     }
  }


//-------------------------------------METODOS PARA EL LOGIN----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
 /**
  * Metodo para identificar un usuario por medio de su correo y su clave
  * @param credenciales
  * @returns usuario
  */
  @post('/identificar-usuario')
  @response(200, {
    description: 'Identificar usuario por clave y correo',
    content: {'application/json': {schema: getModelSchemaRef(Usuario)}},
  })
  async identificarUsuario(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Credenciales ),
        },
      },
    })
    credenciales: Credenciales,
  ): Promise<object>{
    let usuario=await this.seguridadService.identificarusuario(credenciales);
    if(usuario){
      //generar codigo 2fa
      let codigo2fa = this.seguridadService.crearTextoAleatoria(5);
      let login: Login = new Login();
      login.usuarioId = usuario._id!;
      login.codigo_2fa = codigo2fa;
      login.estado_codigo2fa = false;
      login.token='';
      login.estado_token=false;

      //reformatear la clave para no mostrarla
      usuario.clave="";

      await this.loginRepository.create(login);
      //notificar al usuario via correo o sms del codigo 2fa
      let datosCorreo ={
        correoDestino:usuario.correo,
        nombreDestino:usuario.nombre,
        contenidoCorreo:`Su codigo de verificacion es: ${codigo2fa}`,
        asuntoCorreo:'Codigo de verificacion',
        codigo2fa:login.codigo_2fa,
      };
      let urlCorreo = ConfiguracionNotificaciones.urlCorreoCodigo2fa;
      this.notificacionesService.EnviarCorreoElectronico(datosCorreo,urlCorreo);

      let datosWhatsapp ={
        message:`¡Hola ${usuario.nombre}! 🤩
Tu código de verificación es: ${codigo2fa}`,
        phone:`57${usuario.celular}`,
      }
      let urlWhatsapp = ConfiguracionNotificaciones.urlWhatsapp;
      this.notificacionesService.EnviarMensajeWhatsapp(datosWhatsapp,urlWhatsapp);




      return {
      "CODIGO": 200,
      "MENSAJE": "Operación exitosa",
      "DATOS":  usuario
      };
    }
    return {
      "CODIGO": 2,
      "MENSAJE": "Operación fallida",
      "DATOS":  "Usuario no encontrado"
    }
  }

//-------------------------------------METODOS PARA EL CODIGO 2FA----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

  /**
   * Metodo para validar el codigo 2fa
   * @param login
   * @returns
   */
  @post('/verificar-2fa')
  @response(200, {
    description: 'validar un codigo de 2fa',
  })
  async VerificarCodigo2fa(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(FactorDeAutenticacionPorCodigo ),
        },
      },
    })
    credenciales: FactorDeAutenticacionPorCodigo,
  ): Promise<object>{
    let usuario=await this.seguridadService.validarCoddigo2fa(credenciales);
    if(usuario){
      let token = this.seguridadService.CrearToken(usuario);
      //borrando la clave para no mostrarla
      usuario.clave="";
      //actualizar el estado del codigo 2fa  a true
      try{
        this.usuarioRepository.logins(usuario._id).patch({
          estado_codigo2fa:true,
          token:token,
        },
        {
          estado_codigo2fa:false,
          codigo_2fa:credenciales.codigo2fa,
        });

      }catch(err){
        throw new HttpErrors[500](`Error al actualizar el estado del codigo 2fa: ${err}`);
      }


      return {
        "CODIGO": 200,
        "MENSAJE": "Operación exitosa",
        "DATOS":  {usuario,token}
        };
    }
    return {
      "CODIGO": 2,
      "MENSAJE": "Operación fallida",
      "DATOS":  "Usuario no encontrado"
    }
  }













}
