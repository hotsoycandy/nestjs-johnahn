import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeORMConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'test',
  password: 'ZWADrGj3gawzlTq',
  database: 'board_app',
  entities: [],
  synchronize: true,
};
