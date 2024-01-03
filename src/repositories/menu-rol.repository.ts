import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {MenuRol, MenuRolRelations} from '../models';

export class MenuRolRepository extends DefaultCrudRepository<
  MenuRol,
  typeof MenuRol.prototype._id,
  MenuRolRelations
> {
  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource,
  ) {
    super(MenuRol, dataSource);
  }
}
