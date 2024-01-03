import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyThroughRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Menu, MenuRelations, Rol, MenuRol} from '../models';
import {MenuRolRepository} from './menu-rol.repository';
import {RolRepository} from './rol.repository';

export class MenuRepository extends DefaultCrudRepository<
  Menu,
  typeof Menu.prototype._id,
  MenuRelations
> {

  public readonly roles: HasManyThroughRepositoryFactory<Rol, typeof Rol.prototype._id,
          MenuRol,
          typeof Menu.prototype._id
        >;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('MenuRolRepository') protected menuRolRepositoryGetter: Getter<MenuRolRepository>, @repository.getter('RolRepository') protected rolRepositoryGetter: Getter<RolRepository>,
  ) {
    super(Menu, dataSource);
    this.roles = this.createHasManyThroughRepositoryFactoryFor('roles', rolRepositoryGetter, menuRolRepositoryGetter,);
    this.registerInclusionResolver('roles', this.roles.inclusionResolver);
  }
}
