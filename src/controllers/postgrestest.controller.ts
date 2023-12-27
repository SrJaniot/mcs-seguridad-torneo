// Uncomment these imports to begin using these cool features!

// import {inject} from '@loopback/core';

import {get} from '@loopback/rest';
import {inject} from '@loopback/core';
import {DataSource} from 'loopback-datasource-juggler';

export class PostgrestestController {
  constructor(
    @inject('datasources.postgres') protected dataSource: DataSource,

  ) {}

  @get('/testPostgres')
    async testConnection(): Promise<any> {
        const result = await this.dataSource.execute('SELECT 1');
        return result;
    }

}





