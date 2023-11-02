import { DataSource } from 'typeorm';
import { Board } from './boards/board.entity';
import { User } from './auth/user.entity';

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'mariadb',
        host: 'localhost',
        port: 3306,
        username: 'test',
        password: 'ZWADrGj3gawzlTq',
        database: 'board_app',
        entities: [Board, User],
        synchronize: true,
      });

      return dataSource.initialize();
    },
  },
];
