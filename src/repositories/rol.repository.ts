import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory, HasManyThroughRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Rol, RolRelations, Usuario, Menu, MenuRol} from '../models';
import {UsuarioRepository} from './usuario.repository';
import {MenuRolRepository} from './menu-rol.repository';
import {MenuRepository} from './menu.repository';

export class RolRepository extends DefaultCrudRepository<
  Rol,
  typeof Rol.prototype._id,
  RolRelations
> {

  public readonly usuarios: HasManyRepositoryFactory<Usuario, typeof Rol.prototype._id>;

  public readonly menus: HasManyThroughRepositoryFactory<Menu, typeof Menu.prototype._id,
          MenuRol,
          typeof Rol.prototype._id
        >;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('UsuarioRepository') protected usuarioRepositoryGetter: Getter<UsuarioRepository>, @repository.getter('MenuRolRepository') protected menuRolRepositoryGetter: Getter<MenuRolRepository>, @repository.getter('MenuRepository') protected menuRepositoryGetter: Getter<MenuRepository>,
  ) {
    super(Rol, dataSource);
    this.menus = this.createHasManyThroughRepositoryFactoryFor('menus', menuRepositoryGetter, menuRolRepositoryGetter,);
    this.registerInclusionResolver('menus', this.menus.inclusionResolver);
    this.usuarios = this.createHasManyRepositoryFactoryFor('usuarios', usuarioRepositoryGetter,);
    this.registerInclusionResolver('usuarios', this.usuarios.inclusionResolver);
  }
}
