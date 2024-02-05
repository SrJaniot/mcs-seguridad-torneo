import {injectable, /* inject, */ BindingScope} from '@loopback/core';

// AGREGAMOS EL PAQUETE NODE FETCH EN SU VERCION 2  npm i node-fetch@2.7.0 ESTO PARA HACER PETICIONES HTTP ES DECIR PODER CONECTARSE CON
// EL OTRO MICROSERVICIO DE SEGURIDAD
const fetch = require('node-fetch');

@injectable({scope: BindingScope.TRANSIENT})
export class NotificacionesService {
  constructor(/* Add @inject to inject parameters */) {}

  EnviarCorreoElectronico (datos:any,url:string){
     fetch(url, {
      method: 'post',
      body: JSON.stringify(datos),
      headers: {'Content-Type': 'application/json'},
    })
  }

  EnviarMensajeSMS (datos:any,url:string){
    fetch(url, {
     method: 'post',
     body: JSON.stringify(datos),
     headers: {'Content-Type': 'application/json'},
   })
 }


  EnviarMensajeWhatsapp (datos:any,url:string){
    fetch(url, {
     method: 'post',
     body: JSON.stringify(datos),
     headers: {'Content-Type': 'application/json'},
   })
 }



}
