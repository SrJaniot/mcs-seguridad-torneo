import {injectable, /* inject, */ BindingScope} from '@loopback/core';
import {repository} from '@loopback/repository';
import {MenuRolRepository} from '../repositories';
import {HttpErrors} from '@loopback/rest';
import {UserProfile} from '@loopback/security';

@injectable({scope: BindingScope.TRANSIENT})
export class AuthService {
  constructor(
    @repository(MenuRolRepository)
    private repositorioMenuRol : MenuRolRepository

  ) {}


  async VerificarPermisoDeUsuarioPorRol(idRol: string, idMenu: string, Accion: string): Promise<UserProfile | undefined>{
    let permiso = await this.repositorioMenuRol.findOne({
      where:{
        rolId:idRol,
        menuId:idMenu,
      }
    });
    let continuar: boolean = false;
    //console.log(permiso);
    if(permiso){
      switch (Accion) {
        case "guardar":
          continuar=permiso.guardar;
          break;
        case "listar":
          continuar=permiso.listar;
          break;
        case "elminar":
          continuar=permiso.elminar;
          break;
        case "editar":
          continuar=permiso.editar;
          break;
        case "buscar_id":
          continuar=permiso.buscar_id;
          break;



        default:
          throw new HttpErrors[401]("El usuario no tiene permiso para realizar esta accion por que no existe esa accion");
      }
      if(continuar){
        let perfil: UserProfile= Object.assign({
          permitido:"OK"
        });
        return perfil;
      }else{
        throw new HttpErrors[401]("El usuario no tiene permiso para realizar esta accion");
      }

    }else{
      throw new HttpErrors[401]("El usuario no tiene permiso para realizar esta accion");
    }
  }


}
