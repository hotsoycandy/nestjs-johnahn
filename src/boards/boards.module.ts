import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database.module';
import { AuthModule } from 'src/auth/auth.module';
import { BoardsController } from './boards.controller';
import { BoardsService } from './boards.service';
import { BoardRepository } from './board.repository';

@Module({
  imports: [DatabaseModule, AuthModule],
  controllers: [BoardsController],
  providers: [BoardRepository, BoardsService],
})
export class BoardsModule {}
