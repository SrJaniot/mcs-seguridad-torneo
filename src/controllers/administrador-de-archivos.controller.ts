// Uncomment these imports to begin using these cool features!

// import {inject} from '@loopback/core';
//controlador que me permite subir archivos y guardarlos en el servidor
//REQUIERE INSTALAR EL MODULO MULTER
//instalar "npm i multer"
//npm i --save-dev @types/multer
//npm i @loopback/authentication

//importaciones necesarias para subir archivos
import {inject} from '@loopback/core';
import{
  get, HttpErrors,
  oas,
  param,
  post, Request,
  requestBody,
  Response,
  RestBindings
} from '@loopback/rest';
import multer from 'multer';
import path from 'path';
import {promisify} from 'util';
import {ConfiguracionGeneral} from '../config/configuracion.general';

import {authenticate} from '@loopback/authentication';
import fs from 'fs';
const readdir = promisify(fs.readdir);


export class AdministradorDeArchivosController {
  constructor() {}





  //@authenticate('auth')
  @post('/cargar-archivo-fotoUsuario', {
    responses: {
      200: {
        content: {
          'application/json': {
            schema: {
              type: 'object',
            },
          },
        },
        description: 'Archivo a cargar',
      },
    },
  })
  async CargarArchivoUsuario(
    @inject(RestBindings.Http.RESPONSE) response: Response,
    @requestBody.file() request: Request,
  ): Promise<object | false> {
    const filePath = path.join(__dirname, ConfiguracionGeneral.carpetaFotosUsuarios);
    let res = await this.StoreFileToPath(
      filePath,
      ConfiguracionGeneral.campodeNombreArchivo,
      request,
      response,
      ConfiguracionGeneral.extensionesPermitidasImagenes,
    );
    if (res) {
      const filename = response.req?.file?.filename;
      if (filename) {
        return {file: filename};
      }
    }
    return res;
  }






  //@authenticate('auth')
  @post('/cargar-archivo-fotoTorneo', {
    responses: {
      200: {
        content: {
          'application/json': {
            schema: {
              type: 'object',
            },
          },
        },
        description: 'Archivo a cargar',
      },
    },
  })
  async CargarArchivoTorneo(
    @inject(RestBindings.Http.RESPONSE) response: Response,
    @requestBody.file() request: Request,
  ): Promise<object | false> {
    const filePath = path.join(__dirname, ConfiguracionGeneral.carpetaFotosTorneos);
    let res = await this.StoreFileToPath(
      filePath,
      ConfiguracionGeneral.campodeNombreArchivo,
      request,
      response,
      ConfiguracionGeneral.extensionesPermitidasImagenes,
    );
    if (res) {
      const filename = response.req?.file?.filename;
      if (filename) {
        return {file: filename};
      }
    }
    return res;
  }


    //@authenticate('auth')
    @post('/cargar-archivo-fotoEquipo', {
      responses: {
        200: {
          content: {
            'application/json': {
              schema: {
                type: 'object',
              },
            },
          },
          description: 'Archivo a cargar',
        },
      },
    })
    async CargarArchivoEquipo(
      @inject(RestBindings.Http.RESPONSE) response: Response,
      @requestBody.file() request: Request,
    ): Promise<object | false> {
      const filePath = path.join(__dirname, ConfiguracionGeneral.carpetaFotosEquipos);
      let res = await this.StoreFileToPath(
        filePath,
        ConfiguracionGeneral.campodeNombreArchivo,
        request,
        response,
        ConfiguracionGeneral.extensionesPermitidasImagenes,
      );
      if (res) {
        const filename = response.req?.file?.filename;
        if (filename) {
          return {file: filename};
        }
      }
      return res;
    }












 /**
   * Return a config for multer storage
   * @param path
   */
 private GetMulterStorageConfig(path: string) {
  var filename: string = '';
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path);
    },
    filename: function (req, file, cb) {
      filename = `${Date.now()}-${file.originalname}`;
      cb(null, filename);
    },
  });
  return storage;
}

/**
 * store the file in a specific path
 * @param storePath
 * @param request
 * @param response
 */
private StoreFileToPath(
  storePath: string,
  fieldname: string,
  request: Request,
  response: Response,
  acceptedExt: string[],
): Promise<object> {
  //console.log(storePath);

  return new Promise<object>((resolve, reject) => {
    const storage = this.GetMulterStorageConfig(storePath);
    //console.log(storage);
    const upload = multer({
      storage: storage,
      fileFilter: function (req, file, callback) {
        var ext = path.extname(file.originalname).toUpperCase();
        console.log(ext);
        if (acceptedExt.includes(ext)) {
          return callback(null, true);
        }
        return callback(
          new HttpErrors[400]('La extensión del archivo no es admitida para su almacenamiento.'),
        );
      },
      limits: {},
    }).single(fieldname);
    upload(request, response, (err: any) => {
      if (err) {
        reject(err);
      }
      resolve(response);
    });
  });
}

/** Descarga de Archivos */

@get('/archivos/{type}', {
  responses: {
    200: {
      content: {
        // string[]
        'application/json': {
          schema: {
            type: 'array',
            items: {
              type: 'string',
            },
          },
        },
      },
      description: 'Una lista de archivos',
    },
  },
})
async ObtenerListaDeArchivos(@param.path.number('type') type: number) {
  const folderPath = this.ObtenerArchivosPorTipo(type);
  const files = await readdir(folderPath);
  return files;
}





@get('/ObtenerArchivo/{type}/{name}')
@oas.response.file()
async downloadFileByName(
  @param.path.number('type') type: number,
  @param.path.string('name') fileName: string,
  @inject(RestBindings.Http.RESPONSE) response: Response,
) {
  const folder = this.ObtenerArchivosPorTipo(type);
  const file = this.ValidarNombreDeArchivo(folder, fileName);
  response.download(file, fileName);
  return response;
}

/**
 * Get the folder when files are uploaded by type
 * @param type
 */
private ObtenerArchivosPorTipo(tipo: number) {
  let filePath = '';
  switch (tipo) {
    // amusement " DIFERENTES CARPETAS QUE TENGO EN EL SERVIDOR"
    case 1:
      filePath = path.join(__dirname, ConfiguracionGeneral.carpetaFotosUsuarios);
      break;
    case 2:
      filePath = path.join(__dirname, ConfiguracionGeneral.carpetaFotosTorneos);
      break;
      case 3:
        filePath = path.join(__dirname, ConfiguracionGeneral.carpetaFotosEquipos);
        break;
      case 4:
        break;
  }
  return filePath;
}

/**
 * Validate file names to prevent them goes beyond the designated directory
 * @param fileName - File name
 */
private ValidarNombreDeArchivo(folder: string, fileName: string) {
  const resolved = path.resolve(folder, fileName);
  if (resolved.startsWith(folder)) return resolved;
  throw new HttpErrors[400](`Este archivo es inválido: ${fileName}`);
}

}
