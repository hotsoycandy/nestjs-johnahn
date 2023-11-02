import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database.module';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserRepository } from './user.repository';

@Module({
  imports: [DatabaseModule],
  controllers: [AuthController],
  providers: [UserRepository, AuthService],
})
export class AuthModule {}
