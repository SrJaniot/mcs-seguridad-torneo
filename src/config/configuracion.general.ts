export namespace ConfiguracionGeneral {
  //-------------------------carpetas -------------------------------------
  export const carpetaFotosUsuarios: string = "../../../../archivos/fotosUsuarios";
  export const carpetaFotosTorneos: string = "../../../../archivos/fotosTorneos";
  export const carpetaFotosEquipos: string = "../../../../archivos/fotosEquipos";

  //-------------------------archivos -------------------------------------

  export const campodeNombreArchivo: string = "file";
  export const extensionesPermitidasImagenes: string[] = [
    '.PNG',
    '.JPG',
    '.JPEG',
    '.GIF',
    //'.PDF'
  ];
  //-------------------------servidor -------------------------------------
  export const puertoServidor: number = 3000;
  export const direccionServidor: string = " http://localhost";
}
